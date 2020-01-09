# 1. 搭建 Rust 环境

[安装文档](https://www.rust-lang.org/zh-CN/tools/install)，新手推荐安装默认配置，同时为了编译 Rust，需要 C++ Build Tools 的支持，所以在安装 Rust 环境前为了避免造成不必要的麻烦，需要先安装 Visual Studio 2015 以上的版本，并选择安装 C++ 的开发环境。

安装完毕后，可以使用 `rustup --version` 来查看版本信息，如果无效，则需要将用户目录下的 `[UserFloder]/.cargo/bin` 添加到 Path 中（对于 Linux 与 Windows 都是如此）。这时便可以使用 `reustc xxx.rs` 来执行编译指令，在 Windows 环境下将会编译为一个 `.exe` 可执行文件，可以直接运行。

在 VS Code 下，可以安装 Rust(RLS) 插件来获取 Rust 的语法支持，同时要按照引导下载 rust-rls 才可以开启编译器环境下的语法提示与格式化等功能。Rust(RLS) 插件对于单一的 `.rs` 文件部分功能无法生效，且系统会提示缺少 Cargo.toml 文件，这是因为 RLS 需要使用 cargo 创建标准的工作目录才可以生效。

# 2. 使用 Cargo 管理项目

cargo 是 Rust 的包管理、项目管理工具，通过 cargo 指令可以轻松创建、编译、运行、打包 Rust 项目：

```sh
# 创建项目
$ cargo new test_project
$ cd test_project

# 运行项目
$ cargo run

# 构建项目
$ cargo build

# 发布项目
$ cargo build --release
```

Cargo.toml 文件下的 `[dependencies]` 下的信息记录了当前项目的安装的依赖，Cargo.lock 则负责计算出当前所有依赖的版本信息，如果需要升级所有的依赖，则运行：

```sh
$ cargo update
```

每次安装或删除依赖后，运行 `$cargo build` 就会重新安装所缺少的依赖。