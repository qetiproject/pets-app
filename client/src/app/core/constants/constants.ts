export const constants = {
  CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apiurl = 'http://localhost:3000';

export const apiEndpoint = {
  AuthEndpoint: {
    login: `${apiurl}/api/user/login`,
    register: `${apiurl}/api/user/register`,
  },
  UserEndpoint: {
    getAllUsers: `${apiurl}/api/user/all`,
    getUserByUsername: (username: string) => `${apiurl}/api/user/${username}`
  },
  PetEndpoint: {
    getAll: `${apiurl}/pet/all`,
    petAdd: `${apiurl}/pet/add`,
    getPetById: (id: string) => `${apiurl}/pet/${id}`,
    updatePetById: (id: string) => `${apiurl}/pet/${id}`,
    deletePetById: (id: string) => `${apiurl}/pet/${id}`
  },
  OwnerEndpoint: {
    getAllOwners: `${apiurl}/owner/all`,
    ownerAdd: `${apiurl}/owner/add`,
    updateOwner: (username: string) => `${apiurl}/owner/${username}`,
    deleteOwnerByUsername: (username: string) => `${apiurl}/owner/${username}`
  }

};
