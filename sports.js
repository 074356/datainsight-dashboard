async function getTeam() {
  const teamName = document.getElementById('teamInput').value;
  const url = `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${teamName}`;

  const response = await fetch(url);
  const data = await response.json();

  const teamDiv = document.getElementById('teamResult');

  if (!data.teams) {
    teamDiv.innerHTML = `<p>No team found.</p>`;
    return;
  }

  const team = data.teams[0];
  teamDiv.innerHTML = `
    <h3>${team.strTeam}</h3>
    <p><strong>Sport:</strong> ${team.strSport}</p>
    <p><strong>Country:</strong> ${team.strCountry}</p>
    <p><strong>League:</strong> ${team.strLeague}</p>
    <img src="${team.strTeamBadge}" alt="Team Logo" width="100"/>
    <p>${team.strDescriptionEN?.substring(0, 300)}...</p>
  `;
}
