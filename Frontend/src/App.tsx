import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginSignup } from './../src/components/Login-Signup/LoginSignup';
import Dashboard from './components/Dashboard/Dashboard';
import TaskBoard from './components/TaskBoard/pages/TaskBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/team-dashboard" element={<TaskBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
