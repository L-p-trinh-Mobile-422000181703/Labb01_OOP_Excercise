export interface Movable {
    move(): void;
}

export class Car implements Movable {
    private name: string;
    private speed: number;

    constructor(name: string, speed: number) {
        this.name = name;
        this.speed = speed;
    }

    move(): void {
        console.log(`${this.name} is driving at ${this.speed} km/h`);
    }

    getName(): string {
        return this.name;
    }
}

export class Robot implements Movable {
    private name: string;
    private batteryLevel: number;

    constructor(name: string, batteryLevel: number = 100) {
        this.name = name;
        this.batteryLevel = batteryLevel;
    }

    move(): void {
        if (this.batteryLevel > 0) {
            console.log(`${this.name} robot is moving. Battery: ${this.batteryLevel}%`);
            this.batteryLevel -= 5;
        } else {
            console.log(`${this.name} robot cannot move. Battery is empty!`);
        }
    }

    charge(): void {
        this.batteryLevel = 100;
        console.log(`${this.name} robot is fully charged`);
    }

    getName(): string {
        return this.name;
    }
}
