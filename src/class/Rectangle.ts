export class Rectangle {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public area(): number {
        return this.width * this.height;
    }

    public perimeter(): number {
        return 2 * (this.width + this.height);
    }

    public displayInfo(): void {
        console.log(`Rectangle: width=${this.width}, height=${this.height}`);
        console.log(`Area: ${this.area()}, Perimeter: ${this.perimeter()}`);
    }
}
