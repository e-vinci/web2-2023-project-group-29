// Simulation d'une base de données d'utilisateurs ( va être remplacé par notre BD plustard)
const usersDB = [];

// Fonction pour ajouter un utilisateur
const addOneUser = (user) => {
  usersDB.push(user);
  console.log('User added:', user);
};

// Fonction pour lire tous les utilisateurs
const readAllUsers = () => usersDB;

// Fonction pour vérifier la connexion de l'utilisateur
const verifyLogin = (email, password) => {
  // Recherche de l'utilisateur dans la base de données
  const user = usersDB.find((u) => u.email === email && u.password === password);

  if (user) {
    console.log('Login successful:', user);
    return true;
  } 
    console.log('Login failed. Incorrect email or password.');
    return false;
  
};

export { addOneUser, readAllUsers, verifyLogin };
