console.log('Hello React Webpack5.x')

import React, { Component, Suspense, lazy } from 'react'
import { Link, Routes, Route } from 'react-router-dom'

// 引入 antd 组件
import { Button, DatePicker, Space } from 'antd'
const { RangePicker } = DatePicker;

// import Home from './pages/home/index'
// import About from './pages/about/index'
// todo 路由懒加载 Suspense lazy
const Home = lazy(() => import(/* webpackChunkName: 'home' */'./pages/home/index'))
const About = lazy(() => import(/* webpackChunkName: 'about' */'./pages/about/index'))

class App extends Component {
  render () {
    return (
      <div className='app-page'>
        <h3>Hello React Webpack5.x</h3>
        <div className='div-box'>
          <div className='div-btn'>
          {'APP 组件 ----->'}
          <Button type="primary">Antd按钮</Button>
          </div>
          <Space direction="vertical" size={12}>
            <RangePicker />
            {/* <RangePicker showTime /> */}
          </Space>
        </div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        {/* <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes> */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/home' element={ <Home /> } />
            <Route path='/about' element={ <About /> } />
          </Routes>
        </Suspense>
      </div>
    )
  }
}


export default App

