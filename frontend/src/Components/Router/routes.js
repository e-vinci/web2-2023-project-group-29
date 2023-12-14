import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import GamePage  from '../Pages/GamePage';
import RulesPage from '../Pages/RulesPage';
import CreditsPage from '../Pages/CreditsPage';
import PlayPage from '../Pages/PlayPage';
import WorldPage from '../Pages/WorldPage';
import LeaderboardPage from '../Pages/LeaderboardPage';
import AlliesPage from '../Pages/AlliesPage';
import ProfilPage from '../Pages/ProfilPage';
import levelMapPage from '../Pages/levelMapPage';
import ModifiedProfil from '../Pages/ModifiedProfilPage';


const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/game': GamePage,
  '/rules': RulesPage,
  '/credits': CreditsPage,
  '/play': PlayPage,
  '/world': WorldPage,
  '/leaderboard': LeaderboardPage,
  '/allies': AlliesPage,
  '/profil': ProfilPage,
  '/levelMap':levelMapPage,
  '/modifiedProfil':ModifiedProfil

};

export default routes;
