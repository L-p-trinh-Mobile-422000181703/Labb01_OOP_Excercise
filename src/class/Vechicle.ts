export interface Vehicle {
    name: string;
    speed: number;
    start(): void;
    stop(): void;
}

export class Car implements Vehicle {
    name: string;
    speed: number;
    constructor(name: string, speed: number) {
        this.name = name;
        this.speed = speed;
    }
    start(): void {
        console.log(`${this.name} is starting`);
    }
    stop(): void {
        console.log(`${this.name} is stopping`);
    }
}

export class Bike implements Vehicle {
    name: string;
    speed: number;
    constructor(name: string, speed: number) {
        this.name = name;
        this.speed = speed;
    }
    start(): void {
        console.log(`${this.name} is starting`);
    }
    stop(): void {
        console.log(`${this.name} is stopping`);
    }
}

