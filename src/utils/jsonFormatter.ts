import { sortJsonKeysAlphabetically } from './jsonSorting'

export type ValidationResult = {
  isValid: boolean
  formatted: string
  message: string
  parsedValue: unknown | null
}

export type IndentSize = 2 | 3 | 4

export type FormatOptions = {
  indentSize: IndentSize
  sortKeysAlphabetically: boolean
}

export const formatJsonOutput = (value: unknown, options: FormatOptions): string => {
  const normalizedValue = options.sortKeysAlphabetically
    ? sortJsonKeysAlphabetically(value)
    : value
  return JSON.stringify(normalizedValue, null, options.indentSize)
}

export const formatJsonWithIndent = (value: unknown, indentSize: IndentSize): string => {
  return JSON.stringify(value, null, indentSize)
}

export const validateAndFormatJson = (
  rawInput: string,
  options: FormatOptions,
): ValidationResult => {
  if (!rawInput.trim()) {
    return {
      isValid: false,
      formatted: '',
      message: 'Please enter JSON before validating.',
      parsedValue: null,
    }
  }

  try {
    const parsed = JSON.parse(rawInput) as unknown
    return {
      isValid: true,
      formatted: formatJsonOutput(parsed, options),
      message: 'Valid JSON. Output formatted successfully.',
      parsedValue: parsed,
    }
  } catch {
    return {
      isValid: false,
      formatted: '',
      message: 'Invalid JSON. Please check your syntax and try again.',
      parsedValue: null,
    }
  }
}
