
const apiURL = 'http://localhost:6622/api/tplus-group/';

const adminHeader = {
   'Content-Type': 'application/json',
   'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
}

export {
   apiURL,
   adminHeader,
}

