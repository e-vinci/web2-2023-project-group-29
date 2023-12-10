import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import GamePage  from '../Pages/GamePage';
import RulesPage from '../Pages/RulesPage';
import CreditsPage from '../Pages/CreditsPage';
import PlayPage from '../Pages/PlayPage';
import LeaderboardPage from '../Pages/LeaderboardPage';
import AlliesPage from '../Pages/AlliesPage';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage, 
  '/game': GamePage,
  '/rules': RulesPage,
  '/credits': CreditsPage,
  '/play': PlayPage,
  '/leaderboard': LeaderboardPage,
  '/allies': AlliesPage
};

export default routes;
