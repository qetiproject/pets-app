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
    getAll: `${apiurl}/pet/all`,
    petAdd: `${apiurl}/pet/add`,
    getPetById: (id: string) => `${apiurl}/pet/${id}`,
    updatePetById: (id: string) => `${apiurl}/pet/${id}`,
    deletePetById: (id: string) => `${apiurl}/pet/${id}`
  }
};
