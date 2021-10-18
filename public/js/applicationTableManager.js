window.addEventListener('DOMContentLoaded', (event) => {
   populateApplicationTable();
});


const populateApplicationTable = () => {

    $.ajax({
        url: '/active_application',
          contentType: 'application/json',
          data: JSON.stringify(userInstance), 
          type: 'GET',
          complete: function(xmlHttp){
            console.log(xmlHttp)
            switch(xmlHttp.status){
                case 200:
                    setUserId(xmlHttp.responseText);
                    top.location.href = '../html/accountconfirmation.html'
            }
          }, 
          error: function(result){
                let errorTextNode = document.createTextNode('The email you entered is already being used.')
                document.getElementById("form-error").innerHTML = "";
                document.getElementById("form-error").appendChild(errorTextNode)
          }
      })
}