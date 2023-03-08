// axios
import request from '@/utils/request'

//记录页面访问信息记录接口
export function access(data) {
  return request({
    url: '/page/access',
    method: 'post',
    data,
    hideloading:true
  })
}