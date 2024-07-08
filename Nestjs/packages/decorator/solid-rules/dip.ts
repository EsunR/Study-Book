// Not following DIP
// class MySQLDatabase {
//     connect() {
//         // Connect to MySQL database
//     }
// }

// class UserRepository {
//     private database: MySQLDatabase;

//     constructor() {
//         // 这里直接依赖一个实例，如果想要使用其他的数据库，变更将变得困难
//         this.database = new MySQLDatabase();
//     }

//     save(user: any) {
//         this.database.connect();
//         // Save user to database
//     }
// }

// Following DIP
interface Database {
    connect(): void;
}

class MySQLDatabase implements Database {
    connect() {
        // Connect to MySQL database
    }
}

class UserRepository {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    save(user: any) {
        this.database.connect();
        // Save user to database
    }
}

export {};
