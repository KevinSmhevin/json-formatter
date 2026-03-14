import type { IndentSize } from '../utils/jsonFormatter'
import { ExpandCollapseMenu } from './ExpandCollapseMenu'

type EditMenuProps = {
  selectedIndent: IndentSize
  sortKeysAlphabetically: boolean
  depthValue: string
  onCompactJson: () => void
  onCopyOutput: () => void
  onIndentChange: (indent: IndentSize) => void
  onSortKeysChange: (value: boolean) => void
  onDepthValueChange: (value: string) => void
  onExpandAll: () => void
  onCollapseAll: () => void
  onExpandByDepth: () => void
  onCollapseByDepth: () => void
}

export const EditMenu = ({
  selectedIndent,
  sortKeysAlphabetically,
  depthValue,
  onCompactJson,
  onCopyOutput,
  onIndentChange,
  onSortKeysChange,
  onDepthValueChange,
  onExpandAll,
  onCollapseAll,
  onExpandByDepth,
  onCollapseByDepth,
}: EditMenuProps) => {
  return (
    <div className="edit-menu" aria-label="Edit options">
      <div className="edit-menu-basic-controls">
        <label htmlFor="indent-size" className="edit-menu-label">
          Output Indentation
        </label>
        <select
          id="indent-size"
          className="edit-menu-select"
          value={selectedIndent}
          onChange={(event) => onIndentChange(Number(event.target.value) as IndentSize)}
        >
          <option value={2}>2 tab space</option>
          <option value={3}>3 tab space</option>
          <option value={4}>4 tab space</option>
        </select>

        <label htmlFor="sort-keys" className="edit-menu-checkbox-row">
          <input
            id="sort-keys"
            type="checkbox"
            className="edit-menu-checkbox"
            checked={sortKeysAlphabetically}
            onChange={(event) => onSortKeysChange(event.target.checked)}
          />
          Sort keys alphabetically
        </label>

        <button type="button" className="edit-menu-button" onClick={onCompactJson}>
          Compact JSON
        </button>

        <button type="button" className="edit-menu-button" onClick={onCopyOutput}>
          Copy Output
        </button>
      </div>

      <ExpandCollapseMenu
        depthValue={depthValue}
        onDepthValueChange={onDepthValueChange}
        onExpandAll={onExpandAll}
        onCollapseAll={onCollapseAll}
        onExpandByDepth={onExpandByDepth}
        onCollapseByDepth={onCollapseByDepth}
      />
    </div>
  )
}
