<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 py-12 px-4">
    <div class="w-full max-w-md">
      <div class="rounded-lg border border-border bg-card p-8 shadow-lg">
        <h1 class="text-3xl font-bold text-center mb-8">Login</h1>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium mb-2">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              :class="{ 'border-destructive': errors.email }"
              placeholder="seu@email.com"
            />
            <span v-if="errors.email" class="text-sm text-destructive mt-1 block">{{ errors.email }}</span>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium mb-2">Senha</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              :class="{ 'border-destructive': errors.password }"
              placeholder="••••••••"
            />
            <span v-if="errors.password" class="text-sm text-destructive mt-1 block">{{ errors.password }}</span>
          </div>

          <div v-if="authStore.error" class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {{ authStore.error }}
          </div>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ authStore.loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-muted-foreground">
          Não tem conta?
          <RouterLink to="/register" class="font-semibold text-primary hover:underline">
            Registre-se aqui
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@stores/auth'
import { useToast } from '@utils/useToast'
import { useForm, useField } from 'vee-validate'
import { createLoginSchema } from '@/composables/useFormValidation'

const router = useRouter()
const authStore = useAuthStore()

// Limpar erro anterior ao entrar na página
onMounted(() => {
  authStore.error = null
})

// Configurar formulário com vee-validate e schema de validação
const { handleSubmit, errors } = useForm({
  validationSchema: createLoginSchema(),
})

// Campos do formulário
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

// Handler de submit com validação automática
const handleLogin = handleSubmit(async (values) => {
  const { success } = useToast()
  const loginSuccess = await authStore.login(values.email, values.password)
  if (loginSuccess) {
    success('Login realizado com sucesso!')
    router.push('/dashboard')
  }
})
</script>
