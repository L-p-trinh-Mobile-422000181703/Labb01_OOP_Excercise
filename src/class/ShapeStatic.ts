export class Shape {
    static describe(): string {
        return "A shape is a geometric figure that can be drawn on a plane";
    }

    static getTypes(): string[] {
        return ["Circle", "Rectangle", "Triangle", "Square", "Pentagon", "Hexagon"];
    }

    static calculateArea(type: string, ...dimensions: number[]): number {
        switch (type.toLowerCase()) {
            case "circle":
                return Math.PI * Math.pow(dimensions[0], 2);
            case "rectangle":
                return dimensions[0] * dimensions[1];
            case "square":
                return Math.pow(dimensions[0], 2);
            case "triangle":
                return 0.5 * dimensions[0] * dimensions[1];
            default:
                throw new Error("Unknown shape type");
        }
    }
}
