import { Product } from "./Product";

export class Order {
    private products: Product[] = [];
    private orderId: string;

    constructor(orderId: string) {
        this.orderId = orderId;
    }

    addProduct(product: Product): void {
        this.products.push(product);
    }

    removeProduct(product: Product): boolean {
        const index = this.products.indexOf(product);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }

    calculateTotalPrice(): number {
        return this.products.reduce((total, product) => total + product.getPrice(), 0);
    }

    getProducts(): Product[] {
        return [...this.products];
    }

    getOrderId(): string {
        return this.orderId;
    }

    displayOrder(): void {
        console.log(`Order ID: ${this.orderId}`);
        console.log("Products:");
        this.products.forEach(product => {
            console.log(`- ${product.getName()}: $${product.getPrice()}`);
        });
        console.log(`Total: $${this.calculateTotalPrice()}`);
    }
}
