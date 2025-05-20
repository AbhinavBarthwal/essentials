import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodaysBrief from './components/todaybrief';
import CameraCapture from './components/inputimage';
import Collection from './components/collection';
import Previously from './components/previously';
import DetailView from './components/DetailView'; // Import your expanded view

const App = () => {
  return (
    <Router>
      <div className="w-full h-full bg-black text-white flex items-center justify-center">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <div className="block sm:hidden bg-black p-4 rounded-lg">
                <CameraCapture />
                <TodaysBrief />
                <Collection />
                <Previously />
              </div>
            }
          />

          {/* Detail View Page */}
          <Route path="/detail" element={<DetailView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
