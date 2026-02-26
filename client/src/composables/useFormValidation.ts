import * as yup from 'yup'

/**
 * Schemas de validação reutilizáveis
 */
export const validationSchemas = {
  email: yup
    .string()
    .required('Email é obrigatório')
    .email('Email inválido')
    .label('Email'),

  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .label('Senha'),

  strongPassword: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .matches(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .matches(/[0-9]/, 'Senha deve conter pelo menos um número')
    .label('Senha'),

  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .label('Nome'),

  confirmPassword: (passwordRef: string = 'password') =>
    yup
      .string()
      .required('Confirmação de senha é obrigatória')
      .oneOf([yup.ref(passwordRef)], 'As senhas não correspondem')
      .label('Confirmação de Senha'),
}

/**
 * Mensagens de validação customizadas em português
 */
export const setYupLocale = () => {
  yup.setLocale({
    mixed: {
      required: '${label} é obrigatório',
      notType: '${label} deve ser do tipo ${type}',
    },
    string: {
      email: 'Email inválido',
      min: '${label} deve ter no mínimo ${min} caracteres',
      max: '${label} deve ter no máximo ${max} caracteres',
    },
    number: {
      min: '${label} deve ser maior ou igual a ${min}',
      max: '${label} deve ser menor ou igual a ${max}',
    },
  })
}

/**
 * Helper para criar schema de login
 */
export const createLoginSchema = () => {
  return yup.object({
    email: validationSchemas.email,
    password: validationSchemas.password,
  })
}

/**
 * Helper para criar schema de registro
 */
export const createRegisterSchema = () => {
  return yup.object({
    name: validationSchemas.name,
    email: validationSchemas.email,
    password: validationSchemas.strongPassword,
    confirmPassword: validationSchemas.confirmPassword(),
  })
}

/**
 * Helper para criar schema de card
 */
export const createCardSchema = () => {
  return yup.object({
    name: yup.string().required('Nome da carta é obrigatório').min(2, 'Nome deve ter pelo menos 2 caracteres'),
    description: yup.string().required('Descrição é obrigatória').min(10, 'Descrição deve ter pelo menos 10 caracteres'),
    rarity: yup.string().required('Raridade é obrigatória').oneOf(['common', 'uncommon', 'rare', 'legendary'], 'Raridade inválida'),
    price: yup.number().required('Preço é obrigatório').min(0, 'Preço deve ser maior ou igual a 0'),
  })
}

/**
 * Helper para criar schema de trade
 */
export const createTradeSchema = () => {
  return yup.object({
    offeredCardIds: yup.array().of(yup.string()).min(1, 'Selecione pelo menos uma carta para oferecer'),
    requestedCardIds: yup.array().of(yup.string()).min(1, 'Selecione pelo menos uma carta para receber'),
  })
}
