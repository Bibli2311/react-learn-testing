// import { useState } from 'react'
import './Counter.css'

const label = "counterInput"

function Counter() {

  return (
    <>    
    <label htmlFor={label}>counter text</label>
    <input placeholder='counter number' type="text" id={label}></input>
    <p data-testid="pTag">Counter</p>
   </>

  )
}

export default Counter
