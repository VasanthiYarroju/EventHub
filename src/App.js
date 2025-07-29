import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Import your new HomePage component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;