import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import GamePage  from '../Pages/GamePage';
import RulesPage from '../Pages/RulesPage';
import CreditsPage from '../Pages/CreditsPage';
import PlayPage from '../Pages/PlayPage';
import WorldPage from '../Pages/WorldPage';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage, 
  '/game': GamePage,
  '/rules': RulesPage,
  '/credits': CreditsPage,
  '/play': PlayPage,
  '/world': WorldPage
};

export default routes;
