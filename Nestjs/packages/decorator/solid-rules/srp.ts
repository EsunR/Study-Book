// Not following SRP
// class User {
//     constructor(public name: string, public email: string) {}

//     save() {
//         // Save user to database
//     }

//     sendEmail() {
//         // Send welcome email
//     }
// }

// Following SRP
class User {
    constructor(public name: string, public email: string) {}
}

class UserRepository {
    save(user: User) {
        // Save user to database
    }
}

class EmailService {
    sendWelcomeEmail(user: User) {
        // Send welcome email
    }
}
