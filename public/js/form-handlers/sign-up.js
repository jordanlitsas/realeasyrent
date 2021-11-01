import {setUserId} from '../env.js'

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("#profile-form-submit-btn").onclick = createUser;
    
    var form = document.getElementById("form");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);
});

const createUser = () => {
    document.getElementById('form-error').innerHTML = "";
    let flag = true;
    let firstName = $('#first_name').val();
    let lastName = $('#last_name').val();
    let postcode = $('#postcode').val();
    let email = $('#email').val();
    let password = $('#password').val();

    if (firstName == "" || lastName == "" || postcode == "" || email == "" || password == ""){
        return null;
    }

    if (firstName.length < 3){
        document.getElementById('form-error').innerHTML = 'Your first name must be at least two characters.';
        document.getElementById('first_name').style.borderBottom = '1px solid #F44336';
        document.getElementById('first_name').style.boxShadow = '1px solid #F44336';
        return null;
    }
    if (flag){
        let userInstance = {
            firstName: firstName,
            lastName: lastName,
            postcode: postcode,
            email: email,
            password: password
        };
    
        console.log(userInstance)
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
                        top.location.href = '../html/accountconfirmation.html'
                    break;
                    
                    case 400:
                    
                    break;
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
