export class Employee {
    protected name: string;
    protected id: number;
    protected salary: number;
    private static nextId: number = 1;

    constructor(name: string, salary: number) {
        this.name = name;
        this.id = Employee.nextId++;
        this.salary = salary;
    }

    public work(): void {
        console.log(`${this.name} is working`);
    }

    public getSalary(): number {
        return this.salary;
    }

    public displayInfo(): void {
        console.log(`Employee ID: ${this.id}, Name: ${this.name}, Salary: $${this.salary}`);
    }
}

export class Manager extends Employee {
    private department: string;
    private teamSize: number;

    constructor(name: string, salary: number, department: string, teamSize: number) {
        super(name, salary);
        this.department = department;
        this.teamSize = teamSize;
    }

    public conductMeeting(): void {
        console.log(`${this.name} is conducting a meeting for the ${this.department} department`);
    }

    public manageTeam(): void {
        console.log(`${this.name} is managing a team of ${this.teamSize} people`);
    }

    public displayInfo(): void {
        console.log(`Manager ID: ${this.id}, Name: ${this.name}, Salary: $${this.salary}`);
        console.log(`Department: ${this.department}, Team Size: ${this.teamSize}`);
    }
}

export class Developer extends Employee {
    private programmingLanguage: string;
    private project: string;

    constructor(name: string, salary: number, programmingLanguage: string, project: string) {
        super(name, salary);
        this.programmingLanguage = programmingLanguage;
        this.project = project;
    }

    public writeCode(): void {
        console.log(`${this.name} is writing code in ${this.programmingLanguage}`);
    }

    public debugCode(): void {
        console.log(`${this.name} is debugging code for project: ${this.project}`);
    }

    public displayInfo(): void {
        console.log(`Developer ID: ${this.id}, Name: ${this.name}, Salary: $${this.salary}`);
        console.log(`Language: ${this.programmingLanguage}, Project: ${this.project}`);
    }
}
