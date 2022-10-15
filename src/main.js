import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

import { NavBar,Field,Form,Button,Tabbar, TabbarItem,Icon,Tab, Tabs , Cell,List, PullRefresh,ActionSheet,Popup,Row,Col,Badge,Search} from 'vant'
Vue.use(Search)
Vue.use(Col)
Vue.use(Badge)
Vue.use(Row)
Vue.use(Popup);
Vue.use(ActionSheet);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Cell)
Vue.use(Button);
Vue.use(Field);
Vue.use(Form);
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.config.productionTip = false


// 封装中间件函数插件
const directiveObj = {
  install (Vue){
    Vue.directive('fofo',{
      // 指令所再是组件
      // 组件跟标签是 div 
      // 以上都是原生标签对象
      inserted (el) {
        console.log(el)
        const theInput = el.querySelector('input')
        theInput.focus()
      }
    })
  }
}
//执行目标对象里的install方法并传入Vue类
Vue.use(directiveObj)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
