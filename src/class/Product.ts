export class Product {
    private name: string;
    private price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }

    public displayInfo(): void {
        console.log(`Product: ${this.name}, Price: $${this.price}`);
    }

    public static filterExpensiveProducts(products: Product[]): Product[] {
        return products.filter(product => product.getPrice() > 100);
    }

    public static demoFiltering(): void {
        const products: Product[] = [
            new Product("Laptop", 1200),
            new Product("Mouse", 25),
            new Product("Keyboard", 80),
            new Product("Monitor", 300),
            new Product("Headphones", 50)
        ];

        console.log("All Products:");
        products.forEach(product => product.displayInfo());

        console.log("\nExpensive Products (price > $100):");
        const expensiveProducts = Product.filterExpensiveProducts(products);
        expensiveProducts.forEach(product => product.displayInfo());
    }
}
