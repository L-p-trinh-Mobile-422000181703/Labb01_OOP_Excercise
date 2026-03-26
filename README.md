# Frontend Integration Guide — Friends, Typing & Notifications

Tài liệu hướng dẫn FE developer tích hợp 3 tính năng: **Friend Service**, **Typing Indicator** và **Notification Service**.

---

## Architecture Overview

```
Frontend
  |-- HTTP REST  -->  BFF Service (port 5000)
  |                     └── proxies to --> interaction-service (internal)
  |
  └── WebSocket  -->  WS Gateway  (port 3001)
                        └── Kafka pub/sub <-> all backend services
```

| Service | URL | Protocol | Purpose |
|---|---|---|---|
| `bff-service` | `http://<host>:5000` | HTTP REST | Friend operations (CRUD) |
| `ws-gateway` | `ws://<host>:3001` | Socket.IO | Real-time events (friend, typing, notification) |

---

## Authentication

Tất cả HTTP request và WebSocket connection đều yêu cầu **JWT access token**.

```ts
// HTTP
const api = axios.create({
  baseURL: 'http://<host>:5000',
  headers: { Authorization: `Bearer ${accessToken}` },
});

// WebSocket
const socket = io('ws://<host>:3001', {
  auth: { token: accessToken },
});
```

---

# 1. Friend Service

## 1.1 REST API Endpoints

Tất cả endpoints yêu cầu `Authorization: Bearer <token>`.

### Get Friends List

```
GET /friends?page=1&limit=20
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "fullName": "Nguyễn Văn A",
      "avatarUrl": "https://...",
      "phone": "0901234567"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 20
}
```

### Get Pending Requests (Received)

```
GET /friends/requests?page=1&limit=20
```

**Response:**
```json
{
  "data": [
    {
      "id": "request-uuid",
      "requester": {
        "id": "user-uuid",
        "fullName": "Nguyễn Văn B",
        "avatarUrl": "https://...",
        "phone": "0901234568"
      },
      "createdAt": "2026-03-26T10:00:00Z"
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 20
}
```

### Get Sent Requests

```
GET /friends/requests/sent?page=1&limit=20
```

### Send Friend Request

```
POST /friends/requests
Content-Type: application/json

{
  "targetUserId": "user-uuid"
}
```

**Response:** `201`
```json
{
  "message": "Friend request sent successfully",
  "requestId": "request-uuid"
}
```

**Errors:**
| Status | Description |
|--------|-------------|
| `400` | Cannot add yourself |
| `404` | User not found |
| `409` | Request already exists or already friends |

### Respond to Friend Request

```
POST /friends/requests/:requestId
Content-Type: application/json

{
  "action": "accepted" | "rejected"
}
```

**Response:** `200`
```json
{ "message": "Friend request accepted" }
```

### Cancel Sent Request

```
DELETE /friends/requests/:requestId
```

**Response:** `200`
```json
{ "message": "Friend request cancelled" }
```

### Remove Friend (Unfriend)

```
DELETE /friends/:friendId
```

**Response:** `200`
```json
{ "message": "Friend removed" }
```

### Block User

```
POST /friends/:userId/block
```

### Unblock User

```
DELETE /friends/:userId/block
```

> **Rate Limit:** GET endpoints: 20 req/min. POST/DELETE endpoints: 10 req/min.

---

## 1.2 WebSocket Events (Real-time)

Sau khi thao tác HTTP thành công, backend sẽ tự động emit WebSocket event đến user liên quan.

> **Lưu ý:** FE **không cần emit** các event này. Chỉ cần **listen** để cập nhật UI real-time.

### Events Reference

| Event Name | Receiver | Khi nào được emit |
|---|---|---|
| `friend:request:send` | Người nhận lời mời | Khi có lời mời kết bạn mới |
| `friend:request:respond` | Người gửi lời mời | Khi lời mời được accept/reject |
| `friend:request:cancel` | Người nhận lời mời | Khi lời mời bị hủy |
| `friend:removed` | Người bị unfriend | Khi bị xóa bạn |

### Payloads

#### `friend:request:send`

```ts
interface FriendRequestSendPayload {
  requestId: string;
  requester: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
    phone: string;
  };
}
```

#### `friend:request:respond`

```ts
interface FriendRequestRespondPayload {
  requestId: string;
  status: 'accepted' | 'rejected';
  addressee?: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
  };
}
```

