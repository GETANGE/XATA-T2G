// import Dashboard from './components/Dashboard/Dashboard';
// // import {LoginSignup} from './components/Login-Signup/LoginSignup';

// export const App = () => {
//   return (
//     <>
//       {/* <LoginSignup/> */}
//       <Dashboard/>

//     </>
    
    
//   )
// }

// export default App




import React, { useState } from "react";
import TeamManagement from "./components/Team-Management/TeamManagement"; 
import Dashboard from './components/Dashboard/Dashboard';
import { LoginSignup } from "./components/Login-Signup/LoginSignup";
import "./App.css"; 

interface Team {
  id: number;
  name: string;
  members: string[];
}

const App: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  return (
    <div className="App">
       <LoginSignup/>
       <Dashboard/>
      <TeamManagement teams={teams} setTeams={setTeams} />
    </div>
  );
};

export default App;
