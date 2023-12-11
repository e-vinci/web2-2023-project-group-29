import { clearPage } from '../../utils/render';

const THIS_PLAYER = 1;

const fetchInvitations = async () => {
  try {
    const response = await fetch(`http://localhost:3000/alliances/invitations/${THIS_PLAYER}`);
    const data = await response.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erreur lors de la récupération des invitations: ', error);
    return [];
  }
};

const fetchAllies = async () => {
  try {
    const response = await fetch(`http://localhost:3000/alliances/allies/${THIS_PLAYER}`);
    const data = await response.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erreur lors de la récupération des alliés: ', error);
    return [];
  }
};

const acceptInvitation = async (sender) => {
  try {
    await fetch(`http://localhost:3000/alliances/${THIS_PLAYER}/${sender}?action=accept`, {
      method: 'PUT',
    });
    fetchAllies();
    fetchInvitations();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Erreur lors de l'acceptation de l'invitation: ", error);
  }
};

const rejectInvitation = async (sender) => {
  try {
    await fetch(`http://localhost:3000/alliances/${THIS_PLAYER}/${sender}?action=reject`, {
      method: 'PUT',
    });
    fetchInvitations();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Erreur lors du rejet de l'invitation: ", error);
  }
};

const removeAlly = async (ally) => {
  try {
    await fetch(`http://localhost:3000/alliances/${THIS_PLAYER}/${ally}`, {
      method: 'DELETE',
    });
    fetchAllies();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Erreur lors de la suppression de l'allié: ", error);
  }
};

const createInvitationsTable = async () => {
  const invitations = await fetchInvitations();

  const table = document.createElement('table');
  table.classList.add('table', 'general-table');

  const tableHead = document.createElement('thead');
  tableHead.innerHTML = `
    <tr>
      <th scope="col">Invitation de</th>
      <th scope="col">Action</th>
    </tr>
  `;
  table.appendChild(tableHead);

  const tableBody = document.createElement('tbody');

  if (invitations.length === 0) {
    const noInvitationsRow = document.createElement('tr');
    noInvitationsRow.innerHTML = `
      <td colspan="2">Pas d'invitations pour le moment...</td>
    `;
    tableBody.appendChild(noInvitationsRow);
  } else {
    invitations.forEach((invitation) => {
      const inviteRow = document.createElement('tr');
      inviteRow.innerHTML = `
        <td>${invitation.login}</td>
        <td>
          <button class="btn btn-primary accept-btn ${
            invitation.state === 'accepted' ? 'disabled' : ''
          }" ${invitation.state === 'accepted' ? 'disabled' : ''}>
            ${invitation.state === 'accepted' ? 'Acceptée' : 'Accepter'}
          </button>
          <button class="btn btn-danger reject-btn">Rejeter</button>
        </td>
      `;

      const acceptButton = inviteRow.querySelector('.accept-btn');
      const rejectButton = inviteRow.querySelector('.reject-btn');

      if (invitation.state !== 'accepted') {
        acceptButton.addEventListener('click', () => {
          acceptInvitation(invitation.login);
          acceptButton.classList.add('btn-secondary', 'disabled');
          acceptButton.textContent = 'Acceptée';
          acceptButton.disabled = true;
          rejectButton.disabled = true;
        });
        rejectButton.addEventListener('click', () => {
          rejectInvitation(invitation.login);
          rejectButton.classList.add('disabled');
          rejectButton.textContent = 'Rejetée';
          rejectButton.disabled = true;
          acceptButton.disabled = true;
        });
      }

      tableBody.appendChild(inviteRow);
    });
  }

  table.appendChild(tableBody);

  return table;
};

