import React, { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [expression, setExpression] = useState('')
  const [answer, setAnswer] = useState(0)
  const [decimal, setDecimal] = useState(false)

  //add event listeners for keydown
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [expression, answer])

  const handleKeyPress = (e) => {
    // check buttons pressed
    //if number or +-*/ display
    if (/^[\d\+\/\*\.\- \(\)]*$/.test(e.key)) {
      display(e.key)
    }
    if (e.key === 'Backspace') {
      clear()
    }
    if (e.key === 'Delete') {
      allClear()
    }
    if (e.key === 'Enter') {
      calculate()
    }
  }

  const display = (symbol) => {
    if (expression <= 0 && symbol === '0') return

    if (/^[\+\/\*\.\- \(\)]*$/.test(symbol)) {
      if (symbol === '.') {
        setDecimal(true)
      } else {
        setDecimal(false)
      }
    }

    if (decimal && symbol === '.') return
    else if (
      /^[\+\/\*\ \(\)]*$/.test(expression[expression.length - 2]) &&
      expression.slice(-1) === '-' &&
      /^[\+\/\* \(\)]*$/.test(symbol)
    ) {
      setExpression((prev) => prev.slice(0, -2) + symbol)
      setAnswer(symbol)
    } else if (
      /^[\+\/\*\- \(\)]*$/.test(expression[expression.length - 1]) &&
      /^[\+\/\*\ \(\)]*$/.test(symbol)
    ) {
      setExpression((prev) => prev.slice(0, -1) + symbol)
      setAnswer(symbol)
    } else {
      if (expression.slice(-2) == '--') {
        if (symbol === '-') {
          return
        } else {
          if (/^[\+\/\* \(\)]*$/.test(symbol)) {
            setExpression((prev) => prev.slice(0, -2) + symbol)
            setAnswer(symbol)
          } else {
            if (expression.slice(-2) == '--') {
              setExpression((prev) => prev.slice(0, -1) + `(-${symbol})`)
            } else {
              setExpression((prev) => prev + symbol)
            }
            setAnswer((prev) => prev + symbol)
          }
        }
      } else {
        setExpression((prev) => prev + symbol)
        setAnswer((prev) =>
          prev === 0
            ? symbol
            : /^[\+\/\*\- \(\)]*$/.test(symbol)
            ? symbol
            : /^[\+\/\*\- \(\)]*$/.test(prev)
            ? symbol
            : prev + symbol
        )
      }
    }

    // if last expression is =
    if (expression[expression.length - 1] == '=') {
      //if number is pressed set expression to number
      if (/[0-9.]/.test(symbol)) {
        setExpression(symbol)
        // else set expression to answer + symbol
      } else {
        setExpression(answer + symbol)
      }
    }
  }

  const calculate = () => {
    setAnswer(eval(expression))
    setExpression((prev) => prev + '=')
  }

  const allClear = () => {
    setExpression('')
    setAnswer(0)
    setDecimal(false)
  }
  const clear = () => {
    setExpression((prev) =>
      prev
        .split('')
        .slice(0, prev.length - 1)
        .join('')
    )
    setAnswer(0)
  }

  return (
    <div className="container">
      <div className="grid">
        <div className="dis">
          <input type="text" value={expression} placeholder="0" disabled />
          <div className="total" id="display">
            {answer}
          </div>
        </div>
        <div onClick={allClear} id="clear" className="padButton AC tomato">
          AC
        </div>
        <div onClick={clear} id="c" className="padButton C tomato">
          C
        </div>
        <div onClick={() => display('/')} id="divide" className="padButton div">
          /
        </div>
        <div
          onClick={() => display('*')}
          id="multiply"
          className="padButton times"
        >
          x
        </div>
        <div
          onClick={() => display('7')}
          id="seven"
          className="padButton seven dark-gray"
        >
          7
        </div>
        <div
          onClick={() => display('8')}
          id="eight"
          className="padButton eight dark-gray"
        >
          8
        </div>
        <div
          onClick={() => display('9')}
          id="nine"
          className="padButton nine dark-gray"
        >
          9
        </div>
        <div
          onClick={() => display('-')}
          id="subtract"
          className="padButton minus"
        >
          -
        </div>
        <div
          onClick={() => display('4')}
          id="four"
          className="padButton four dark-gray"
        >
          4
        </div>
        <div
          onClick={() => display('5')}
          id="five"
          className="padButton five dark-gray"
        >
          5
        </div>
        <div
          onClick={() => display('6')}
          id="six"
          className="padButton six dark-gray"
        >
          6
        </div>
        <div onClick={() => display('+')} id="add" className="padButton plus">
          +
        </div>
        <div
          onClick={() => display('1')}
          id="one"
          className="padButton one dark-gray"
        >
          1
        </div>
        <div
          onClick={() => display('2')}
          id="two"
          className="padButton two dark-gray"
        >
          2
        </div>
        <div
          onClick={() => display('3')}
          id="three"
          className="padButton three dark-gray"
        >
          3
        </div>
        <div
          id="equals"
          onClick={calculate}
          id="equals"
          className="padButton equal blue"
        >
          =
        </div>
        <div
          onClick={() => display('0')}
          id="zero"
          className="padButton zero dark-gray"
        >
          0
        </div>
        <div
          onClick={() => display('.')}
          id="decimal"
          className="padButton dot dark-gray"
        >
          .
        </div>
      </div>
    </div>
  )
}

export default App
