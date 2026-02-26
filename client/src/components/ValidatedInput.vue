<template>
  <div class="space-y-1">
    <label 
      v-if="label" 
      :for="name" 
      class="block text-sm font-medium"
    >
      {{ label }}
      <span v-if="required" class="text-destructive">*</span>
    </label>
    
    <input
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="value"
      class="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
      :class="[
        errorMessage ? 'border-destructive' : '',
        inputClass
      ]"
    />
    
    <span 
      v-if="errorMessage" 
      class="text-sm text-destructive mt-1 block"
    >
      {{ errorMessage }}
    </span>
    
    <span 
      v-else-if="hint" 
      class="text-sm text-muted-foreground mt-1 block"
    >
      {{ hint }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef } from 'vue'

interface Props {
  name: string
  label?: string
  type?: string
  placeholder?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  inputClass?: string
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
})

// Integração com vee-validate
const name = toRef(props, 'name')
const {
  value,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.modelValue,
})
</script>
