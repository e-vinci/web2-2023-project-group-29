import HomePage from '../Pages/HomePage';
<<<<<<< HEAD
import NewPage from '../Pages/NewPage';
import levelPage from '../Pages/levelPage';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/new': NewPage,
  '/levelPage': levelPage,
=======
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import GamePage  from '../Pages/GamePage';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage, 
  '/game':GamePage
>>>>>>> dev
};

export default routes;
