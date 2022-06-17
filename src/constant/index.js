
// const apiURL = 'http://localhost:6622/api/tplus-group/';
const apiURL = 'http://3.86.227.201:6622/api/tplus-group/';
var token= window.localStorage.getItem('token')
const adminHeader = {
   'Content-Type': 'application/json',
   'Authorization': 'Bearer ' + token,
}

export {
   apiURL,
   adminHeader
}

