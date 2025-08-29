export class User {
    private _name: string;
    private id: number;
    private static nextId: number = 1;

    constructor(_name: string) {
        this._name = _name;
        this.id = User.nextId++;
    }

    public get name(): string {
        return this._name;
    }

    public set name(newName: string) {
        if (newName && newName.trim().length > 0) {
            this._name = newName.trim();
            console.log(`Name changed to: ${this._name}`);
        } else {
            console.log("Invalid name provided");
        }
    }

    public getId(): number {
        return this.id;
    }

    public displayInfo(): void {
        console.log(`User ID: ${this.id}, Name: ${this._name}`);
    }

    public static getTotalUsers(): number {
        return User.nextId - 1;
    }
}
