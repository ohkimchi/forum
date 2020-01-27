import React, { useReducer } from 'react'
import './App.css'
import { AppContext, AppReducer, initialState, PAGE_LOGIC } from './AppReducer'

const App: React.FC = () => {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const Compo = PAGE_LOGIC[state.currentPage]

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className='App'>
        <Compo />
      </div>
    </AppContext.Provider>
  )
}

export default App
