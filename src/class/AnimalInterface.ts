export interface Animal {
    name: string;
    sound(): void;
}

export interface Fylable extends Animal {
    featherColor: string;
}

export interface SwimAble {
    name: string;
    speed: number;
    fins: number;
}

export class Dog implements Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sound(): void {
        console.log(`${this.name} says: Woof! Woof!`);
    }
}

export class Cat implements Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sound(): void {
        console.log(`${this.name} says: Meow! Meow!`);
    }
}


export class Bird implements Fylable {
    featherColor: string;
    name: string;

     constructor(name: string, featherColor: string) {
        this.name = name;
        this.featherColor = featherColor;
    }

    sound(): void {
        console.log(`${this.name} says: Tweet! Tweet!`);
    }
    
}

export class Fish implements SwimAble {
    name: string;
    speed: number;
    fins: number;
    
     constructor(name: string, speed: number, fins: number) {
        this.name = name;
        this.speed = speed;
        this.fins = fins;
    }

}