/* eslint-disable no-console */
const usersDB = [];


const addOneUser = (user) => {
  usersDB.push(user);
  console.log('User added:', user);
};


const readAllUsers = () => usersDB;


const verifyLogin = (email, password) => {
  const user = usersDB.find((u) => u.email === email && u.password === password);

  if (user) {
    console.log('Login successful:', user);
    return true;
  }

  console.log('Login failed. Incorrect email or password.');
  return false;
};

export { addOneUser, readAllUsers, verifyLogin };
