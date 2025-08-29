// Import statements
import { Animal, Cat, Bird, Fish } from "./class/AnimalInterface";
import { BankAccount } from "./class/BankAccount";
import { Book } from "./class/Book";
import { Manager, Developer, Employee } from "./class/EmployeeHierarchy";
import { Box } from "./class/GenericBox";
import { Library } from "./class/Library";
import { Logger } from "./class/LoggerSingleton";
import { MathUlti } from "./class/MathUlti";
import { Person, Student, Teacher } from "./class/Person";
import { Product } from "./class/Product";
import { Rectangle } from "./class/Rectangle";
import { Square, Circle } from "./class/ShapeAbstract";
import { User } from "./class/User";
import { Bike, Car, Vehicle } from "./class/Vechicle";
import { Repository } from "./class/Repository";
import { Stack } from "./class/Stack";
import { Payment, CashPayment, CardPayment } from "./class/Payment";
import { Appliance, Fan, AirConditioner } from "./class/Appliance";
import { Shape } from "./class/ShapeStatic";
import { Order } from "./class/Order";
import { Animal as AnimalClass, Dog as DogClass, Cat as CatClass } from "./class/AnimalClass";
import { Movable, Car as MovableCar, Robot } from "./class/Movable";
import { School } from "./class/School";


console.log("\n=== LAB 01 - OOP EXERCISES ===\n");

// ==================== BÀI 1: Person Class ====================
console.log("--- Bài 1: Person Class ---");
const person1 = new Person("Phat", 20);
person1.display();

// ==================== BÀI 2: Student Class ====================
console.log("\n--- Bài 2: Student Class ---");
const student1 = new Student("Phat", 20, 10);
student1.display();

// ==================== BÀI 3: Car Class ====================
console.log("\n--- Bài 3: Car Class ---");
const car1 = new Car("Toyota", 100);
car1.start();
car1.stop();

// ==================== BÀI 4: Rectangle Class ====================
console.log("\n--- Bài 4: Rectangle Class ---");
const rect1 = new Rectangle(10, 5);
console.log(`Area: ${rect1.area()}`);
console.log(`Perimeter: ${rect1.perimeter()}`);

// ==================== BÀI 5: BankAccount Class ====================
console.log("\n--- Bài 5: BankAccount Class ---");
const account1 = new BankAccount(1000);
account1.deposit(500);
account1.withdraw(300);

// ==================== BÀI 6: Book Class ====================
console.log("\n--- Bài 6: Book Class ---");
const book1 = new Book("Clean Code", "Robert Martin", 2008);
console.log(`Book created: ${book1.getTitle()} by ${book1.getAuthor()}`);

// ==================== BÀI 7: User Class ====================
console.log("\n--- Bài 7: User Class ---");
const user1 = new User("John");
console.log(`Original name: ${user1.name}`);
user1.name = "Bob";
console.log(`Updated name: ${user1.name}`);

// ==================== BÀI 8: Product Filter ====================
console.log("\n--- Bài 8: Product Filter ---");
const products: Product[] = [
  new Product("Laptop", 50),
  new Product("Phone", 150),
];
const expensiveProducts = products.filter(p => p.getPrice() > 100);
console.log(`Expensive products: ${expensiveProducts.map(p => p.getName()).join(", ")}`);

// ==================== BÀI 9: Animal Interface ====================
console.log("\n--- Bài 9: Animal Interface ---");
class Dog implements Animal {
  name = "Dog";
  sound() {
    console.log("Bark");
  }
}
const animalDog = new Dog();
animalDog.sound();

// ==================== BÀI 11: Animal Implementations ====================
console.log("\n--- Bài 11: Animal Implementations ---");
const dog = new Dog();
dog.sound();
const cat = new Cat("Whiskers");
cat.sound();

// ==================== BÀI 12: Bird and Fish Classes ====================
console.log("\n--- Bài 12: Bird and Fish Classes ---");
const bird1 = new Bird("Tweety", "yellow");
bird1.sound();
const fish1 = new Fish("Nemo", 100, 2);
console.log(`Fish fins: ${fish1.fins}`);

// ==================== BÀI 13: Abstract Shapes ====================
console.log("\n--- Bài 13: Abstract Shapes ---");
const square1 = new Square(4);
console.log(`Square area: ${square1.area()}`);
const circle1 = new Circle(5);
console.log(`Circle area: ${circle1.area().toFixed(2)}`);

// ==================== BÀI 14: Employee Hierarchy ====================
console.log("\n--- Bài 14: Employee Hierarchy ---");
const employee1 = new Employee("John", 1000);
employee1.displayInfo();
const manager = new Manager("Alice", 2000, "Sales", 5);
manager.displayInfo();
const developer = new Developer("Bob", 1800, "TypeScript", "E-commerce");
developer.displayInfo();

// ==================== BÀI 15: Library System ====================
console.log("\n--- Bài 15: Library System ---");
const library = new Library("City Library");
console.log("Initial state:");
library.displayAllBooks();
library.displayAllUsers();
console.log("After adding book and user:");
library.addBook(book1);
library.addUser(user1);
library.displayAllBooks();
library.displayAllUsers();

// ==================== BÀI 16: Generic Box ====================
console.log("\n--- Bài 16: Generic Box ---");
const stringBox = new Box<string>("Hello TypeScript");
console.log(`Box value: ${stringBox.getValue()}`);
const numberBox = new Box<number>(42);
console.log(`Number box value: ${numberBox.getValue()}`);

// ==================== BÀI 17: Singleton Logger ====================
console.log("\n--- Bài 17: Singleton Logger ---");
const logger = Logger.getInstance();
logger.log("First message");
logger.log("Second message");
logger.displayAllLogs();

