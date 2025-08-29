import { Student, Teacher } from "./Person";

export class School {
    private name: string;
    private students: Student[] = [];
    private teachers: Teacher[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addStudent(student: Student): void {
        this.students.push(student);
    }

    addTeacher(teacher: Teacher): void {
        this.teachers.push(teacher);
    }

    removeStudent(student: Student): boolean {
        const index = this.students.indexOf(student);
        if (index !== -1) {
            this.students.splice(index, 1);
            return true;
        }
        return false;
    }

    removeTeacher(teacher: Teacher): boolean {
        const index = this.teachers.indexOf(teacher);
        if (index !== -1) {
            this.teachers.splice(index, 1);
            return true;
        }
        return false;
    }

    displayInfo(): void {
        console.log(`\n=== ${this.name} School Information ===`);
        console.log(`Total Students: ${this.students.length}`);
        console.log(`Total Teachers: ${this.teachers.length}`);
        
        console.log("\n--- Teachers ---");
        this.teachers.forEach((teacher, index) => {
            console.log(`${index + 1}. ${teacher.getSubject()} Teacher:`);
            teacher.display();
        });

        console.log("\n--- Students ---");
        this.students.forEach((student, index) => {
            console.log(`${index + 1}.`);
            student.display();
        });
    }

    getStudents(): Student[] {
        return [...this.students];
    }

    getTeachers(): Teacher[] {
        return [...this.teachers];
    }

    getName(): string {
        return this.name;
    }
}
