<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 py-12 px-4">
    <div class="w-full max-w-md">
      <div class="rounded-lg border border-border bg-card p-8 shadow-lg">
        <h1 class="text-3xl font-bold text-center mb-8">Registrar</h1>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium mb-2">Nome</label>
            <input
              id="name"
              v-model="name"
              type="text"
              class="w-full rounded-md border border-input bg-background px-4 py-2"
              :class="{ 'border-destructive': errors.name }"
              placeholder="Seu nome"
            />
            <span v-if="errors.name" class="text-sm text-destructive mt-1 block">{{ errors.name }}</span>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium mb-2">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="w-full rounded-md border border-input bg-background px-4 py-2"
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
              class="w-full rounded-md border border-input bg-background px-4 py-2"
              :class="{ 'border-destructive': errors.password }"
              placeholder="••••••••"
            />
            <span v-if="errors.password" class="text-sm text-destructive mt-1 block">{{ errors.password }}</span>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium mb-2">Confirmar Senha</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              class="w-full rounded-md border border-input bg-background px-4 py-2"
              :class="{ 'border-destructive': errors.confirmPassword }"
              placeholder="••••••••"
            />
            <span v-if="errors.confirmPassword" class="text-sm text-destructive mt-1 block">{{ errors.confirmPassword }}</span>
          </div>

          <div v-if="authStore.error" class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {{ authStore.error }}
          </div>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground"
          >
            {{ authStore.loading ? 'Registrando...' : 'Registrar' }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-muted-foreground">
          Já tem conta?
          <RouterLink to="/login" class="font-semibold text-primary">
            Faça login aqui
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@stores/auth'
import { useToast } from '@utils/useToast'
import { useForm, useField } from 'vee-validate'
import { createRegisterSchema } from '@/composables/useFormValidation'

const router = useRouter()
const authStore = useAuthStore()

// Configurar formulário com vee-validate e schema de validação
const { handleSubmit, errors } = useForm({
  validationSchema: createRegisterSchema(),
})

// Campos do formulário
const { value: name } = useField<string>('name')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')

// Handler de submit com validação automática
const handleRegister = handleSubmit(async (values) => {
  const { success: showSuccess } = useToast()
  const registerSuccess = await authStore.register(values.name, values.email, values.password)
  if (registerSuccess) {
    showSuccess('Registro realizado com sucesso! Faça login para continuar.')
    router.push('/login')
  }
})
</script>
