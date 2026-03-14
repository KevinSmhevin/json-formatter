import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { JsonTextArea } from './components/JsonTextArea'
import { validateAndFormatJson } from './utils/jsonFormatter'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [outputValue, setOutputValue] = useState('')
  const [statusMessage, setStatusMessage] = useState(
    'Enter JSON, then click Validate JSON.',
  )
  const [isError, setIsError] = useState(false)

  const handleValidateJson = () => {
    const result = validateAndFormatJson(inputValue)
    setOutputValue(result.formatted)
    setStatusMessage(result.message)
    setIsError(!result.isValid)
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
            <button type="button" className="validate-button" onClick={handleValidateJson}>
              Validate JSON
            </button>
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
