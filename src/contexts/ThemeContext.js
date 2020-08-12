import React, { createContext, useContext, useState } from 'react'
import { ThemeProvider } from 'styled-components'

// define our toggle context, with a default empty toggle function
const ThemeToggleContext = createContext({
  toggle: () => {},
})

// define exportable useContext hook object
export const useTheme = () => useContext(ThemeToggleContext)

// define
export const MyThemeProvider = ({ children }) => {
  //default mode is set to 'light'
  const [themeState, setThemeState] = useState({
    mode: localStorage.getItem('colby.sh:theme') || 'dark',
  })
  // define toggle function
  const toggle = () => {
    const mode = themeState.mode === 'light' ? 'dark' : 'light'
    localStorage.setItem('colby.sh:theme', mode)
    setThemeState({ mode: mode })
  }

  // render both contexts, then Wrapper, then children
  const { mode } = themeState
  return (
    <ThemeToggleContext.Provider value={{ toggle }}>
      <ThemeProvider
        theme={{
          mode,
        }}
      >
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  )
}

export default ThemeProvider
