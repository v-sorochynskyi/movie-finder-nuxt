import type { FormInstance, FormItemRule, FormRules } from 'element-plus'

// --------------------------------------------- F O R M  R E F --------------------------------------------------------
export function useElFormRef (initialValue: any = null) {
  return ref<FormInstance>(initialValue)
}

// --------------------------------------------- F O R M  M O D E L ----------------------------------------------------
export function useElFormModel<T extends object> (model: T) {
  return reactive<T>(model)
}

// ------------------------------------------- F O R M  R U L E S ------------------------------------------------------
export function useElFormRules (model: FormRules) {
  return reactive(model)
}

export function useRequiredRule ({ required = true } = {}) {
  const { t } = useI18n()
  return { required, message: t('general.required'), trigger: 'change' } as FormItemRule
}

export function useEmailRule () {
  const { t } = useI18n()
  return { type: 'email', message: t('general.invalidEmail'), trigger: ['change', 'blur'] } as FormItemRule
}

export function useMinLenRule (min: number): FormItemRule {
  const { t } = useI18n()
  return { min, message: t('general.minLen', { min }), trigger: 'change' }
}

export function useMaxLenRule (max: number): FormItemRule {
  const { t } = useI18n()
  return { max, message: t('general.maxLen', { max }), trigger: 'change' }
}
