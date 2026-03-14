import type { IndentSize } from '../utils/jsonFormatter'

type EditMenuProps = {
  selectedIndent: IndentSize
  sortKeysAlphabetically: boolean
  onIndentChange: (indent: IndentSize) => void
  onSortKeysChange: (value: boolean) => void
}

export const EditMenu = ({
  selectedIndent,
  sortKeysAlphabetically,
  onIndentChange,
  onSortKeysChange,
}: EditMenuProps) => {
  return (
    <div className="edit-menu" aria-label="Edit options">
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
    </div>
  )
}
