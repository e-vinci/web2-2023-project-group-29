const STORE_NAME = 'user';
let currentUser;

const getAuthenticatedUser = () => {
if (currentUser)return currentUser;

const serializedUser = sessionStorage.getItem(STORE_NAME);

currentUser = JSON.parse(serializedUser);
return currentUser;
};

const setAuthenticatedUser = (authenticatedUser) => {
    const serializedUser = JSON.stringify(authenticatedUser);
    sessionStorage.setItem(STORE_NAME,serializedUser);

    currentUser = authenticatedUser;
};

const isAuthenticated = () => currentUser !== undefined;

const clearAuthenticatedUser = () => {
  sessionStorage.removeItem(STORE_NAME);
  currentUser = undefined;
};

const setAvatar = (newAvatarPath) => {
  currentUser.avatarPath = newAvatarPath
};

// eslint-disable-next-line object-curly-newline
export { setAvatar,getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser };
