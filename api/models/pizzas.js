// Exemple de code utilisant la db

const { client } = require('../db_config');

class Pizza {
  static async getAllPizzas() {
    try {
      await client.connect();
      const result = await client.query('SELECT * FROM remember_or_die.players');
      return result.rows;
    } finally {
      client.end();
    }
  }
}

module.exports = Pizza;
