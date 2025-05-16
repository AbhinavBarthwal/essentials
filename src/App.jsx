import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodaysBrief from './components/todaybrief'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <TodaysBrief />
    </div>
  )
}

export default App;
