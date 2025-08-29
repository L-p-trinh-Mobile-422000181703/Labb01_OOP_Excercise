import { Book } from "./Book";
import { User } from "./User";

export class Library {
    private books: Book[];
    private users: User[];
    private name: string;

    constructor(name: string) {
        this.name = name;
        this.books = [];
        this.users = [];
    }

    public addBook(book: Book): void {
        this.books.push(book);
        console.log(`Book "${book.getTitle()}" added to library`);
    }

    public addUser(user: User): void {
        this.users.push(user);
        console.log(`User "${user.name}" added to library`);
    }

    public displayAllBooks(): void {
        console.log(`\n=== Books in ${this.name} Library ===`);
        if (this.books.length === 0) {
            console.log("No books available");
        } else {
            this.books.forEach(book => book.displayInfo());
        }
    }

    public displayAllUsers(): void {
        console.log(`\n=== Users of ${this.name} Library ===`);
        if (this.users.length === 0) {
            console.log("No users registered");
        } else {
            this.users.forEach(user => user.displayInfo());
        }
    }

    public findBookByTitle(title: string): Book | undefined {
        return this.books.find(book => 
            book.getTitle().toLowerCase() === title.toLowerCase()
        );
    }

    public findUserById(id: number): User | undefined {
        return this.users.find(user => user.getId() === id);
    }

    public getTotalBooks(): number {
        return this.books.length;
    }

    public getTotalUsers(): number {
        return this.users.length;
    }

    public displayLibraryInfo(): void {
        console.log(`\n=== ${this.name} Library Information ===`);
        console.log(`Total Books: ${this.getTotalBooks()}`);
        console.log(`Total Users: ${this.getTotalUsers()}`);
    }
}
