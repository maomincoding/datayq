import Vue from 'vue'
import App from './App.vue'
import 'muse-ui/lib/styles/base.less';
import { Button, Dialog, AppBar, Icon, Tabs } from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
import 'lib-flexible'  // 引入适配包
import echarts from 'echarts'

Vue.prototype.$echarts = echarts;
Vue.use(Button).use(AppBar).use(Dialog).use(Icon).use(Tabs);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
