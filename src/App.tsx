import { useMemo, useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { JsonTextArea } from './components/JsonTextArea'
import { EditMenu } from './components/EditMenu'
import { JsonOutputTree } from './components/JsonOutputTree'
import { sortJsonKeysAlphabetically } from './utils/jsonSorting'
import {
  formatCompactJsonOutput,
  formatJsonOutput,
  type IndentSize,
  validateAndFormatJson,
} from './utils/jsonFormatter'
import {
  getAllCollapsiblePaths,
  getCollapsedPathsForCollapseDepth,
  getCollapsedPathsForExpandDepth,
} from './utils/jsonTreeControls'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [validatedJson, setValidatedJson] = useState<unknown | null>(null)
  const [indentSize, setIndentSize] = useState<IndentSize>(2)
  const [sortKeysAlphabetically, setSortKeysAlphabetically] = useState(false)
  const [collapsedPaths, setCollapsedPaths] = useState<Set<string>>(new Set())
  const [compactOutput, setCompactOutput] = useState<string | null>(null)
  const [depthValue, setDepthValue] = useState('2')
  const [statusMessage, setStatusMessage] = useState(
    'Enter JSON, then click Validate JSON.',
  )
  const [isError, setIsError] = useState(false)

  const displayedJson = useMemo(() => {
    if (validatedJson === null) {
      return null
    }

    return sortKeysAlphabetically
      ? sortJsonKeysAlphabetically(validatedJson)
      : validatedJson
  }, [validatedJson, sortKeysAlphabetically])

  const outputToCopy = useMemo(() => {
    if (compactOutput !== null) {
      return compactOutput
    }

    if (displayedJson === null) {
      return null
    }

    return formatJsonOutput(displayedJson, {
      indentSize,
      sortKeysAlphabetically: false,
    })
  }, [compactOutput, displayedJson, indentSize])

  const parseDepthValue = (): number => {
    const parsedValue = Number.parseInt(depthValue, 10)
    if (Number.isNaN(parsedValue)) {
      return 0
    }

    return Math.max(0, parsedValue)
  }

  const handleValidateJson = () => {
    const result = validateAndFormatJson(inputValue, {
      indentSize,
      sortKeysAlphabetically,
    })
    setStatusMessage(result.message)
    setIsError(!result.isValid)
    setValidatedJson(result.parsedValue)
    setCompactOutput(null)
    setCollapsedPaths(new Set())
  }

  const handleIndentChange = (nextIndent: IndentSize) => {
    setIndentSize(nextIndent)

    if (validatedJson === null) {
      return
    }

    setStatusMessage(`Output indentation updated to ${nextIndent} spaces.`)
    setIsError(false)
  }

  const handleSortKeysChange = (nextValue: boolean) => {
    setSortKeysAlphabetically(nextValue)

    if (validatedJson === null) {
      return
    }

    setStatusMessage(
      nextValue
        ? 'Output keys sorted alphabetically.'
        : 'Output key sorting turned off.',
    )

    if (validatedJson !== null && compactOutput !== null) {
      setCompactOutput(formatCompactJsonOutput(validatedJson, nextValue))
    }

    setIsError(false)
  }

  const handleTogglePath = (path: string) => {
    setCompactOutput(null)
    setCollapsedPaths((currentPaths) => {
      const nextPaths = new Set(currentPaths)
      if (nextPaths.has(path)) {
        nextPaths.delete(path)
      } else {
        nextPaths.add(path)
      }
      return nextPaths
    })
  }

  const handleExpandAll = () => {
    setCompactOutput(null)
    setCollapsedPaths(new Set())
    setStatusMessage('Expanded all JSON nodes.')
    setIsError(false)
  }

  const handleCollapseAll = () => {
    if (displayedJson === null) {
      return
    }

    setCompactOutput(null)
    setCollapsedPaths(getAllCollapsiblePaths(displayedJson))
    setStatusMessage('Collapsed all JSON nodes.')
    setIsError(false)
  }

  const handleExpandByDepth = () => {
    if (displayedJson === null) {
      return
    }

    const depth = parseDepthValue()
    setCompactOutput(null)
    setCollapsedPaths(getCollapsedPathsForExpandDepth(displayedJson, depth))
    setStatusMessage(`Expanded JSON to depth ${depth}.`)
    setIsError(false)
  }

  const handleCollapseByDepth = () => {
    if (displayedJson === null) {
      return
    }

    const depth = parseDepthValue()
    setCompactOutput(null)
    setCollapsedPaths(getCollapsedPathsForCollapseDepth(displayedJson, depth))
    setStatusMessage(`Collapsed JSON through depth ${depth}.`)
    setIsError(false)
  }

  const handleCompactJson = () => {
    if (validatedJson === null) {
      return
    }

    setCompactOutput(formatCompactJsonOutput(validatedJson, sortKeysAlphabetically))
    setStatusMessage('Output compacted and ready to send.')
    setIsError(false)
  }

  const handleCopyOutput = async () => {
    if (outputToCopy === null) {
      setStatusMessage('No output available to copy yet.')
      setIsError(true)
      return
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(outputToCopy)
      } else {
        const hiddenTextArea = document.createElement('textarea')
        hiddenTextArea.value = outputToCopy
        hiddenTextArea.setAttribute('readonly', 'true')
        hiddenTextArea.style.position = 'fixed'
        hiddenTextArea.style.opacity = '0'
        document.body.appendChild(hiddenTextArea)
        hiddenTextArea.select()
        document.execCommand('copy')
        document.body.removeChild(hiddenTextArea)
      }

      setStatusMessage('Output copied to clipboard.')
      setIsError(false)
    } catch {
      setStatusMessage('Unable to copy output automatically. Please copy manually.')
      setIsError(true)
    }
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
            <JsonOutputTree
              value={displayedJson}
              compactOutput={compactOutput}
              indentSize={indentSize}
              collapsedPaths={collapsedPaths}
              onTogglePath={handleTogglePath}
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
                depthValue={depthValue}
                onCompactJson={handleCompactJson}
                onCopyOutput={handleCopyOutput}
                onIndentChange={handleIndentChange}
                onSortKeysChange={handleSortKeysChange}
                onDepthValueChange={setDepthValue}
                onExpandAll={handleExpandAll}
                onCollapseAll={handleCollapseAll}
                onExpandByDepth={handleExpandByDepth}
                onCollapseByDepth={handleCollapseByDepth}
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
