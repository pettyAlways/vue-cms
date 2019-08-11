import { clientVisiable } from './compatibility'
const gitHubUrl = 'https://github.com/login/oauth/authorize?client_id=47fca5d6cdbf13ae8984'
const width = clientVisiable().width
const height = clientVisiable().height
export function thirdPartyLogin() {
  return new Promise(resolve => {
    window.open(gitHubUrl, 'newwindow', `height=300, width=400, top=${height / 2 - 150}, left=${width / 2 - 150}, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no`)
    window.addEventListener('message', e => {
      if (/^ThirdPartyLogin-(\w*)-(\w*)/.test(e.data)) {
        let username = RegExp.$1
        let password = RegExp.$2
        resolve({ username: username, password: password })
      }
    }, false)
  })
}
