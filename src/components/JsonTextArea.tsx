type JsonTextAreaProps = {
  id: string
  label: string
  value: string
  placeholder?: string
  readOnly?: boolean
  onChange?: (value: string) => void
}

export const JsonTextArea = ({
  id,
  label,
  value,
  placeholder,
  readOnly = false,
  onChange,
}: JsonTextAreaProps) => {
  return (
    <div className="json-text-area">
      <label htmlFor={id} className="json-text-area-label">
        {label}
      </label>
      <textarea
        id={id}
        className="json-text-area-input"
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={(event) => onChange?.(event.target.value)}
        spellCheck={false}
      />
    </div>
  )
}
