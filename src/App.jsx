import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodaysBrief from './components/todaybrief'

const App = () => {
  return (
    <div className="w-full h-screen bg-black text-white flex items-center justify-center">
      {/* Only render TodaysBrief on mobile screens */}
      <div className="block sm:hidden bg-gray-900 p-4 rounded-lg">
        <TodaysBrief />
      </div>
    </div>
  );
};

export default App;
