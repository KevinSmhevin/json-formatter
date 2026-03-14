import type { ReactNode } from 'react'
import type { IndentSize } from '../utils/jsonFormatter'
import { buildChildPath, ROOT_JSON_PATH } from '../utils/jsonTreeControls'

type JsonOutputTreeProps = {
  value: unknown | null
  compactOutput: string | null
  indentSize: IndentSize
  collapsedPaths: Set<string>
  onTogglePath: (path: string) => void
}

type RenderNodeParams = {
  value: unknown
  path: string
  depth: number
  indentSize: IndentSize
  collapsedPaths: Set<string>
  onTogglePath: (path: string) => void
  objectKey?: string
  isLast?: boolean
}

const isJsonContainer = (
  value: unknown,
): value is Record<string, unknown> | unknown[] => {
  return typeof value === 'object' && value !== null
}

const getIndentStyle = (depth: number, indentSize: IndentSize) => {
  return { paddingInlineStart: `${depth * indentSize * 0.55}rem` }
}

const renderNode = ({
  value,
  path,
  depth,
  indentSize,
  collapsedPaths,
  onTogglePath,
  objectKey,
  isLast = true,
}: RenderNodeParams): ReactNode[] => {
  const keyPrefix = objectKey === undefined ? '' : `${JSON.stringify(objectKey)}: `
  const trailingComma = isLast ? '' : ','

  if (!isJsonContainer(value)) {
    return [
      <div className="json-tree-line" style={getIndentStyle(depth, indentSize)} key={path}>
        <span>{`${keyPrefix}${JSON.stringify(value)}${trailingComma}`}</span>
      </div>,
    ]
  }

  const entries = Array.isArray(value)
    ? value.map((nestedValue, index) => [index, nestedValue] as const)
    : Object.entries(value)

  const openToken = Array.isArray(value) ? '[' : '{'
  const closeToken = Array.isArray(value) ? ']' : '}'

  if (entries.length === 0) {
    return [
      <div className="json-tree-line" style={getIndentStyle(depth, indentSize)} key={path}>
        <span>{`${keyPrefix}${openToken}${closeToken}${trailingComma}`}</span>
      </div>,
    ]
  }

  const isCollapsed = collapsedPaths.has(path)

  if (isCollapsed) {
    return [
      <div className="json-tree-line" style={getIndentStyle(depth, indentSize)} key={path}>
        <button
          type="button"
          className="json-tree-toggle"
          onClick={() => onTogglePath(path)}
          aria-label="Expand object"
        >
          +
        </button>
        <span>{`${keyPrefix}${openToken}...${closeToken}${trailingComma}`}</span>
      </div>,
    ]
  }

  const lines: ReactNode[] = [
    <div className="json-tree-line" style={getIndentStyle(depth, indentSize)} key={`${path}-open`}>
      <button
        type="button"
        className="json-tree-toggle"
        onClick={() => onTogglePath(path)}
        aria-label="Collapse object"
      >
        -
      </button>
      <span>{`${keyPrefix}${openToken}`}</span>
    </div>,
  ]

  entries.forEach(([segment, nestedValue], index) => {
    const nestedPath = buildChildPath(path, segment)
    lines.push(
      ...renderNode({
        value: nestedValue,
        path: nestedPath,
        depth: depth + 1,
        indentSize,
        collapsedPaths,
        onTogglePath,
        objectKey: Array.isArray(value) ? undefined : String(segment),
        isLast: index === entries.length - 1,
      }),
    )
  })

  lines.push(
    <div className="json-tree-line" style={getIndentStyle(depth, indentSize)} key={`${path}-close`}>
      <span>{`${closeToken}${trailingComma}`}</span>
    </div>,
  )

  return lines
}

export const JsonOutputTree = ({
  value,
  compactOutput,
  indentSize,
  collapsedPaths,
  onTogglePath,
}: JsonOutputTreeProps) => {
  return (
    <div className="json-output">
      <label className="json-text-area-label" htmlFor="json-output-tree">
        Formatted Output
      </label>
      <div id="json-output-tree" className="json-output-viewer" role="region" aria-live="polite">
        {compactOutput !== null ? (
          <p className="json-output-compact-text">{compactOutput}</p>
        ) : value === null ? (
          <p className="json-output-placeholder">Formatted JSON appears here...</p>
        ) : (
          renderNode({
            value,
            path: ROOT_JSON_PATH,
            depth: 0,
            indentSize,
            collapsedPaths,
            onTogglePath,
          })
        )}
      </div>
    </div>
  )
}
