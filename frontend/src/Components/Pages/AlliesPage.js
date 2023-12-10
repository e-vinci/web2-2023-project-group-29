import { clearPage } from '../../utils/render';

const fetchInvitations = async () => {
  try {
    const response = await fetch('TON_ENDPOINT_API/invitations');
    const data = await response.json();
    return data.invitations;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erreur lors de la récupération des invitations :', error);
    return [];
  }
};

const fetchAllies = async () => {
  try {
    const response = await fetch('TON_ENDPOINT_API/allies');
    const data = await response.json();
    return data.allies;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erreur lors de la récupération des alliés :', error);
    return [];
  }
};

const acceptInvitation = async (invitationId) => {
  // Appel à l'API pour accepter une invitation dans la base de données
  try {
    await fetch(`TON_ENDPOINT_API/invitations/${invitationId}/accept`, {
      method: 'POST',
      // ... autres options de requête (headers, etc.)
    });
    // Peut-être que tu veux recharger les données après l'acceptation
    // fetchInvitations();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Erreur lors de l'acceptation de l'invitation :", error);
  }
};

const removeAlly = async (allyId) => {
  // Appel à l'API pour supprimer un allié de la base de données
  try {
    await fetch(`TON_ENDPOINT_API/allies/${allyId}`, {
      method: 'DELETE',
      // ... autres options de requête (headers, etc.)
    });
    // Peut-être que tu veux recharger les données après la suppression
    // fetchAllies();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Erreur lors de la suppression de l'allié :", error);
  }
};

const createInvitationsList = async () => {
  const invitations = await fetchInvitations();

  const invitationsList = document.createElement('div');
  invitationsList.classList.add('list-group', 'd-flex', 'flex-column', 'align-items-center');

  if (invitations.length === 0) {
    const noInvitationsMessage = document.createElement('p');
    noInvitationsMessage.textContent = "Pas d'invitations pour le moment...";
    invitationsList.appendChild(noInvitationsMessage);
  } else {
    invitations.forEach((invitation) => {
      const inviteItem = document.createElement('div');
      inviteItem.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-center',
      );
      inviteItem.textContent = `Invitation de ${invitation.initiator_login}`;

      const acceptButton = document.createElement('button');
      acceptButton.classList.add('btn', 'btn-sm');

      if (invitation.state === 'accepted') {
        acceptButton.classList.add('btn-secondary', 'disabled');
        acceptButton.textContent = 'Acceptée';
        acceptButton.disabled = true;
      } else {
        acceptButton.classList.add('btn-primary');
        acceptButton.textContent = 'Accepter';

        acceptButton.addEventListener('click', () => {
          // eslint-disable-next-line no-console
          console.log(`Invitation de ${invitation.initiator_login} acceptée.`);
          acceptInvitation(invitation.initiator_login);
          acceptButton.classList.add('btn-secondary', 'disabled');
          acceptButton.textContent = 'Acceptée';
          acceptButton.disabled = true;
        });
      }

      inviteItem.appendChild(acceptButton);
      invitationsList.appendChild(inviteItem);
    });
  }

  return invitationsList;
};

const createAlliesList = async () => {
  const allies = await fetchAllies();

  const alliesList = document.createElement('div');
  alliesList.classList.add('list-group', 'd-flex', 'flex-column', 'align-items-center');

  if (allies.length === 0) {
    const noAlliesMessage = document.createElement('p');
    noAlliesMessage.textContent = "Pas d'alliés pour le moment...";
    alliesList.appendChild(noAlliesMessage);
  } else {
    allies.forEach((ally) => {
      const allyItem = document.createElement('div');
      allyItem.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-center',
      );
      allyItem.textContent = `${ally.login}`;

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
      deleteButton.textContent = 'Supprimer';

      deleteButton.addEventListener('click', () => {
        // eslint-disable-next-line no-console
        console.log(`Allié ${ally.login} supprimé.`);
        removeAlly(ally.login);
        allyItem.remove();
      });

      allyItem.appendChild(deleteButton);
      alliesList.appendChild(allyItem);
    });
  }

  return alliesList;
};

const AlliesPage = async () => {
  clearPage();

  const main = document.querySelector('main');

  const title = document.createElement('h1');
  title.innerText = 'Alliés du Royaume';

  const container = document.createElement('div');
  container.classList.add('container');

  const alliesList = await createAlliesList();
  container.appendChild(alliesList);

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
    container.appendChild(alliesList);
  });

  invitationsButton.addEventListener('click', async () => {
    container.innerHTML = '';
    const invitationsList = await createInvitationsList();
    container.appendChild(invitationsList);
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
      /*
      if (allyForm.checkValidity()) {
        try {
          const response = await fetch(`http://localhost:3000/alliances/${localStorage.getItem('token').player_id}`, {
            method: 'POST',
            body: allyToBeAdded
          });

          if (response.ok) {
            formMessage.classList.add('text-success');
            formMessage.innerText = `${allyToBeAdded} ajouté avec succès à vos alliés !`
          } else {
            formMessage.classList.add('text-danger');
            formMessage.innerText = 'Une erreur est survenue.'
          }
        } catch (error) {
          formMessage.classList.add('text-danger');
          formMessage.innerText = error.message;
        }
      } else {
        event.stopPropagation();
      } 
      */
    });

    allyForm.appendChild(nameLabel);
    allyForm.appendChild(nameInput);
    allyForm.appendChild(addButton);
    container.appendChild(allyForm);
  });

  main.appendChild(title);
  main.appendChild(buttonsContainer);
  main.appendChild(container);
};

export default AlliesPage;
