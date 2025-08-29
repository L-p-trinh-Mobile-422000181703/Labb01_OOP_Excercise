export class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    protected makeSound(): void {
        console.log(`${this.name} makes a sound`);
    }

    getName(): string {
        return this.name;
    }
}

export class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }

    makeSound(): void {
        console.log(`${this.name} barks: Woof! Woof!`);
    }

    // Public method to access protected makeSound
    bark(): void {
        this.makeSound();
    }
}

export class Cat extends Animal {
    constructor(name: string) {
        super(name);
    }

    makeSound(): void {
        console.log(`${this.name} meows: Meow! Meow!`);
    }

    // Public method to access protected makeSound
    meow(): void {
        this.makeSound();
    }
}
