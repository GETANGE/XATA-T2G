

import React, { useState } from "react";
import "./TeamManagement.css";

interface Team {
  id: number;
  name: string;
  members: string[];
}

interface TeamManagementProps {
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
}

const TeamManagement: React.FC<TeamManagementProps> = ({ teams, setTeams }) => {
  const [teamName, setTeamName] = useState("");
  const [newMember, setNewMember] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const createTeam = () => {
    if (!teamName) return alert("Team name cannot be empty!");
    const newTeam: Team = {
      id: Date.now(),
      name: teamName,
      members: [],
    };
    setTeams([...teams, newTeam]);
    setTeamName("");
  };

  const addMember = () => {
    if (selectedTeamId === null)
      return alert("Please select a team to add members");
    if (!newMember.trim()) return;

    const updatedTeams = teams.map((team) =>
      team.id === selectedTeamId
        ? { ...team, members: [...team.members, newMember] }
        : team
    );
    setTeams(updatedTeams);
    setNewMember("");
  };

  return (
    <div className="team-management">
      <div className="nav">
        <h2>Welcome to Teams</h2>
      </div>
      <div className="main-container">
        <div className="create-team">
          <input
            className="input-fields"
            type="text"
            value={teamName}
            placeholder="Enter Team Name"
            onChange={(e) => setTeamName(e.target.value)}
          />
          <button onClick={createTeam}>Create Team</button>
        </div>

        <div className="select-team">
          <select onChange={(e) => setSelectedTeamId(Number(e.target.value))}>
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div className="invite-members">
          <input
            className="input-fields"
            type="text"
            value={newMember}
            placeholder="Enter Member Name"
            onChange={(e) => setNewMember(e.target.value)}
          />
          <button onClick={addMember}>Add Member</button>
        </div>

        <div className="team-list">
          <h3>Teams</h3>
          {teams.length === 0 ? (
            <p>No teams yet.</p>
          ) : (
            <ul>
              {teams.map((team) => (
                <li key={team.id}>
                  <strong>{team.name}</strong>
                  <ul>
                    {team.members.map((member, idx) => (
                      <li key={idx}>{member}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
