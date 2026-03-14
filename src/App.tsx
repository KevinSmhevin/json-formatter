import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { JsonTextArea } from './components/JsonTextArea'
import { EditMenu } from './components/EditMenu'
import {
  formatJsonOutput,
  type IndentSize,
  validateAndFormatJson,
} from './utils/jsonFormatter'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [outputValue, setOutputValue] = useState('')
  const [validatedJson, setValidatedJson] = useState<unknown | null>(null)
  const [indentSize, setIndentSize] = useState<IndentSize>(2)
  const [sortKeysAlphabetically, setSortKeysAlphabetically] = useState(false)
  const [statusMessage, setStatusMessage] = useState(
    'Enter JSON, then click Validate JSON.',
  )
  const [isError, setIsError] = useState(false)

  const handleValidateJson = () => {
    const result = validateAndFormatJson(inputValue, {
      indentSize,
      sortKeysAlphabetically,
    })
    setOutputValue(result.formatted)
    setStatusMessage(result.message)
    setIsError(!result.isValid)
    setValidatedJson(result.parsedValue)
  }

  const handleIndentChange = (nextIndent: IndentSize) => {
    setIndentSize(nextIndent)

    if (validatedJson === null) {
      return
    }

    setOutputValue(
      formatJsonOutput(validatedJson, {
        indentSize: nextIndent,
        sortKeysAlphabetically,
      }),
    )
    setStatusMessage(`Output indentation updated to ${nextIndent} spaces.`)
    setIsError(false)
  }

  const handleSortKeysChange = (nextValue: boolean) => {
    setSortKeysAlphabetically(nextValue)

    if (validatedJson === null) {
      return
    }

    setOutputValue(
      formatJsonOutput(validatedJson, {
        indentSize,
        sortKeysAlphabetically: nextValue,
      }),
    )
    setStatusMessage(
      nextValue
        ? 'Output keys sorted alphabetically.'
        : 'Output key sorting turned off.',
    )
    setIsError(false)
  }

  return (
    <div className="app-shell">
      <Navbar title="JSON Formatter" />
      <main className="app-main">
        <section className="formatter-card" aria-label="JSON formatter">
          <div className="editor-grid">
            <JsonTextArea
              id="json-input"
              label="Input JSON"
              placeholder='Example: {"name":"Kevin","active":true}'
              value={inputValue}
              onChange={setInputValue}
            />
            <JsonTextArea
              id="json-output"
              label="Formatted Output"
              placeholder="Formatted JSON appears here..."
              value={outputValue}
              readOnly
            />
          </div>

          <div className="action-row">
            <div className="controls-group">
              <button type="button" className="validate-button" onClick={handleValidateJson}>
                Validate JSON
              </button>
              <EditMenu
                selectedIndent={indentSize}
                sortKeysAlphabetically={sortKeysAlphabetically}
                onIndentChange={handleIndentChange}
                onSortKeysChange={handleSortKeysChange}
              />
            </div>
            <p className={`status-message ${isError ? 'error' : 'success'}`} role="status">
              {statusMessage}
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
