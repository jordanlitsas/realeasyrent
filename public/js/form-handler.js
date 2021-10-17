import {setUserId} from './env.js'

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("#profile-form-submit-btn").onclick = createUser;
    var form = document.getElementById("user-form");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);
});

const createUser = () => {
    
    let flag = true;
    let firstName = $('#first_name').val();
    let lastName = $('#last_name').val();
    let postcode = $('#postcode').val();
    let email = $('#email').val();
    let password = $('#password').val();

    if (firstName == "" || lastName == "" || postcode == "" || email == "" || password == ""){
        flag = false;
    }
    
    if (flag){
        let userInstance = {
            firstName: firstName,
            lastName: lastName,
            postcode: postcode,
            email: email,
            password: password
        };
    
        $.ajax({
            url: '/user',
              contentType: 'application/json',
              data: JSON.stringify(userInstance), 
              type: 'POST',
              complete: function(xmlHttp){
                console.log(xmlHttp)
                switch(xmlHttp.status){
                    case 200:
                        setUserId(xmlHttp.responseText);
                        top.location.href = '../html/rp-prop.html'
                }
              }, 
              error: function(result){
                    let errorTextNode = document.createTextNode('The email you entered is already being used.')
                    document.getElementById("form-error").innerHTML = "";
                    document.getElementById("form-error").appendChild(errorTextNode)
              }
          })
    }
   
}