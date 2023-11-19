import { removePathPrefix, usePathPrefix } from '../../utils/path-prefix';
import routes from './routes';

const Router = () => {
  onFrontendLoad();
  changePage();
  onHistoryChange();
};

function changePage() {
  const doc = document.querySelector('html');

  doc.addEventListener('click', (e) => {
    e.preventDefault();
    const itemClicked = e.target;
    const uri = itemClicked?.dataset?.uri;
    if (uri) {
      const componentToRender = routes[uri];
      if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);

      componentToRender();
      window.history.pushState({}, '', usePathPrefix(uri));
    }
  });
}

function onHistoryChange() {
  window.addEventListener('popstate', () => {
    const uri = removePathPrefix(window.location.pathname);
    const componentToRender = routes[uri];
    componentToRender();
  });
}

function onFrontendLoad() {
  window.addEventListener('load', () => {
    const uri = removePathPrefix(window.location.pathname);
    const componentToRender = routes[uri];
    if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);

    componentToRender();
  });
}

export default Router;
