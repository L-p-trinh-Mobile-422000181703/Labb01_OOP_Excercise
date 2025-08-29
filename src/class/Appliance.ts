export abstract class Appliance {
    protected name: string;
    protected isOn: boolean = false;

    constructor(name: string) {
        this.name = name;
    }

    abstract turnOn(): void;

    turnOff(): void {
        this.isOn = false;
        console.log(`${this.name} is turned off`);
    }

    getStatus(): boolean {
        return this.isOn;
    }
}

export class Fan extends Appliance {
    private speed: number = 0;

    constructor(name: string) {
        super(name);
    }

    turnOn(): void {
        this.isOn = true;
        this.speed = 1;
        console.log(`${this.name} fan is turned on at speed ${this.speed}`);
    }

    setSpeed(speed: number): void {
        if (this.isOn && speed >= 1 && speed <= 5) {
            this.speed = speed;
            console.log(`${this.name} fan speed set to ${this.speed}`);
        }
    }
}

export class AirConditioner extends Appliance {
    private temperature: number = 24;

    constructor(name: string) {
        super(name);
    }

    turnOn(): void {
        this.isOn = true;
        console.log(`${this.name} air conditioner is turned on at ${this.temperature}°C`);
    }

    setTemperature(temp: number): void {
        if (this.isOn && temp >= 16 && temp <= 30) {
            this.temperature = temp;
            console.log(`${this.name} temperature set to ${this.temperature}°C`);
        }
    }
}
