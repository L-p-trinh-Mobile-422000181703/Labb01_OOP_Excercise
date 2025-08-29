export abstract class Shape {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    public abstract area(): number;

    public abstract perimeter(): number;

    public displayInfo(): void {
        console.log(`Shape: ${this.name}`);
        console.log(`Area: ${this.area()}`);
        console.log(`Perimeter: ${this.perimeter()}`);
    }
}

export class Square extends Shape {
    private side: number;

    constructor(side: number) {
        super("Square");
        this.side = side;
    }

    public area(): number {
        return this.side * this.side;
    }

    public perimeter(): number {
        return 4 * this.side;
    }

    public getSide(): number {
        return this.side;
    }
}

export class Circle extends Shape {
    private radius: number;

    constructor(radius: number) {
        super("Circle");
        this.radius = radius;
    }

    public area(): number {
        return Math.PI * this.radius * this.radius;
    }

    public perimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    public getRadius(): number {
        return this.radius;
    }
}
