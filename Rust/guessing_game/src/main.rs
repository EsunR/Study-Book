use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("猜数字");
    // 生成秘密数字
    let secret_number = rand::thread_rng().gen_range(1, 101);
    println!("秘密数字是{}", secret_number);
    // 获取用户输入的数字
    println!("请放一个你选的数字");
    let mut guess = String::new();
    io::stdin().read_line(&mut guess).expect("读不出来啊");
    let guess: u32 = guess.trim().parse().expect("您需要填写一哥数字"); // 类型转换
    println!("你选的是: {}", guess);
    // 对比数字
    match guess.cmp(&secret_number) {
        Ordering::Less => println!("猜小了"),
        Ordering::Greater => println!("猜大了"),
        Ordering::Equal => println!("恭喜！猜对了!"),
    }
}