#### `friend:request:cancel`

```ts
interface FriendRequestCancelPayload {
  requestId: string;
  requesterId: string;
}
```

#### `friend:removed`

```ts
interface FriendRemovedPayload {
  userId: string;   // ID của người đã unfriend bạn
}
```

### Implementation Example

```ts
// Listen for incoming friend request
socket.on('friend:request:send', (data: FriendRequestSendPayload) => {
  // Hiện toast/badge: "Nguyễn Văn A gửi lời mời kết bạn"
  addToPendingRequests(data);
});

// Listen for response to your sent request
socket.on('friend:request:respond', (data: FriendRequestRespondPayload) => {
  if (data.status === 'accepted') {
    // Thêm vào danh sách bạn bè
    addToFriendList(data.addressee);
    removeSentRequest(data.requestId);
  } else {
    // Xóa khỏi danh sách lời mời đã gửi
    removeSentRequest(data.requestId);
  }
});

// Listen for cancelled request
socket.on('friend:request:cancel', (data: FriendRequestCancelPayload) => {
  // Xóa lời mời khỏi danh sách pending
  removePendingRequest(data.requestId);
});

// Listen for friend removed
socket.on('friend:removed', (data: FriendRemovedPayload) => {
  // Xóa khỏi danh sách bạn bè
  removeFromFriendList(data.userId);
});
```

### Complete Flow Diagram

```
User A: POST /friends/requests { targetUserId: B }
  │
  ├──→ HTTP 201: { requestId, message }     (Response cho User A)
  │
  └──→ WebSocket 'friend:request:send'      (Push đến User B)
         { requestId, requester: { id: A, fullName, avatar, phone } }

User B: POST /friends/requests/:requestId { action: "accepted" }
  │
  ├──→ HTTP 200: { message }                (Response cho User B)
  │
  └──→ WebSocket 'friend:request:respond'   (Push đến User A)
         { requestId, status: "accepted", addressee: { id: B, fullName, avatar } }
```

---

# 2. Typing Indicator

Typing indicator hoạt động **hoàn toàn qua WebSocket** (không dùng HTTP).

## 2.1 Emit: Báo đang gõ

```ts
// Gửi khi user bắt đầu gõ (nên throttle 1s ở client)
socket.emit('chat:typing', {
  conversation_id: 'conv-uuid',
  username: 'Nguyễn Văn A',
});
```

**Payload:**
```ts
interface ChatTypingPayload {
  conversation_id: string;
  username: string;
}
```

## 2.2 Listen: Nhận danh sách đang gõ

```ts
socket.on('chat:typing:update', (data: ChatTypingUpdatePayload) => {
  // Cập nhật UI: "A, B đang nhập..."
  updateTypingIndicator(data.conversation_id, data.users);
});
```

**Payload:**
```ts
interface ChatTypingUpdatePayload {
  conversation_id: string;
  users: Array<{
    user_id: string;
    username: string;
  }>;
}
```

- Khi `users` là mảng rỗng `[]` → không ai đang gõ → ẩn indicator.

## 2.3 Behavior

| Tham số | Giá trị |
|---|---|
| TTL | 3 giây — tự động hết hạn nếu không gửi lại |
| Server throttle | 1 giây — server bỏ qua event nếu gửi quá nhanh |
| Cleanup delay | 3.5 giây — server kiểm tra lại và broadcast danh sách mới |
| Dedup | Server chỉ broadcast khi danh sách thay đổi |

## 2.4 Implementation Example

```ts
// Client-side throttle (1 second)
let typingTimeout: NodeJS.Timeout | null = null;

function onInputChange(conversationId: string, username: string) {
  if (typingTimeout) return;

  socket.emit('chat:typing', {
    conversation_id: conversationId,
    username: username,
  });

  typingTimeout = setTimeout(() => {
    typingTimeout = null;
  }, 1000);
}

// Listen for typing updates
socket.on('chat:typing:update', (data) => {
  const { conversation_id, users } = data;
  // Filter out own user
  const otherTypers = users.filter(u => u.user_id !== myUserId);

  if (otherTypers.length === 0) {
    hideTypingIndicator(conversation_id);
  } else if (otherTypers.length === 1) {
    showTypingIndicator(conversation_id, `${otherTypers[0].username} đang nhập...`);
  } else {
    showTypingIndicator(conversation_id, `${otherTypers.length} người đang nhập...`);
  }
});
```

