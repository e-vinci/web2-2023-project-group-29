import HomePage from '../Pages/HomePage';
import levelPage from '../Pages/levelPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
// eslint-disable-next-line import/no-named-as-default
import GamePage  from '../Pages/GamePage';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/login': LoginPage,
  '/register': RegisterPage, 
  '/levelPage': levelPage,
};

export default routes;
