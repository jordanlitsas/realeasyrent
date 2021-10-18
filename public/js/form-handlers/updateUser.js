

const updateUser = () => {
    
    let firstName = $('#first-name-input').val();
    let lastName = $('#last-name-input').val();
    let postcode = $('#postcode-input').val();
    let email = $('#email-input').val();

    let update = {userUpdate: {_id: sessionStorage.getItem('userId'), firstName: firstName, lastName: lastName, postcode: postcode, email: email}}
  
    console.log(update)
        $.ajax({
            url: '/user',
              contentType: 'application/json',
              data: JSON.stringify(update), 
              type: 'PUT',
              complete: function(xmlHttp){
                console.log(xmlHttp)
                switch(xmlHttp.status){
                    case 200:
                        top.location.href = '../html/home.html'
                }
              }, 
              error: function(result){
                    let errorTextNode = document.createTextNode('The email you entered is already being used.')
                    document.getElementById("form-error").innerHTML = "";
                    document.getElementById("form-error").appendChild(errorTextNode)
              }
          })
    }

export{updateUser}
   

