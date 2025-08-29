export class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    public getValue(): T {
        return this.value;
    }

    public setValue(newValue: T): void {
        this.value = newValue;
    }

    public display(): void {
        console.log(`Box contains: ${this.value} (type: ${typeof this.value})`);
    }

    public static demonstrateGenerics(): void {
        console.log("\n=== Generic Box Demonstration ===");
        
        const numberBox = new Box<number>(42);
        numberBox.display();
        
        const stringBox = new Box<string>("Hello, TypeScript!");
        stringBox.display();
        
        const booleanBox = new Box<boolean>(true);
        booleanBox.display();
        
        const arrayBox = new Box<number[]>([1, 2, 3, 4, 5]);
        arrayBox.display();
        
        const objectBox = new Box<{name: string, age: number}>({name: "John", age: 30});
        objectBox.display();
        
        console.log("\n=== Changing Values ===");
        numberBox.setValue(100);
        numberBox.display();
        
        stringBox.setValue("Updated value");
        stringBox.display();
    }
}

export class Pair<T, U> {
    private first: T;
    private second: U;

    constructor(first: T, second: U) {
        this.first = first;
        this.second = second;
    }

    public getFirst(): T {
        return this.first;
    }

    public getSecond(): U {
        return this.second;
    }

    public setFirst(newFirst: T): void {
        this.first = newFirst;
    }

    public setSecond(newSecond: U): void {
        this.second = newSecond;
    }

    public display(): void {
        console.log(`Pair: (${this.first}, ${this.second})`);
    }
}
