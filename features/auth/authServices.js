import {
  saveToken as persistToken,
  getToken as retrieveToken,
  removeStorage,
} from "../../utils/storage";

export const saveToken = (token) => {
  persistToken(token);
};

export const getToken = () => {
  return retrieveToken();
};

export const removeToken = () => {
  removeStorage();
};

export const isAuthenticated = () => {
  return !!getToken();
};
