# 1. 快速入门

Grid 栅格布局类似于表格布局，可以快速将页面分割为多个部分，再在每个部分中去进行更为详细的布局。

创建一个快速栅格布局的实例：

```html
<div class="wrapper">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
  <div>7</div>
  <div>8</div>
  <div>9</div>
</div>
```

```css
.wrapper {
  width: 250px;
  height: 250px;
  border: 1px solid #000000;
  display: grid;
  /* repeat 可以将某个值重复多遍，fr 是一个 Grid 中新引入的单位 */
  grid-template-rows: repeat(3, 1fr); /* 行高 */
  grid-template-columns: repeat(3, 1fr); /* 列宽 */
}

.wrapper>div {
  background-color: pink;
  padding: 10px;
  background-clip: content-box;
  border: 5px solid pink;
}
```

实现效果：

![](http://img.cdn.esunr.xyz/markdown/20200227150150.png)

上述示例中我们将 `grid-template-row` 与 `grid-template-columns` 的值采用了简写的方式设为了平分为三等分，同时还可以，使用 px、百分比等作为单位，如：

```css
.wrapper {
  width: 250px;
  height: 250px;
  border: 1px solid #000000;
  display: grid;
  grid-template-rows: 100px 100px 100px;
  grid-template-columns: 100px 100px 100px;
  /* 当然，如果这么写的话由于已经设置了宽高，内容会溢出 */
}
```

> 你可以使用固定的轨道尺寸创建网格，比如使用像素单位。你也可以使用比如百分比或者专门为此目的创建的新单位 fr来创建有弹性尺寸的网格。 -MDN

# 2. 重复 repeat

`repeat` 是 Grid 布局引入的一个新特性，可以将某一数值重复多遍。在上面的例子中 `grid-template-rows: repeat(3, 1fr);`  就相当于 `grid-templete-rows: 1fr 1fr 1fr;`。同时，`repeat` 还能重复多个值，如 `grid-template-rows: repeat(3, 100px 50px);` 就相当于 `grid-template-rows: 100px 50px 100px 50px 100px 50px;`

示例：

```html
<div class="wrapper">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <!-- ... ...  -->
  <div>25</div>
  <div>26</div>
  <div>27</div>
</div>
```

```css
.wrapper {
  width: 250px;
  border: 1px solid #000000;
  display: grid;
  grid-template-rows: repeat(3, 50px 100px);
  grid-template-columns: repeat(3, 1fr);
}

.wrapper>div {
  background-color: pink;
  padding: 10px;
  background-clip: content-box;
  border: 5px solid pink;
}
```

效果：

![](http://img.cdn.esunr.xyz/markdown/20200227153424.png)

# 2. 自动填充

Grid 中引入了自动填充的特性，在设置容器的行高与列宽时，使用 `repeat()` 第一个参数如果传入 `auto-fill` 第二个参数填入一定的数值，那么回自动拿着这个数值重复 n 遍，以填满整个栅格容器。

例1：

```css
.wrapper {
  width: 300px;
  height: 300px;
  border: 1px solid #000000;
  display: grid;
  grid-template-rows: repeat(auto-fill, 100px);
  grid-template-columns: repeat(auto-fill, 100px);
}
```

![](http://img.cdn.esunr.xyz/markdown/20200227155500.png)

例2：

```css
.wrapper {
  width: 300px;
  height: 300px;
  border: 1px solid #000000;
  display: grid;
  grid-template-rows: repeat(auto-fill, 50px);
  grid-template-columns: repeat(auto-fill, 50px);
}
```

![](http://img.cdn.esunr.xyz/markdown/20200227155644.png)

例3：

测试溢出时的情况

```css
.wrapper {
  width: 300px;
  height: 300px;
  border: 1px solid #000000;
  display: grid;
  grid-template-rows: repeat(auto-fill, 100px);
  grid-template-columns: repeat(auto-fill, 100px);
}
```

![](http://img.cdn.esunr.xyz/markdown/20200227155757.png)

# 3. 取值范围

在设置行高与宽高时，还可以通过 `minmax` 来设置值的取值范围。

例1：

```css
.wrapper {
  width: 300px;
  height: 200px;
  border: 1px solid #000000;
  display: grid;
  grid-template-rows: repeat(3, minmax(50px, 100px));
  grid-template-columns: repeat(auto-fill, 100px);
}
```

![](http://img.cdn.esunr.xyz/markdown/20200227162624.png)

例2：

```css
.wrapper {
  width: 300px;
  height: 200px;
  border: 1px solid #000000;
  display: grid;
  grid-template-rows: repeat(2, minmax(50px, 100px));
  grid-template-columns: repeat(auto-fill, 100px);
}
```

![](http://img.cdn.esunr.xyz/markdown/20200227162711.png)

# 4. 间距 gap

使用 `row-gap` 可以设置行间距，设置 `column-gap` 可以设置列间距

例1，row-gap：

```html
<div class="wrapper">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
  <div>7</div>
  <div>8</div>
  <div>9</div>
</div>
```

```css
.wrapper {
  width: 300px;
  height: 300px;
  border: 1px solid #000000;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  row-gap: 10px;
}

.wrapper>div {
  background-color: pink;
}
```

![](http://img.cdn.esunr.xyz/markdown/20200227163427.png)

例2，column-gap：

```css
.wrapper {
  width: 300px;
  height: 300px;
  border: 1px solid #000000;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
}
```

![](http://img.cdn.esunr.xyz/markdown/20200227163613.png)

> 可以使用复合样式：gap: [行间距] [列间距]

# 5. 定位

在栅格化布局中，元素最外层的 div 容器负责划分区域，那么元素内层的 div 就为实体内容，我们可以根据划分好的网格将元素定位至网格的任意位置。

任意一个实体元素都必须为矩形，因此会拥有四条边，我们的定位依据就是由这四条边来决定的。一个实体元素的上边被称为 `grid-row-start`，下边被称为 `grid-row-end`，左边被称为 `grid-column-start`，右边被称为 `grid-column-end`。

![](http://img.cdn.esunr.xyz/markdown/20200227172311.png)

当我们想要将其对其到某个位置时，只需要注明每条边对应到栅格的哪一条边即可，如：

```html
<div class="wrapper">
  <div>Content</div>
</div>
```

```css
.wrapper {
  width: 300px;
  height: 300px;
  border: 1px solid #000000;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
}

.wrapper>div {
  background-color: pink;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 4;
}
```

效果：

![](http://img.cdn.esunr.xyz/markdown/20200227172737.png)


![](http://img.cdn.esunr.xyz/markdown/20200227173527.png)

此外布局的定位还可以使用分隔符 `/` 简写，分隔符的前后分别代表起始边与结束边，如上面的定位可以改写为：

```css
.wrapper>div {
  background-color: pink;
  grid-row: 1 / 2;
  grid-column: 1 / 4;
}
```

# 6. 布局命名

在定义网格时，把网格线的名字写在方括号内，名字随意。我们先为容器的起点和终点命名，既包括行的，也包括列的。接下来再把处于网格中间的块的起点和终点命名为 `c-start` 和 `c-end`，也是包括行和列的。不一定要把全部网格线都命名，只需要为布局时用到的关键线命名即可。

```css
.wrapper {
  width: 300px;
  height: 300px;
  border: 1px solid #000000;
  display: grid;
  grid-template-rows: [r1-start] 100px [r1-end r2-start] 100px [r2-end r3-start] 100px [r3-end];
  grid-template-columns: [c1-start] 100px [c1-end c2-start] 100px [c2-end c3-start] 100px [c3-end];
}

.wrapper>div {
  background-color: pink;
  grid-row-start: r1-start;
  grid-row-end: r1-end;
  grid-column-start: c1-start;
  grid-column-end: c3-end;
}
```

![](http://img.cdn.esunr.xyz/markdown/20200227180105.png)

![](http://img.cdn.esunr.xyz/markdown/20200227180601.png)

如果我们使用了 `repeat` 来创建边，那命名的方式稍有区别，在命名后使用该边时，要后缀时那一行或者哪一列的边：

```css
.wrapper {
  width: 300px;
  height: 300px;
  border: 1px solid #000000;
  display: grid;
  grid-template-rows: repeat(3, [r-start] 1fr [r-end]);
  grid-template-columns: repeat(3, [c-start] 1fr [c-end]);
}

.wrapper>div {
  background-color: pink;
  grid-row-start: r-start 1;
  grid-row-end: r-end 1;
  grid-column-start: c-start 1;
  grid-column-end: c-end 3;
}
```

![](http://img.cdn.esunr.xyz/markdown/20200227181246.png)

# 7. 偏移 span

在定位的过程中，如果确定了一条边之，可以使用 `span` 来对另一条边进行相对定位，如 `span 1` 代表着相对于上一条确定的边再偏移一条边。以下为具体示例：

```css
.wrapper {
  width: 300px;
  height: 300px;
  border: 1px solid #000000;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
}

.wrapper>div {
  background-color: pink;
  grid-row-start: 2;
  grid-row-end: span 1;
  grid-column-start: 2;
  grid-column-end: span 1;
}
```

![](http://img.cdn.esunr.xyz/markdown/20200227191817.png)