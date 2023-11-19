import { readAllUsers } from '../../models/users'; // Assurez-vous d'importer correctement la fonction readAllUsers

const ViewUserPage = () => {
  const main = document.querySelector('main');
  main.innerHTML = '<div id="userWrapper" class="table-responsive p-5"></div>';

  const userWrapper = document.querySelector('#userWrapper');

  const users = readAllUsers();
  if (!users || users.length === 0) {
    userWrapper.innerHTML = '<p class="p-5">Aucun utilisateur inscrit pour le moment : (</p>';
    return;
  }

  const htmlUserTable = `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nom d'utilisateur</th>
          <th scope="col">Email</th>
          <!-- Ajoutez d'autres colonnes si nécessaire -->
        </tr>
      </thead>
      <tbody>
        ${getHtmlRows(users)}
      </tbody>
    </table>`;

  userWrapper.innerHTML = htmlUserTable;
};

function getHtmlRows(users) {
  let htmlRows = '';
  users.forEach((user) => {
    htmlRows += `
      <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <!-- Ajoutez d'autres colonnes si nécessaire -->
      </tr>
    `;
  });

  return htmlRows;
}

export default ViewUserPage;
