Vue.component('Item', {
  props: ['todo', 'title'],
  template: '<li :title="title">{{ todo }}</li>'
})

Vue.component('emit-btn', {
  template: `<div>
    <div>EmitBtn组件</div>
    <button @click="$emit('enlarge')">点击触发父级组件EmitBtn的自定义事件</button>
  </div>`
})
Vue.component('emit-btn2', {
  props: ['enlarge'],
  template: `<div>
    <div>EmitBtn组件</div>
    <button @click="enlarge">点击触发父级组件EmitBtn的自定义事件</button>
  </div>`
})
Vue.component('check-box', {
  // v-model默认使用名为value的prop和input事件，可以在子组件中用model选项进行改写，避免value属性覆盖掉子组件的value值
  model: {
    prop: 'checked',
    event: 'box-change'
  },
  props: ['checked'],
  template: `
    <input
      type="checkbox"
      :checked="checked"
      @change="$emit('box-change', $event.target.checked)"
    >
  `
})

var app = new Vue({
  el: '#app',
  data: {
    message: 'hello demo', // message值
    show: true, // v-if显示隐藏控制值
    bindMessage: '该div绑定的title', // v-bind绑定值
    inputValue: '显示输入框输入的值', // 输入框v-model值
    array: ['react', 'vue', 'node', 'webpack'], // v-for遍历数组
    rawhtml: '<span>1234</span>', // v-html元素
    obj: { // 测试添加对象属性是否响应视图更新对象
      name: 'cjl',
    },
    checkboxArr: ['ip1'], // 复选框v-model数组
    mainFontSize: 1, // 字体大小
    checkValue: false,
  },
  computed: { // 计算属性
    reverseValue: function () {
      return this.message.split('').reverse().join('')
    }
  },
  methods: {
    toggleShow: function () {
      this.show = !this.show
      this.obj.age = this.obj.age ? this.obj.age + 1 : 1
      console.log(this.obj.age)
    },
    enlargeFont: function () {
      this.mainFontSize += 1
    },
    input(e) {
      this.inputValue = e.target.value
    }
  },
  beforeCreate() {
    console.log(this.$el)
  },
  mounted() {
    // this.obj.age = 2 // TODO:为什么不能进行更新
    // Vue.set(app.obj, 'age', 4)
  }
})

Vue.set(app.obj, 'age', 4) // 会响应式更新视图
// this.obj.age = 2 // 单独添加不会响应式更新视图

Object.assign(app.obj, { // TODO:为什么不能这样写
  age: 27,
  favoriteColor: 'Vue Green'
})
// app.obj = Object.assign({}, app.obj, {
//   age: 27,
//   favoriteColor: 'Vue Green'
// })