> **Lưu ý:** User phải join room trước (`chat:join`) để nhận typing updates cho conversation đó.

---

# 3. Notification Service

Notification service gửi **push notification** (FCM) đến device. FE chỉ cần đăng ký device token.

## 3.1 Flow

```
interaction-service (friend action)
  │
  ├──→ Kafka: friend.request.send         → ws-gateway → WebSocket (real-time UI)
  │
  └──→ Kafka: notification.requested      → notification-service → FCM → Device
```

- **WebSocket events** = cập nhật UI khi app đang mở
- **Push notifications** = thông báo khi app đang tắt/background

## 3.2 Notification Types

| Type | Trigger | Title | Body |
|---|---|---|---|
| `friend_request` | Nhận lời mời kết bạn | "New friend request" | "{fullName} sent you a friend request" |
| `friend_accepted` | Lời mời được chấp nhận | "Friend request accepted" | "{fullName} accepted your friend request" |
| `chat_message` | Tin nhắn mới | (varies) | (varies) |
| `reaction` | Reaction mới | (varies) | (varies) |
| `missed_call` | Cuộc gọi nhỡ | (varies) | (varies) |
| `system` | Thông báo hệ thống | (varies) | (varies) |

## 3.3 FCM Integration (Client-side)

### Step 1: Register Device Token

Sau khi login, gửi FCM token lên server:

```ts
// Lấy FCM token từ Firebase SDK
const fcmToken = await messaging.getToken();

// Đăng ký device token
await api.post('/auth/device-tokens', {
  token: fcmToken,
  platform: 'web',   // 'web' | 'android' | 'ios'
});
```

### Step 2: Handle Foreground Notifications

```ts
import { onMessage } from 'firebase/messaging';

onMessage(messaging, (payload) => {
  const { title, body } = payload.notification;
  const data = payload.data;

  // Hiện toast notification
  showToast({ title, body });

  // Xử lý theo type
  if (data?.category === 'friend_request') {
    // Refresh pending requests
    refetchPendingRequests();
  } else if (data?.category === 'friend_accepted') {
    // Refresh friend list
    refetchFriendList();
  }
});
```

### Step 3: Handle Background Notifications

```ts
// firebase-messaging-sw.js (Service Worker)
self.addEventListener('notificationclick', (event) => {
  const data = event.notification.data;

  if (data?.category === 'friend_request') {
    clients.openWindow('/friends/requests');
  }
});
```

## 3.4 Rich Notification Data

Push notification payload chứa thêm data:

```json
{
  "notification": {
    "title": "New friend request",
    "body": "Nguyễn Văn A sent you a friend request",
    "image": "https://...avatar.jpg"
  },
  "data": {
    "request_id": "uuid",
    "requester_id": "uuid",
    "category": "friend_request",
    "action_url": "/friends/requests"
  }
}
```

## 3.5 User Preferences

Notification service hỗ trợ:
- **Push enabled/disabled** — user có thể tắt push notification
- **Quiet hours** — không gửi push trong khoảng thời gian nhất định (VD: 22:00 - 07:00)

---

# 4. Summary — Events Map

## WebSocket Events (Listen only)

| Event | Direction | Description |
|---|---|---|
| `friend:request:send` | Server → Client | Lời mời kết bạn mới |
| `friend:request:respond` | Server → Client | Phản hồi lời mời (accept/reject) |
| `friend:request:cancel` | Server → Client | Lời mời bị hủy |
| `friend:removed` | Server → Client | Bị xóa bạn |
| `chat:typing` | Client → Server | Báo đang gõ |
| `chat:typing:update` | Server → Client | Danh sách đang gõ trong room |

## HTTP Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/friends` | Danh sách bạn bè |
| `GET` | `/friends/requests` | Lời mời nhận được |
| `GET` | `/friends/requests/sent` | Lời mời đã gửi |
| `POST` | `/friends/requests` | Gửi lời mời |
| `POST` | `/friends/requests/:id` | Chấp nhận/từ chối |
| `DELETE` | `/friends/requests/:id` | Hủy lời mời đã gửi |
| `DELETE` | `/friends/:friendId` | Xóa bạn |
| `POST` | `/friends/:userId/block` | Chặn user |
| `DELETE` | `/friends/:userId/block` | Bỏ chặn |
| `POST` | `/auth/device-tokens` | Đăng ký FCM token |
