import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // No need to import 'Router'
import HomePage from './Components/HomePage/HomePage';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import Dashboard from './Components/Dashboard/Dashboard';
import LogMoods from './Components/LogMoods/LogMoods';
import MoodReports from './Components/MoodReports/MoodReports';
import MoodCheck from './Components/MoodCheeck/MoodCheck';
import Resource from './Components/Resource/Resource';
import Settings from './Components/Settings/Settings';


const App = () => {
  return (
    <Router>  {/* Use only BrowserRouter */}
      <div className="App">
        {/* Add your sidebar and routes here */}
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login-register" element={<LoginRegister/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/LogMoods" element={<LogMoods/>} />
          <Route path="/MoodReports" element={<MoodReports/>} />
          <Route path="/MoodCheck" element={<MoodCheck/>} />
          <Route path="/Resource" element={<Resource/>} />
          <Route path="/Settings" element={<Settings/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;