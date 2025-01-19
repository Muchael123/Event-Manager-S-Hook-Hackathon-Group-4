var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer YOUR_JWT_TOKEN_HERE");

var formdata = new FormData();
formdata.append("file", fileInput.file[0]); 

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("http://localhost:3001/api/v1/events", requestOptions)
  .then(response => response.json())  // assuming the server responds with JSON
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
