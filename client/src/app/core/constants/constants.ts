export const constants = {
  CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apiurl = 'http://localhost:3000/api';

export const apiEndpoint = {
  AuthEndpoint: {
    login: `${apiurl}/user/login`,
  },
  TodoEndpoint: {
    getAllTodo: `${apiurl}/todo`,
    addTodo: `${apiurl}/todo/create`,
    updateTodo: `${apiurl}/todo/`,
  },
};
