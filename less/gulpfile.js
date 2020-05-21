var gulp = require("gulp");
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var less = require("gulp-less");
var cleanCss = require("gulp-clean-css");
var htmlMin = require("gulp-htmlmin");
var livereload = require("gulp-livereload");
var connect = require("gulp-connect");
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
var open = require("open");
var babel = require("gulp-babel");
var clean = require("gulp-clean");
var sass = require("gulp-sass");
sass.compiler = require("node-sass");
var cache = require("gulp-cache"); // 清除缓存
var spritesmith = require("gulp.spritesmith");
var merge = require("merge-stream");
var rev = require("gulp-rev"); //- 对文件名加MD5后缀
var revCollector = require("gulp-rev-collector"); //- 路径替换

// 合并压缩js文件
gulp.task("js", function () {
  return (
    gulp
      .src("src/js/**/*.js")
      .pipe(
        babel({
          presets: ["@babel/env"],
        })
      )
      .pipe(concat("build.js")) // 临时合并文件
      // .pipe(gulp.dest('dist/js/')) // 临时输出文件到本地
      .pipe(uglify())
      // .pipe(rename({ suffix: '.min' })) // 重命名
      .pipe(rev())
      .pipe(gulp.dest("dist/js"))
      .pipe(rev.manifest())
      .pipe(gulp.dest("src/rev/js"))
      .pipe(livereload())
      .pipe(connect.reload())
  );
});

// 注册转换less的任务
gulp.task("less", function () {
  return gulp
    .src("src/less/*.less")
    .pipe(less()) // 编译less文件为css文件
    .pipe(gulp.dest("src/css/")); // 将less编译为css文件后存放到css文件夹中，等待后续统一合并
});

// 注册转换sass的任务
gulp.task("sass", function () {
  return gulp
    .src("src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("src/css/"));
});

// 合并压缩css文件
gulp.task("css", function () {
  return (
    gulp
      .src("src/css/*.css")
      .pipe(concat("build.css"))
      // .pipe(gulp.dest('dist/css/'))
      // .pipe(rename({ suffix: '.min' }))
      .pipe(rev())
      .pipe(cleanCss({ compatibility: "ie8" })) // 压缩、设置兼容到ie8
      .pipe(gulp.dest("dist/css"))
      .pipe(rev.manifest())
      .pipe(gulp.dest("src/rev/css"))
      .pipe(livereload())
      .pipe(connect.reload())
  );
});

// 压缩html
gulp.task("html", function () {
  return gulp
    .src(["src/rev/**/*.json", "src/index.html"])
    .pipe(
      revCollector({
        replaceReved: true,
      })
    )
    .pipe(htmlMin({ collapseWhitespace: true })) // 压缩html
    .pipe(gulp.dest("dist/")) // 输出
    .pipe(livereload())
    .pipe(connect.reload());
});

// 压缩图片
gulp.task("images", function () {
  return gulp
    .src(["src/images/**/*.*", "!src/images/sprite/*.*"])
    .pipe(
      cache(
        imagemin({
          optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
          progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
          interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
          multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
          use: [pngquant()], //使用pngquant深度压缩png图片
        })
      )
    )
    .pipe(gulp.dest("dist/images/"))
    .pipe(livereload())
    .pipe(connect.reload());
});

// 合并精灵图
gulp.task("sprite", function () {
  var spriteData = gulp.src("src/images/sprite/*.png").pipe(
    spritesmith({
      imgName: "sprite.png",
      cssName: "sprite.css",
    })
  );

  var imgStream = spriteData.img.pipe(gulp.dest("dist/images/sprite/"));

  var cssStream = spriteData.css
    .pipe(cleanCss({ compatibility: "ie8" })) // 压缩、设置兼容到ie8
    .pipe(gulp.dest("dist/images/sprite/"));

  return merge(imgStream, cssStream);
});

// 清理dist文件
gulp.task("clean-dist", function () {
  return gulp.src("dist").pipe(clean());
});

// 聚合任务
gulp.task(
  "default",
  gulp.parallel(
    gulp.series(
      gulp.parallel(
        gulp.series(gulp.parallel("less", "sass"), "css"),
        "js",
        "sprite"
      ),
      "html"
    ),
    "images"
  )
);

// 注册监视任务（全自动）
gulp.task(
  "serve",
  gulp.series("clean-dist", "default", function () {
    // 配置服务器选项
    connect.server({
      root: "dist/",
      livereload: true, // 实时刷新
      port: 5000,
    });
    // 确认监听的目标以及绑定相应的任务
    gulp.watch("src/js/**/*.js", gulp.series("js", "html"));
    gulp.watch(
      ["src/less/**/*.less", "src/sass/**/*.scss"],
      gulp.series(gulp.parallel("less", "sass"), "css", "html")
    );
    gulp.watch(["src/*.html"], gulp.parallel("html"));
    gulp.watch("src/images/**/*.*", gulp.series("images", "html"));
    // 打开浏览器
    open("http://localhost:5000");
  })
);

gulp.task("build", gulp.series("clean-dist", "default"));
