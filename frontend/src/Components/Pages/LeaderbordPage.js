import { clearPage } from '../../utils/render';
import data from '../../data/scores.json';

const LeaderboardPage = () => {
  clearPage();

  const main = document.querySelector('main');

  const leaderboardTable = document.createElement('table');
  leaderboardTable.classList.add('table', 'table-striped');

  const tableHeader = document.createElement('thead');
  tableHeader.innerHTML = `
       <tr>
           <th scope="col">Position</th>
           <th scope="col">Nom</th>
           <th scope="col">Score</th>
       </tr>
   `;
  leaderboardTable.appendChild(tableHeader);

  const tableBody = document.createElement('tbody');

  data.forEach((player, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${player.name}</td>
      <td>${player.score}</td>
    `;
    tableBody.appendChild(row);
  });

  leaderboardTable.appendChild(tableBody);
  main.appendChild(leaderboardTable);
};

export default LeaderboardPage;
