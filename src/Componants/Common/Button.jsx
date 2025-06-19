import React from 'react'

function Button({className , onSubmit , children}) {
  return (
    <button
    className={className}
    onClick={onSubmit}
    >{children}</button>
  )
}

export default Button
