import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Recipients from '@/components/Recipients'
import Subject from '@/components/Subject'
import Message from '@/components/Message'
import Confirm from '@/components/Confirm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', name: 'Hello', component: Hello
    },
    {
      path: '/to', name: 'to', component: Recipients
    },
    {
      path: '/cc', name: 'cc', component: Recipients
    },
    {
      path: '/bcc', name: 'bcc', component: Recipients
    },
    {
      path: '/subject', name: 'Subject', component: Subject
    },
    {
      path: '/message', name: 'message', component: Message
    },
    {
      path: '/confirm', name: 'confirm', component: Confirm
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
