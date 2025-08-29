export class MathUlti {
    static sum(...numbers: number[]): number {
        return numbers.reduce((a, b) => a + b, 0);
    }
    static subtract(...numbers: number[]): number {
        return numbers.reduce((a, b) => a - b, 0);
    }
    static multiply(...numbers: number[]): number {
        return numbers.reduce((a, b) => a * b, 1);
    }
    static divide(...numbers: number[]): number {
        return numbers.reduce((a, b) => a / b, 1);
    }
}
