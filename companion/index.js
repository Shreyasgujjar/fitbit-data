import * as messaging from "messaging";



// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  const request = new Request('https://672d-128-82-16-2.ngrok.io/', {method: 'POST', body: JSON.stringify(evt.data)});
 
  const URL = request.url;
  const method = request.method;
  const credentials = request.credentials;
  const bodyUsed = request.bodyUsed;
  
  fetch(request)
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Something went wrong on api server!');
    }
  })
  .then(response => {
    console.debug(response);
    // ...
  }).catch(error => {
    console.error(error);
  });
  
  console.log("cmp" + JSON.stringify(evt.data));
}