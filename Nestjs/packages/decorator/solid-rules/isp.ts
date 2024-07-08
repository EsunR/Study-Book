// Not following ISP
// interface Animal {
//     eat(): void;
//     fly(): void;
// }

// class Dog implements Animal {
//     eat() {
//         // Dog can eat
//     }
//     fly() {
//         // Dog cannot fly, but forced to implement
//     }
// }

// Following ISP
interface Eater {
    eat(): void;
}

interface Flyer {
    fly(): void;
}

class Dog implements Eater {
    eat() {
        // Dog can eat
    }
}

class Bird implements Eater, Flyer {
    eat() {
        // Bird can eat
    }
    fly() {
        // Bird can fly
    }
}

export {};
