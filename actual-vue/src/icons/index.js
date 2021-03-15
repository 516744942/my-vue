//  自动加载svg目录下所有svg文件
//  使用webpack提供require.context()指定svg为固定上下文
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

const req = require.context('./svg', false, /\.svg$/)
// keys() 返回上下文中所有文件名
req.keys().map(req);

Vue.component('svg-icon', SvgIcon)