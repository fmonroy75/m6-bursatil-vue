<!-- components/SidebarMenu.vue -->
<template>
  <aside class="sidebar">
    <div class="logo">📈 Simulador Bursatil</div>
    
    <!-- Mostrar email del usuario si está logueado -->
    <div v-if="authStore.isAuthenticated" class="user-info">
      <span class="user-email">{{ userEmail }}</span>
    </div>

    <nav>
      <ul>
        <!-- Opciones para usuarios no autenticados -->
        <template v-if="!authStore.isAuthenticated">
          <li>
            <router-link :to="{ name: 'login' }">
              Login
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'register' }">
              Registrarse
            </router-link>
          </li>
        </template>

        <!-- Opciones para usuarios autenticados -->
        <template v-else>
          <li>
            <router-link :to="{ name: 'profile' }">
              👤 Mi Perfil
            </router-link>
          </li>
          <li>
            <a href="#" @click.prevent="handleLogout" class="logout-link">
              🔓 Cerrar Sesión
            </a>
          </li>
        </template>

        <!-- Opciones comunes para todos -->
        <li>
          <router-link to="/">DashBoard</router-link>
        </li>
        <li>
          <router-link to="/trends">Tendencias</router-link>
        </li>
        <li>
          <router-link to="/history">Historial</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

// Obtener email de sessionStorage
const userEmail = computed(() => {
  return sessionStorage.getItem('userEmail') || authStore.user?.email || ''
})

const handleLogout = async () => {
  const result = await authStore.logout()
  if (result.success) {
    router.push({ name: 'login' })
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 20px;
  height: 100vh;
  position: fixed;
}

.logo {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #34495e;
}

.user-info {
  background: #34495e;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
}

.user-email {
  font-size: 0.9rem;
  color: #ecf0f1;
  word-break: break-all;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  margin-bottom: 10px;
}

nav a {
  color: #ecf0f1;
  text-decoration: none;
  padding: 10px;
  display: block;
  border-radius: 5px;
  transition: background 0.3s;
}

nav a:hover {
  background: #34495e;
}

.logout-link {
  color: #e74c3c !important;
}

.logout-link:hover {
  background: #c0392b !important;
  color: white !important;
}
</style>
