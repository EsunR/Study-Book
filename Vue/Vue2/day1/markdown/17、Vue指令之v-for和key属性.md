## `v-for`属性
   
1. v-for指令可以用来循环迭代数组，`item`指代`list`数据中的每一项，在DOM中为每个`list`中的数据生成一个`<p>`标签。
    
    > v-for="*item_name* in *data_name*"  
      使用`{{item_name}}`渲染数据

    ```html
    <div id="app">
        <p v-for="item in list">{{item}}</p>
    </div>
    ```
    ```js
    var vm = new Vue({
        el: '#app',
        data: {
            list: [1,2,3,4,5,6]
        },
        methods: {}
    });
    ```
    效果：
    <div id="app">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
    </div>
    <br>


2. 调用索引值
    > v-for="(*item_name*, *i*) in *data_name*"  
    使用`{{i}}`渲染索引值，使用`{{item_name}}`渲染数据 
    ```html
    <div id="app">
        <p v-for="(item, i) in list">索引值: {{i}} --- 每一项：{{item}}</p>
    </div>
    ```
    效果：
    <div id="app">
        <p>索引值: 0 --- 每一项：1</p>
        <p>索引值: 1 --- 每一项：2</p>
        <p>索引值: 2 --- 每一项：3</p>
        <p>索引值: 3 --- 每一项：4</p>
        <p>索引值: 4 --- 每一项：5</p>
        <p>索引值: 5 --- 每一项：6</p>
    </div>
    <br>

3. 循环对象数组
    ```html
    <p v-for="user in list">ID: {{user.id}} === Nanme: {{user.name}}</p>
    ```
    ```js
    data: {
        list: [
            {id: 1, name: 'zs1'},
            {id: 2, name: 'zs2'},
            {id: 3, name: 'zs3'},
            {id: 4, name: 'zs4'},
        ]
    }
    ```

4. 遍历对象
   ```html
   <p v-for="(val, key, i) in user">值是: {{val}} === 键是: {{key}} === 索引是: {{i}}</p>
   ```
   ```js
   data: {
        user: {
            id: 1,
            name: 'EsunR',
            sex: 'Man'
        }
    }
    ```
    
    效果：
    <div id="app"><p>值是: 1 === 键是: id === 索引是: 0</p><p>值是: EsunR === 键是: name === 索引是: 1</p><p>值是: Man === 键是: sex === 索引是: 2</p></div>
    <br>

5. 迭代数字
    ```html
    <p v-for="count in 10">这是第 {{count}} 次循环</p>
    ```

    <div id="app"><p>这是第 1 次循环</p><p>这是第 2 次循环</p><p>这是第 3 次循环</p><p>这是第 4 次循环</p><p>这是第 5 次循环</p><p>这是第 6 次循环</p><p>这是第 7 次循环</p><p>这是第 8 次循环</p><p>这是第 9 次循环</p><p>这是第 10 次循环</p></div>







    