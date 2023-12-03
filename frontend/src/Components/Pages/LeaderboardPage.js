import { clearPage } from '../../utils/render';
import data from '../../data/scores.json';
import { makeDisappearNavbar } from '../../utils/navbarSetup';

const LeaderboardPage = () => {
  clearPage();
  makeDisappearNavbar(false);

  const filterOptions = ['All', 'World 1', 'World 2', 'World 3'];
  let currentOption = 'All';

  const updateTable = () => {
    const main = document.querySelector('main');
    const leaderboardTable = main.querySelector('table tbody');
    leaderboardTable.innerHTML = '';

    const filteredData = (currentOption === 'All') ? data : data.filter(player => `World ${player.world}` === currentOption);

    filteredData.forEach((player, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <th scope="row" style="text-align: center">${index + 1}</th>
        <td style="text-align: center">${player.name}</td>
        <td style="text-align: center">${player.score}</td>
      `;
      leaderboardTable.appendChild(row);
    });
  };

  const main = document.querySelector('main');

  const title = document.createElement('h1');
  title.textContent = 'Leaderboard';

  const filterContainer = document.createElement('div');
  filterContainer.classList.add('d-flex', 'justify-content-center', 'my-4');

  const filterGroup = document.createElement('div');
  filterGroup.classList.add('btn-group');

  filterOptions.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('btn', 'btn-secondary');
    button.textContent = option;
    
    button.addEventListener('click', () => {
      currentOption = option;
      updateTable();
    });

    filterGroup.appendChild(button);
  });

  filterContainer.appendChild(filterGroup);

  const leaderboardTable = document.createElement('table');
  leaderboardTable.classList.add('table', 'table-striped', 'mx-auto', 'w-75', 'my-4');
  leaderboardTable.classList.add('table', 'table-striped', 'mx-auto', 'w-75');

  leaderboardTable.style.maxWidth = '60%';

  leaderboardTable.style.borderCollapse = 'separate';
  leaderboardTable.style.borderSpacing = '0';
  leaderboardTable.style.borderRadius = '20px';
  leaderboardTable.style.overflow = 'hidden';
  leaderboardTable.style.border = '1px solid black';

  const tableHeader = document.createElement('thead');
  tableHeader.innerHTML = `
       <tr style="text-align: center">
           <th scope="col" style="width: 20%">#</th>
           <th scope="col" style="width: 40%">Player</th>
           <th scope="col" style="width: 40%">Score</th>
       </tr>
   `;
  leaderboardTable.appendChild(tableHeader);

  const tableBody = document.createElement('tbody');
  leaderboardTable.appendChild(tableBody);

  main.appendChild(title);
  main.appendChild(filterContainer);
  main.appendChild(leaderboardTable);

  updateTable();
};

export default LeaderboardPage;
