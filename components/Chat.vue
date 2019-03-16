<template lang="pug">
  .chat
    .output
      ul.list
        li.item(v-for="message in messages") {{ message }}
    .controls
      form.form(@submit.prevent)
        input.input(v-model="message")
        button.submit(@click="sendMessage") Send message
</template>

<script>
import socket from '@/plugins/socket.io'

export default {
  data: () => ({
    messages: [],
    message: ''
  }),

  mounted() {
    socket.on('chat message', (message) => {
      this.messages.push(message)
    })
  },

  methods: {
    sendMessage() {
      socket.emit('chat message', this.message)
    }
  }
}
</script>

<style lang="stylus" scoped>
.chat
  height 480px

.form
  display flex

.output
  border 1px solid #ccc
  height calc(100% - 50px)
  margin-bottom 10px

.input
  border 1px solid #ccc
  padding 10px
  flex-grow 1
  margin-right 10px
  height 40px

.submit
  background rgb(130, 224, 255)
  border none
  padding 10px
  height 40px
  cursor pointer

.list
  list-style none
  margin 0
  padding 0

.item
  padding 5px 10px

  &:nth-child(odd)
    background-color #e
</style>
