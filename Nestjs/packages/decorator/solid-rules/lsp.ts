// Not following LSP
// class Bird {
//     fly() {
//         // Bird can fly
//     }
// }

// class Penguin extends Bird {
//     fly() {
//         throw new Error("Penguins cannot fly");
//     }
// }

// Following LSP
class Bird {
    move() {
        // Bird can move
    }
}

class FlyingBird extends Bird {
    fly() {
        // Bird can fly
    }
}

class Penguin extends Bird {
    move() {
        // Penguins can move
    }
}
