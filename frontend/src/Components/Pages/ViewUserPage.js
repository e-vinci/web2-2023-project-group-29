import { readAllUsers } from '../../models/users';

const ViewUserPage = () => {
  const main = document.querySelector('main');
  // Créez une div avec l'ID userWrapper
  main.innerHTML = '<div id="userWrapper" class="table-responsive p-5"></div>';

  // Récupérez la div avec l'ID userWrapper
  const userWrapper = document.querySelector('#userWrapper');

  // Lisez tous les utilisateurs depuis la base de données
  const users = readAllUsers();

  // Si aucun utilisateur n'est trouvé, affichez un message
  if (!users || users.length === 0) {
    userWrapper.innerHTML = '<p class="p-5">Aucun utilisateur inscrit pour le moment :( </p>';
    return;
  }

  // Créez une table avec les utilisateurs
  const htmlUserTable = `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nom d'utilisateur</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        ${getHtmlRows(users)}
      </tbody>
    </table>`;

  // Injectez le code HTML dans la div userWrapper
  userWrapper.innerHTML = htmlUserTable;
};

// Fonction pour générer les lignes de la table en fonction des utilisateurs
function getHtmlRows(users) {
  let htmlRows = '';
  users.forEach((user) => {
    htmlRows += `
      <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
      </tr>
    `;
  });

  return htmlRows;
}

export default ViewUserPage;
