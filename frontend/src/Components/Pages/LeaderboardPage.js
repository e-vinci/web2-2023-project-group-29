/* eslint-disable no-use-before-define */
import { clearPage } from '../../utils/render';
import { makeDisappearNavbar } from '../../utils/navbarSetup';

const THIS_PLAYER = 1;

const LeaderboardPage = () => {
  clearPage();
  makeDisappearNavbar(false);

  let currentWorld = 1;
  let isFriendsSelected = false;

  const main = document.querySelector('main');

  const fetchScores = async (world, option) => {
    try {
      let route = '';
      if (isFriendsSelected) {
        route = `friendsBestScores/${THIS_PLAYER}/${world}/${option}`;
      } else {
        route = `bestScores/${world}`;
      }
  
      const response = await fetch(`http://localhost:3000/scores/${route}`);
      if (!response.ok) {
        throw new Error('Réponse Network pas ok');
      }
      const data = await response.json();
  
      displayScores(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des scores: ', error);
    }
  };
  

  const displayScores = (data) => {
    const leaderboardTable = main.querySelector('table tbody');
    leaderboardTable.innerHTML = '';

    data.forEach((o, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <th scope="row" style="text-align: center">${index + 1}</th>
        <td style="text-align: center">${o.player}</td>
        <td style="text-align: center">${secondsToMinutesSeconds(o.total_score)}</td>
      `;
      leaderboardTable.appendChild(row);
    });
  };

  const updateTable = async () => {
    await fetchScores(currentWorld, '');
  };

  const updateFriendsTable = async (option) => {
    await fetchScores(currentWorld, option);
  };

  const switchToWorld = (world) => {
    currentWorld = world;
    if (isFriendsSelected) {
      updateFriendsTable('');
    } else {
      updateTable();
    }
  };

  const toggleFriends = async () => {
    isFriendsSelected = !isFriendsSelected;
    if (isFriendsSelected) {
      await updateFriendsTable('');
    } else {
      await updateTable();
    }
  };

  const title = document.createElement('h1');
  title.textContent = 'Chroniques des Braves';

  const filterOptions = ['World 1', 'World 2', 'World 3', 'Friends'];
  const filterContainer = document.createElement('div');
  filterContainer.classList.add('d-flex', 'justify-content-center', 'my-4');
  const filterGroup = document.createElement('div');
  filterGroup.classList.add('btn-group');

  filterOptions.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('btn', 'btn-secondary');
    button.textContent = option;

    if (option === 'Friends') {
      button.addEventListener('click', toggleFriends);
    } else {
      button.addEventListener('click', () => switchToWorld(index + 1));
    }

    filterGroup.appendChild(button);
  });

  filterContainer.appendChild(filterGroup);

  const leaderboardTable = document.createElement('table');
  leaderboardTable.classList.add('table', 'table-striped', 'general-table', 'my-4');

  const tableHeader = document.createElement('thead');
  tableHeader.innerHTML = `
       <tr style="text-align: center">
           <th scope="col" style="width: 20%">#</th>
           <th scope="col" style="width: 40%">Player</th>
           <th scope="col" style="width: 40%">Time (m:s)</th>
       </tr>
   `;
  leaderboardTable.appendChild(tableHeader);

  const tableBody = document.createElement('tbody');
  leaderboardTable.appendChild(tableBody);

  main.appendChild(title);
  main.appendChild(filterContainer);
  main.appendChild(leaderboardTable);

  const secondsToMinutesSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = `0${minutes}`.slice(-2);
    const formattedSeconds = `0${remainingSeconds}`.slice(-2);

    const result = `${formattedMinutes}:${formattedSeconds}`;
    return result;
  };

  updateTable();
};

export default LeaderboardPage;
