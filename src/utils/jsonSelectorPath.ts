import { ROOT_JSON_PATH } from './jsonTreeControls'

const decodePathSegment = (segment: string): string => {
  return segment.replaceAll('~1', '/').replaceAll('~0', '~')
}

const isArrayIndexSegment = (segment: string): boolean => {
  return /^(0|[1-9]\d*)$/.test(segment)
}

export const toResponseSelectorPath = (
  treePath: string,
  rootLabel = 'response',
): string => {
  if (treePath === ROOT_JSON_PATH) {
    return rootLabel
  }

  const [rootSegment, ...pathSegments] = treePath.split('/')
  if (rootSegment !== ROOT_JSON_PATH) {
    return rootLabel
  }

  const selectorSuffix = pathSegments
    .map((rawSegment) => decodePathSegment(rawSegment))
    .map((segment) =>
      isArrayIndexSegment(segment) ? `[${segment}]` : `[${JSON.stringify(segment)}]`,
    )
    .join('')

  return `${rootLabel}${selectorSuffix}`
}