// ==================== BÀI 18: Math Utilities ====================
console.log("\n--- Bài 18: Math Utilities ---");
console.log(`Sum: ${MathUlti.sum(1, 2, 3, 4, 5)}`);
console.log(`Subtract: ${MathUlti.subtract(10, 2, 1)}`);
console.log(`Multiply: ${MathUlti.multiply(2, 3, 4)}`);
console.log(`Divide: ${MathUlti.divide(100, 2, 5)}`);

// ==================== BÀI 19: Method Overriding với Polymorphism ====================
console.log("\n--- Bài 19: Method Overriding với Polymorphism ---");
const animals: Animal[] = [
  new Cat("Whiskers"),
  new Bird("Tweety", "yellow")
];
console.log("Polymorphism demonstration:");
animals.forEach(animal => animal.sound());

// ==================== BÀI 20: Vehicle Interface ====================
console.log("\n--- Bài 20: Vehicle Interface ---");
const vehicles: Vehicle[] = [
  new Car("Toyota Camry", 180),
  new Bike("Honda CBR", 120)
];
console.log("Vehicle operations:");
vehicles.forEach(vehicle => {
  vehicle.start();
  vehicle.stop();
  console.log("---");
});

// ==================== BÀI 21: Generic Repository ====================
console.log("\n--- Bài 21: Generic Repository ---");
const productRepo = new Repository<Product>();
productRepo.add(new Product("Gaming Laptop", 1500));
productRepo.add(new Product("Wireless Mouse", 35));
productRepo.add(new Product("Mechanical Keyboard", 120));
console.log(`Repository contains ${productRepo.count()} items:`);
console.log(productRepo.getAll().map(p => `- ${p.getName()}: $${p.getPrice()}`).join("\n"));

// ==================== BÀI 22: Stack Implementation ====================
console.log("\n--- Bài 22: Stack Implementation ---");
const stack = new Stack<string>();
console.log(`Stack is empty: ${stack.isEmpty()}`);
stack.push("First Item");
stack.push("Second Item");
stack.push("Third Item");
console.log(`Stack size: ${stack.size()}`);
console.log(`Peek: ${stack.peek()}`);
console.log(`Pop: ${stack.pop()}`);
console.log(`After pop, size: ${stack.size()}`);
console.log(`Is empty: ${stack.isEmpty()}`);

// ==================== BÀI 23: Payment Interface ====================
console.log("\n--- Bài 23: Payment Interface ---");
const payments: Payment[] = [
  new CashPayment(),
  new CardPayment("4532-1234-5678-9012")
];
console.log("Processing payments:");
payments.forEach((payment, index) => {
  console.log(`Payment method ${index + 1}:`);
  payment.pay(150);
});

// ==================== BÀI 24: Abstract Appliance ====================
console.log("\n--- Bài 24: Abstract Appliance ---");
const fan = new Fan("Ceiling Fan");
const ac = new AirConditioner("Split AC");

console.log("Fan operations:");
fan.turnOn();
fan.setSpeed(3);
fan.turnOff();

console.log("\nAC operations:");
ac.turnOn();
ac.setTemperature(22);
ac.turnOff();

// ==================== BÀI 25: Shape với Static Methods ====================
console.log("\n--- Bài 25: Shape với Static Methods ---");
console.log(`Description: ${Shape.describe()}`);
console.log(`Available types: ${Shape.getTypes().join(", ")}`);
console.log(`Circle area (radius 5): ${Shape.calculateArea("circle", 5).toFixed(2)}`);
console.log(`Rectangle area (10x6): ${Shape.calculateArea("rectangle", 10, 6)}`);
console.log(`Square area (side 4): ${Shape.calculateArea("square", 4)}`);

// ==================== BÀI 26: Order với Product List ====================
console.log("\n--- Bài 26: Order với Product List ---");
const order = new Order("ORD-2024-001");
order.addProduct(new Product("Wireless Keyboard", 85));
order.addProduct(new Product("4K Monitor", 350));
order.addProduct(new Product("USB-C Hub", 45));
order.displayOrder();

// ==================== BÀI 27: Teacher extends Person ====================
console.log("\n--- Bài 27: Teacher extends Person ---");
const teacher = new Teacher("Dr. Emily Smith", 42, "Computer Science");
teacher.introduce();
teacher.display();

// ==================== BÀI 28: Animal với Protected makeSound ====================
console.log("\n--- Bài 28: Animal với Protected makeSound ---");
const dogAnimal = new DogClass("Rex");
const catAnimal = new CatClass("Luna");
console.log("Using public methods to access protected makeSound:");
dogAnimal.bark();
catAnimal.meow();

// ==================== BÀI 29: Movable Interface ====================
console.log("\n--- Bài 29: Movable Interface ---");
const movables: Movable[] = [
  new MovableCar("Tesla Model 3", 200),
  new Robot("WALL-E", 85)
];
console.log("Movable objects in action:");
movables.forEach((movable, index) => {
  console.log(`Object ${index + 1}:`);
  movable.move();
  if (movable instanceof Robot) {
    movable.move(); // Reduce battery
    movable.charge(); // Recharge
  }
});

// ==================== BÀI 30: School với Students và Teachers ====================
console.log("\n--- Bài 30: School với Students và Teachers ---");
const school = new School("International High School");
school.addStudent(new Student("Alice Johnson", 16, 11));
school.addStudent(new Student("Bob Wilson", 17, 12));
school.addStudent(new Student("Carol Davis", 15, 10));
school.addTeacher(new Teacher("Ms. Sarah Connor", 35, "English Literature"));
school.addTeacher(new Teacher("Mr. John Smith", 42, "Physics"));
school.addTeacher(new Teacher("Dr. Maria Garcia", 38, "Chemistry"));
school.displayInfo();

console.log("\n=== END OF LAB EXERCISES ===");
