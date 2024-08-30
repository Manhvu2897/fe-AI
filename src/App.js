import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Upload from './views/uploadFile'
import History from './views/history'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
const App = () => {
  return (
    <Router>
      <React.Suspense fallback={loading}>
        <Routes>
          <Route name="Upload" path='/' element={<Upload />} />
          <Route name="History" path='/history' element={<History />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
