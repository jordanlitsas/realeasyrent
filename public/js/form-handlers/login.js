import {setUserId} from '../env.js'

window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("#user-login-submit-btn").onclick = loginUser;
    
    var form = document.getElementById("form");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);
});

const loginUser = () => {
 
    let flag = true;
    let email = $('#email').val();
    let password = $('#password').val();
    
    if (email == "" || password == ""){
        flag = false;
    }
    
    if (flag){
        
        let userData = {
            operator: "personalInfoQuery",
            query: {email: email}
        };
        
        $.ajax({
            url: '/user',
              contentType: 'application/json',
              data: userData, 
              type: 'GET',
              complete: function(xmlHttp){
                console.log(xmlHttp)
                switch(xmlHttp.status){
                    case 200:
                        let user = xmlHttp.responseJSON;
                        if (user.password == password){
                            setUserId(user._id);
                            top.location.href = '../html/home.html'
                        } 
                        
                }
              }
             
          })
    }
}