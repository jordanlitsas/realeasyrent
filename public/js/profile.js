import {renterProfileForm} from './htmlResources.js'
import {createRenterProfile} from './form-handlers/renterProfile.js'
window.addEventListener('DOMContentLoaded', (event) => {
    
    initiateInstanceVariables();
    document.getElementById('update-user').onclick = updateUser;
    document.getElementById('create-rp-btn').onclick = showRpForm;
  
    

});

const showRpForm = () => {
    document.getElementById("form-container").innerHTML = renterProfileForm();
    document.querySelector("#renter-profile-submit-btn").onclick = createRenterProfile;

    var form = document.getElementById("form");
    function handleForm(event) { event.preventDefault();} 
    form.addEventListener('submit', handleForm);
}

const updateUser = async () => {

    await $.ajax({
        async: true,
        url: '/user',
        contentType: 'application/json',
        data: null,
        type: 'put',
        success: function(result){
            user = result;
        }     
    })
}



const initiateInstanceVariables = async () => {


    //query user doc with userId
    let userId = sessionStorage.getItem('userId');
    let userQuery = {
        operator: 'userId',
        query: userId
    };

    let user;
    await $.ajax({
        async: true,
        url: '/user',
        contentType: 'application/json',
        data: userQuery,
        type: 'get',
        success: function(result){
            user = result;
        }     
    })

    document.getElementById('heading').innerHTML = `${user.firstName}'s  Profile`;
    document.getElementById('first-name').innerHTML = `${user.firstName}`;
    document.getElementById('last-name').innerHTML = `${user.lastName}`;
    document.getElementById('postcode').innerHTML = `${user.postcode}`;
    document.getElementById('email').innerHTML = `${user.email}`;

}

