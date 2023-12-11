/* eslint-disable no-use-before-define */
import { clearPage } from '../../utils/render';
import { makeDisappearNavbar } from '../../utils/navbarSetup';

const THIS_PLAYER = 2;

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
      // eslint-disable-next-line no-console
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
    updateButtonState();

    if (!isFriendsSelected) {
      updateTable();
    } else {
      updateFriendsTable('');
    }
  };

  const toggleFriends = async () => {
    isFriendsSelected = !isFriendsSelected;

    updateButtonState();

    if (isFriendsSelected) {
      await updateFriendsTable('');
    } else {
      await updateTable();
    }
  };

  const updateButtonState = () => {
    filterOptions.forEach((option, index) => {
      const button = filterGroup.children[index];
      if (option === 'Alliés') {
        button.classList.toggle('active', isFriendsSelected);
      } else {
        const world = index + 1;
        if (isFriendsSelected) {
          button.classList.toggle('active', world === currentWorld);
        } else {
          button.classList.toggle('active', world === currentWorld);
        }
      }
    });
  };

  const title = document.createElement('h1');
  title.textContent = 'Chroniques des Braves';

  const filterOptions = ['Monde 1', 'Monde 2', 'Monde 3', 'Alliés'];
  const filterContainer = document.createElement('div');
  filterContainer.classList.add('d-flex', 'justify-content-center', 'my-4');
  const filterGroup = document.createElement('div');
  filterGroup.classList.add('btn-group');

  filterOptions.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('btn', 'btn-secondary', 'btn-toggle');
    button.setAttribute('data-bs-toggle', 'button');
    button.setAttribute('aria-pressed', 'false');

    button.textContent = option;

    if (option === 'Alliés') {
      button.addEventListener('click', toggleFriends);
    } else {
      button.addEventListener('click', () => switchToWorld(index + 1));
    }

    filterGroup.appendChild(button);
  });

  filterContainer.appendChild(filterGroup);

  const leaderboardContainer = document.createElement('div');
  leaderboardContainer.style.overflowY = 'auto';
  leaderboardContainer.style.maxHeight = '605px';

  const leaderboardTable = document.createElement('table');
  leaderboardTable.classList.add('table', 'table-striped', 'general-table', 'my-4');

  const tableHeader = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.style.textAlign = 'center';

  const headerColumns = [' #', 'Joueur', 'Temps (m:s)'];
  headerColumns.forEach((columnText, index) => {
    const headerColumn = document.createElement('th');
    headerColumn.setAttribute('scope', 'col');
    headerColumn.style.width = index === 0 ? '10%' : '45%';
    headerColumn.textContent = columnText;
    headerRow.appendChild(headerColumn);
  });

  tableHeader.appendChild(headerRow);
  leaderboardTable.appendChild(tableHeader);

  const tableBody = document.createElement('tbody');
  leaderboardTable.appendChild(tableBody);

  leaderboardContainer.appendChild(leaderboardTable);

  main.appendChild(title);
  main.appendChild(filterContainer);
  main.appendChild(leaderboardContainer);

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