const createAlliesTable = async () => {
  const allies = await fetchAllies();

  const table = document.createElement('table');
  table.classList.add('table', 'general-table');

  const tableHead = document.createElement('thead');
  tableHead.innerHTML = `
    <tr>
      <th scope="col">Allié</th>
      <th scope="col">Action</th>
    </tr>
  `;
  table.appendChild(tableHead);

  const tableBody = document.createElement('tbody');

  if (allies.length === 0) {
    const noAlliesRow = document.createElement('tr');
    noAlliesRow.innerHTML = `
      <td colspan="2">Pas d'alliés pour le moment...</td>
    `;
    tableBody.appendChild(noAlliesRow);
  } else {
    allies.forEach((ally) => {
      const allyRow = document.createElement('tr');
      allyRow.innerHTML = `
        <td>${ally.login}</td>
        <td>
          <button class="btn btn-danger btn-sm">Supprimer</button>
        </td>
      `;

      const deleteButton = allyRow.querySelector('button');
      deleteButton.addEventListener('click', async () => {
        await removeAlly(ally.login);
        allyRow.remove();
        const updatedAllies = await fetchAllies();
        if (updatedAllies.length === 0) {
          tableBody.innerHTML = '';
          const noAlliesRow = document.createElement('tr');
          noAlliesRow.innerHTML = `
            <td colspan="2">Pas d'alliés pour le moment...</td>
          `;
          tableBody.appendChild(noAlliesRow);
        }
      });

      tableBody.appendChild(allyRow);
    });
  }

  table.appendChild(tableBody);

  return table;
};

const AlliesPage = async () => {
  clearPage();

  const main = document.querySelector('main');
  const title = document.createElement('h1');
  title.innerText = 'Alliés du Royaume';

  const container = document.createElement('div');
  container.classList.add('container');

  const alliesTable = await createAlliesTable();
  container.appendChild(alliesTable);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('d-flex', 'justify-content-center', 'my-4');

  const buttonsGroup = document.createElement('div');
  buttonsGroup.classList.add('btn-group');

  const alliesButton = document.createElement('button');
  alliesButton.textContent = 'Mes Alliés';
  alliesButton.type = 'button';
  alliesButton.classList.add('btn', 'btn-secondary');
  buttonsGroup.appendChild(alliesButton);

  const invitationsButton = document.createElement('button');
  invitationsButton.textContent = 'Invitations';
  invitationsButton.type = 'button';
  invitationsButton.classList.add('btn', 'btn-secondary');
  buttonsGroup.appendChild(invitationsButton);

  const addAllyButton = document.createElement('button');
  addAllyButton.textContent = 'Ajouter Allié';
  addAllyButton.type = 'button';
  addAllyButton.classList.add('btn', 'btn-secondary');
  buttonsGroup.appendChild(addAllyButton);

  buttonsContainer.appendChild(buttonsGroup);

  alliesButton.addEventListener('click', async () => {
    container.innerHTML = '';
    const alliancesTable = await createAlliesTable();
    container.appendChild(alliancesTable);
  });

  invitationsButton.addEventListener('click', async () => {
    container.innerHTML = '';
    const invitationsTable = await createInvitationsTable();
    container.appendChild(invitationsTable);
  });

  addAllyButton.addEventListener('click', () => {
    container.innerHTML = '';

    const allyForm = document.createElement('form');
    allyForm.classList.add('needs-validation', 'd-flex', 'flex-column', 'align-items-center');
    allyForm.style.marginTop = '20px';

    const nameLabel = document.createElement('label');
    nameLabel.textContent = "Nom de l'allié :";

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('required', 'true');
    nameInput.setAttribute('name', 'allyToBeAdded');
    nameInput.classList.add('form-control');
    nameInput.style.maxWidth = '50%';
    nameInput.style.fontSize = 'x-large';
    nameInput.style.marginBottom = '20px';

    const addButton = document.createElement('button');
    addButton.setAttribute('type', 'submit');
    addButton.classList.add('btn', 'btn-warning', 'btn-block');
    addButton.textContent = 'Ajouter';

    const formMessage = document.createElement('div');
    formMessage.classList.add('mt-3', 'text-center');

    allyForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const allyToBeAdded = nameInput.value;
      if (allyForm.checkValidity()) {
        try {
          const response = await fetch(`http://localhost:3000/alliances/${THIS_PLAYER}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ allyToBeAdded }),
          });

          const data = await response.json();

          if (response.ok) {
            formMessage.classList.add('text-success');
            formMessage.innerText = data.message;
          } else {
            formMessage.classList.add('text-danger');
            formMessage.innerText = data.error;
          }
        } catch (error) {
          formMessage.classList.add('text-danger');
          formMessage.innerText = error.message;
        }
      } else {
        event.stopPropagation();
      }
    });

    allyForm.appendChild(nameLabel);
    allyForm.appendChild(nameInput);
    allyForm.appendChild(addButton);
    allyForm.appendChild(formMessage);
    container.appendChild(allyForm);
  });

  main.appendChild(title);
  main.appendChild(buttonsContainer);
  main.appendChild(container);
};

export default AlliesPage;
