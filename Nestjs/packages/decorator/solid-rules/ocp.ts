// Not following OCP
// class Rectangle {
//     constructor(public width: number, public height: number) {}
// }

// class AreaCalculator {
//     calculateArea(shape: any) {
//         if (shape instanceof Rectangle) {
//             return shape.width * shape.height;
//         }
//         // Add other shapes here...
//     }
// }

// Following OCP
interface Shape {
    calculateArea(): number;
}

class Rectangle implements Shape {
    constructor(public width: number, public height: number) {}
    calculateArea(): number {
        return this.width * this.height;
    }
}

class Circle implements Shape {
    constructor(public radius: number) {}
    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class AreaCalculator {
    calculateArea(shape: Shape): number {
        return shape.calculateArea();
    }
}
