import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import TrendsView from '../views/TrendsView.vue'
import HistoryView from '../views/HistoryView.vue'

const routes = [
  { path: '/', component: DashboardView },
  { path: '/trends', component: TrendsView },
  { path: '/history', component: HistoryView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
