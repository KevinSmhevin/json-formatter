export const ROOT_JSON_PATH = 'root'

type TreeNodeMeta = {
  path: string
  depth: number
}

const isJsonContainer = (
  value: unknown,
): value is Record<string, unknown> | unknown[] => {
  return typeof value === 'object' && value !== null
}

const encodePathSegment = (segment: string): string => {
  return segment.replaceAll('~', '~0').replaceAll('/', '~1')
}

export const buildChildPath = (parentPath: string, segment: string | number): string => {
  return `${parentPath}/${encodePathSegment(String(segment))}`
}

const collectTreeNodeMetadata = (
  value: unknown,
  path: string,
  depth: number,
  output: TreeNodeMeta[],
): void => {
  if (!isJsonContainer(value)) {
    return
  }

  const entries = Array.isArray(value)
    ? value.map((nestedValue, index) => [index, nestedValue] as const)
    : Object.entries(value)

  if (entries.length === 0) {
    return
  }

  output.push({ path, depth })

  for (const [segment, nestedValue] of entries) {
    collectTreeNodeMetadata(
      nestedValue,
      buildChildPath(path, segment),
      depth + 1,
      output,
    )
  }
}

const getTreeNodeMetadata = (value: unknown): TreeNodeMeta[] => {
  const output: TreeNodeMeta[] = []
  collectTreeNodeMetadata(value, ROOT_JSON_PATH, 0, output)
  return output
}

export const getAllCollapsiblePaths = (value: unknown): Set<string> => {
  return new Set(getTreeNodeMetadata(value).map((node) => node.path))
}

export const getCollapsedPathsForExpandDepth = (
  value: unknown,
  depth: number,
): Set<string> => {
  const metadata = getTreeNodeMetadata(value)
  const maxDepth = metadata.reduce(
    (currentMax, node) => Math.max(currentMax, node.depth),
    0,
  )

  if (depth > maxDepth) {
    return new Set()
  }

  return new Set(
    metadata
      .filter((node) => node.depth >= depth)
      .map((node) => node.path),
  )
}

export const getCollapsedPathsForCollapseDepth = (
  value: unknown,
  depth: number,
): Set<string> => {
  const metadata = getTreeNodeMetadata(value)
  const maxDepth = metadata.reduce(
    (currentMax, node) => Math.max(currentMax, node.depth),
    0,
  )

  if (depth > maxDepth) {
    return new Set()
  }

  return new Set(
    metadata
      .filter((node) => node.depth < depth)
      .map((node) => node.path),
  )
}
