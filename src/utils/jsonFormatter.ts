export type ValidationResult = {
  isValid: boolean
  formatted: string
  message: string
}

export const validateAndFormatJson = (rawInput: string): ValidationResult => {
  if (!rawInput.trim()) {
    return {
      isValid: false,
      formatted: '',
      message: 'Please enter JSON before validating.',
    }
  }

  try {
    const parsed = JSON.parse(rawInput) as unknown
    return {
      isValid: true,
      formatted: JSON.stringify(parsed, null, 2),
      message: 'Valid JSON. Output formatted successfully.',
    }
  } catch {
    return {
      isValid: false,
      formatted: '',
      message: 'Invalid JSON. Please check your syntax and try again.',
    }
  }
}
