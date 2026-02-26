<template>
  <div class="min-h-screen flex items-center justify-center p-8">
    <div class="w-full max-w-md rounded-lg border bg-card p-8 shadow-lg">
      <h1 class="text-2xl font-bold mb-6">Exemplo: Login Simplificado</h1>
      
      <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Usando o componente ValidatedInput -->
        <ValidatedInput
          name="email"
          label="Email"
          type="email"
          placeholder="seu@email.com"
          required
          hint="Digite seu email cadastrado"
        />
        
        <ValidatedInput
          name="password"
          label="Senha"
          type="password"
          placeholder="••••••••"
          required
        />
        
        <button 
          type="submit"
          class="w-full rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Entrar
        </button>
      </form>
      
      <div v-if="submitted" class="mt-4 p-3 bg-green-100 text-green-800 rounded">
        ✅ Formulário válido! Dados: {{ submittedData }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { createLoginSchema } from '@/composables/useFormValidation'
import ValidatedInput from '@/components/ValidatedInput.vue'

// Configurar validação
const { handleSubmit } = useForm({
  validationSchema: createLoginSchema(),
})

const submitted = ref(false)
const submittedData = ref<Record<string, any> | null>(null)

// Handler de submit - validação automática!
const onSubmit = handleSubmit((values: Record<string, any>) => {
  submitted.value = true
  submittedData.value = values
  console.log('✅ Dados válidos:', values)
  
  // Aqui você faria a chamada à API
  // await authStore.login(values.email, values.password)
})
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
