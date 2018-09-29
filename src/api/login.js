import axios from 'axios'
import remote from '../utils/remote'

export function login(userInfo) {
  return axios.post('/user/login.do', userInfo)
}

export function userInfo() {
  return remote({
    url: '/user/userInfo.do',
    method: 'get'
  })
}

export function logout() {
  return axios.post('/login/logout')
}
