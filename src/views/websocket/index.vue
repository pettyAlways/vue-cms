<template>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'messageSocket',
    data() {
      return {
        timeout: 90000
      }
    },
    computed: {
      ...mapGetters([
        'currentUser'
      ])
    },
    created() {
      this.initWebSocket()
    },
    // 退出登录、重新刷新都要关闭websock
    destroyed() {
      console.info('=============销毁Notice实例退出websocket==================')
      clearTimeout(this.timeoutObj)
      clearTimeout(this.serverTimeoutObj)
      clearTimeout(this.tt)
      this.websock.close()
    },
    methods: {
      ...mapMutations({
        setMessage: 'SET_MESSAGE'
      }),
      initWebSocket() {
        // const hostname = location.hostname
        // const port = location.port
        // this.websock = new WebSocket('ws://' + hostname + ':' + port + '/cms_web/websocket.ws?username=123')
        this.websock = new WebSocket(`ws://localhost:9092/blog/websocket.ws/${this.currentUser.id}`)
        this.websock.onmessage = this.onMessage
        this.websock.onopen = this.onOpen
        this.websock.onclose = this.onClose
        this.websock.onerror = this.onError
        console.info('===========websocket创建完成================')
      },
      onMessage(res) {
        // 后端必须返回的是json格式
        const resData = JSON.parse(res.data)
        console.info(resData)
        switch (resData.type) {
          case 'heart':
            console.info('=========拿到心跳包重新发送心跳=========')
            this.reset()
            break
          case 'notice':
            this.setMessage(resData.msg)
            break
        }
      },
      onOpen() {
        console.info('==============打开socket==============')
        this.start()
      },
      onClose() {
        console.log('=============websocket关闭====================')
      },
      onError() {
        console.log('============websocket出现错误重新连接=================')
        this.reconnect()
      },
      reconnect() {
        this.tt && clearTimeout(this.tt)
        this.tt = setTimeout(() => {
          console.log('=============重连时重新创建websocket============')
          this.initWebSocket()
        }, 4000)
      },
      start() {
        console.info('================创建一个新的心跳定时器==================')
        this.timeoutObj = setTimeout(() => {
          this.websock.send('HeartBeat')
          console.info('==========我发送HeartBeat了啊============')
          this.serverTimeoutObj = setTimeout(() => {
            console.info('==========超时重连============')
            this.reconnect()
          }, this.timeout)
        }, this.timeout)
      },
      reset() {
        console.info('================注销上一个心跳定时器==================')
        clearTimeout(this.timeoutObj)
        clearTimeout(this.serverTimeoutObj)
        this.start()
      }
    }
  }
</script>

<style scoped>

</style>
