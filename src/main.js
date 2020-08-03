import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'  // 引入适配包
import 'muse-ui/lib/styles/base.less';
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import { Button, Dialog, AppBar, Icon, Tabs,Progress } from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
import echarts from 'echarts'
import Helpers from 'muse-ui/lib/Helpers';
import Loading from 'muse-ui-loading';

Vue.prototype.$echarts = echarts;
Vue.use(Button).use(AppBar).use(Dialog).use(Icon).use(Tabs).use(Progress);
Vue.use(Helpers);
Vue.use(Loading)
Loading.config({
  text:'加载中',
  overlayColor:'hsla(0,0%,100%,.9)',
  size: 48,
  color: '#00bec9',
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
