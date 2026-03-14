const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export const sortJsonKeysAlphabetically = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(sortJsonKeysAlphabetically)
  }

  if (!isPlainObject(value)) {
    return value
  }

  const sortedEntries = Object.entries(value)
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .map(([key, nestedValue]) => [key, sortJsonKeysAlphabetically(nestedValue)] as const)

  return Object.fromEntries(sortedEntries)
}
