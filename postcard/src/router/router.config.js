/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    // meta: {
    //   title: '大理明信片活动',
    //   keepAlive: false
    // },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '大理明信片活动', keepAlive: false }
      },
      {
        path: '/DIYPoster',
        name: 'DIYPoster',
        component: () => import('@/views/home/DIYPoster'),
        meta: { title: 'DIY明信片', keepAlive: false }
      },
      {
        path: '/selectTemplate',
        name: 'selectTemplate',
        component: () => import('@/views/home/selectTemplate'),
        meta: { title: '选择模板', keepAlive: false }
      },
      {
        path: '/makePoster',
        name: 'makePoster',
        component: () => import('@/views/home/makePoster'),
        meta: { title: '制作明信片', keepAlive: false }
      },
      {
        path: '/editPoster',
        name: 'editPoster',
        component: () => import('@/views/home/editPoster'),
        meta: { title: '编辑背面', keepAlive: false }
      },
      {
        path: '/savePoster',
        name: 'savePoster',
        component: () => import('@/views/home/savePoster'),
        meta: { title: '明信片保存', keepAlive: false }
      },
    ]
  }
]
