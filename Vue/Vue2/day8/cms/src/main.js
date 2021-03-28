// 入口文件
// 导入js
import Vue from 'vue';
import app from './App.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import moment from 'moment';
import VuePreview from 'vue-preview';
import Vuex from 'vuex';


// 导入css
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入Mint-UI中的组件 注意：按需加载的Lazyload会加载不出图标
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 使用路由
Vue.use(VueRouter);
import router from './router.js';

// 使用Vue-resource
Vue.use(VueResource);
// 设置请求的根路径
Vue.http.options.root = "http://www.liulongbin.top:3005/"
// 设置表单提交的编码类型：可以免除用Vue-resource的Post指令专递数据时的第三个编码类型的参数
Vue.http.options.emulateHTTP = true;

// 使用 vuex
Vue.use(Vuex);
var loaclStrage_car = JSON.parse(localStorage.getItem('car') || '[]');
var store = new Vuex.Store({
  state: { // this.$store.state.***
    car: loaclStrage_car // 将购物车中商品的数据用一个数组存放起来，在car数组中，存放一些商品的对象，可以暂时的将商品对象设置为： {id: 商品id, count: 要购买的数量, price: 商品的单价, selected: false/true(商品的选择状态)}
  },
  mutations: { // this.$store.commit('方法名称', '按需传入唯一的参数')
    addToCar(state, goodsInfo) {
      let flag = false;
      state.car.some(item => {
        if (item.id == goodsInfo.id) {
          item.count += parseInt(goodsInfo.count);
          flag = true;
        }
      });
      if (flag == false) {
        state.car.push(goodsInfo);
      }

      // 当car更新后，把car数组存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car));
    },

    // 点击商品购物车的+-按钮来同步修改store中的数据
    shopCarNumChange(state, goodsInfo) {
      state.car.some(item => {
        if (item.id == goodsInfo.id) {
          item.count = goodsInfo.count;
          // 当car更新后，把car数组存储到本地的localStorage中
          localStorage.setItem('car', JSON.stringify(state.car));
          return true;
        }
      })
    },

    // 从购物车中删除商品
    deleteItemFromCar(state, itemId) {
      state.car.some((item, i) => {
        if (item.id == itemId) {
          state.car.splice(i, 1);
          // 当car更新后，把car数组存储到本地的localStorage中
          localStorage.setItem('car', JSON.stringify(state.car));
          return true;
        }
      })
    },

    // 选择开关变化
    switchChange(state, switchInfo) {
      state.car.some(item => {
        if (item.id == switchInfo.id) {
          item.selected = switchInfo.selected;
          // 当car更新后，把car数组存储到本地的localStorage中
          localStorage.setItem('car', JSON.stringify(state.car));
          return true;
        }
      })

    }

  },
  getters: { // this.$store.getters.***
    getAllCount(state) {
      let c = 0;
      state.car.forEach(item => {
        c += parseInt(item.count);
      })
      return c;
    },
    getItemCount(state) {
      let o = {};
      state.car.forEach(item => {
        o[item.id] = item.count;
      })
      return o;
    },
    getSelect(state) {
      let o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected;
      })
      return o;
    },
    getSum(state) {
      let o = {
        count: 0,
        totalPrice: 0
      }
      state.car.forEach(item=>{
        if(item.selected){
          o.count += parseInt(item.count);
          o.totalPrice += parseInt(item.price)*parseInt(item.count);
        }
      })
      return o;
    }
  }
})


// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
})

// 使用VuePreview缩略图插件
Vue.use(VuePreview);

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router: router,
  store: store
});