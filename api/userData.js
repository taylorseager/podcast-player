import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUserIDByUID = (uid) => {
    return fetch(`${endpoint}/checkUser/${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user ID');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching user ID:', error);
    });
};
  
export { getUserIDByUID }