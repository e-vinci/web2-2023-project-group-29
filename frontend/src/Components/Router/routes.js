import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import GamePage  from '../Pages/GamePage';
import RulesPage from '../Pages/RulesPage';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage, 
  '/game': GamePage,
  '/rules': RulesPage
};

export default routes;
