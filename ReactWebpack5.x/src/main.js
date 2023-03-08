import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// 引入 antd 组件库的样式
import 'antd/dist/antd.less';

// 引入样式文件
import './assets/css/index.css'
import './assets/css/index.less'

import App from './App'

const root = createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

