const Pizza = require('./pizzas');

async function testPizzaModel() {
  try {
    // Récupérer toutes les entrées de remember_or_die.players
    

    // Afficher les joueurs récupérés
    console.log('Liste des joueurs :');
    console.log(players);

    // Vous pouvez effectuer d'autres opérations avec les données récupérées ici
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
  }
}

// Exécution de la fonction de test
module.exports = testPizzaModel();
