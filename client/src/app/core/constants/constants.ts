export const constants = {
  CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apiurl = 'http://localhost:3000';

export const apiEndpoint = {
  AuthEndpoint: {
    login: `${apiurl}/api/user/login`,
    register: `${apiurl}/api/user/register`,
  },
  PetEndpoint: {
    getAll: `${apiurl}/pet/all`
  }
};
