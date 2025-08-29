export class Person {
    protected name: string;
    protected age: number;

    constructor(name: string, age: number ) {
        this.name = name
        this.age = age
    }

    public display(): void {
        console.log(`This Person have ${this.name} name and ${this.age} age`);
        
    }
}


export class Student extends Person {
    private grade: number;

    constructor(name: string, age: number, grade: number) {
        super(name, age);
        this.grade = grade
    }

       public display(): void {
        console.log(`This Student have ${this.name} name and ${this.age} age, have ${this.grade} grade`);
        
    }
}

export class Teacher extends Person {
    private subject: string;

    constructor(name: string, age: number, subject: string) {
        super(name, age);
        this.subject = subject;
    }

    introduce(): void {
        console.log(`Hello, I'm ${this.name}, I'm ${this.age} years old and I teach ${this.subject}`);
    }

    public display(): void {
        console.log(`This Teacher have ${this.name} name and ${this.age} age, teaches ${this.subject}`);
    }

    getSubject(): string {
        return this.subject;
    }
}
