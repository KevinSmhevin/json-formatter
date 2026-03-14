type ExpandCollapseMenuProps = {
  depthValue: string
  onDepthValueChange: (value: string) => void
  onExpandAll: () => void
  onCollapseAll: () => void
  onExpandByDepth: () => void
  onCollapseByDepth: () => void
}

export const ExpandCollapseMenu = ({
  depthValue,
  onDepthValueChange,
  onExpandAll,
  onCollapseAll,
  onExpandByDepth,
  onCollapseByDepth,
}: ExpandCollapseMenuProps) => {
  return (
    <section className="edit-menu-tree-section" aria-label="Expand and collapse controls">
      <h3 className="edit-menu-tree-title">Expand / Collapse</h3>
      <div className="edit-menu-tree-controls">
        <button type="button" className="edit-menu-button" onClick={onExpandAll}>
          Expand all
        </button>

        <button type="button" className="edit-menu-button" onClick={onCollapseAll}>
          Collapse all
        </button>

        <label htmlFor="depth-level" className="edit-menu-label">
          N Levels
        </label>
        <input
          id="depth-level"
          type="number"
          min={0}
          step={1}
          className="edit-menu-number-input"
          value={depthValue}
          onChange={(event) => onDepthValueChange(event.target.value)}
        />

        <button type="button" className="edit-menu-button" onClick={onExpandByDepth}>
          Expand N
        </button>

        <button type="button" className="edit-menu-button" onClick={onCollapseByDepth}>
          Collapse N
        </button>
      </div>
    </section>
  )
}
