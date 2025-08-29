export class Repository<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return [...this.items]; // Return a copy to prevent external modification
    }

    getById(id: number): T | undefined {
        return this.items[id];
    }

    remove(item: T): boolean {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    count(): number {
        return this.items.length;
    }
}
