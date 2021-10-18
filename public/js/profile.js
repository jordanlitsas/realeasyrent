import {renterProfileForm, propertyForm} from './htmlResources.js'
import {createRenterProfile} from './form-handlers/renterProfile.js'
import { createProperty } from './form-handlers/property.js';
import { updateUser } from './form-handlers/updateUser.js'


window.addEventListener('DOMContentLoaded', (event) => {
    
    initiateInstanceVariables();
    document.getElementById('update-user-btn').onclick = showUpdateUserForm;
    document.getElementById('create-rp-btn').onclick = showRpForm;
    document.getElementById('create-property-btn').onclick = showPropertyForm;
  
    

});

const showRpForm = () => {
    document.getElementById("form-container").innerHTML = renterProfileForm();
    document.querySelector("#renter-profile-submit-btn").onclick = createRenterProfile;

    var form = document.getElementById("form");
    function handleForm(event) { event.preventDefault();} 
    form.addEventListener('submit', handleForm);
}

const showPropertyForm = () => {
    document.getElementById("form-container").innerHTML = propertyForm();
    document.querySelector("#property-submit-btn").onclick = createProperty;

    var form = document.getElementById("form");
    function handleForm(event) { event.preventDefault();} 
    form.addEventListener('submit', handleForm);
}

const showUpdateUserForm = async () => {
        
    let updateUserBtn = document.createElement('button');
    updateUserBtn.classList.add('btn');
    updateUserBtn.innerHTML = "Submit";
    updateUserBtn.id = "update-user-submit-btn";

    document.getElementById('update-user-submit-btn-container').appendChild(updateUserBtn);

    updateUserBtn.addEventListener('click', updateUser);

    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name');
    let postcode = document.getElementById('postcode');
    let email = document.getElementById('email');

    let firstNameInput = document.createElement('input');
    let lastNameInput = document.createElement('input');
    let postcodeInput = document.createElement('input');
    let emailInput = document.createElement('input');

    firstNameInput.classList.add('input-field');
    lastNameInput.classList.add('input-field');
    postcodeInput.classList.add('input-field');
    emailInput.classList.add('input-field');

    firstNameInput.id = 'first-name-input';
    lastNameInput.id = 'last-name-input';
    emailInput.id = 'email-input';
    postcodeInput.id = 'postcode-input';

    firstNameInput.placeholder = firstName.innerHTML;
    firstName.innerHTML = "";
    firstName.appendChild(firstNameInput)

    lastNameInput.placeholder = lastName.innerHTML;
    lastName.innerHTML = "";
    lastName.appendChild(lastNameInput)

    postcodeInput.placeholder = postcode.innerHTML;
    postcode.innerHTML = "";
    postcode.appendChild(postcodeInput)

    emailInput.placeholder = email.innerHTML;
    email.innerHTML = "";
    email.appendChild(emailInput)

   
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

