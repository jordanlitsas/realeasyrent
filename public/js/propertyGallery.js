import {propertyCard} from '../js/htmlResources.js';

window.addEventListener('DOMContentLoaded', (event) => {
    
    getProperties();

});



const getProperties = async () => {
    let properties;
    let propertyQuery = {operator: "criteria", query: {postcode: {$gt: 0}}};
    await $.ajax({
        async: true,
        url: '/property',
        contentType: 'application/json',
        data: propertyQuery,
        type: 'GET',
        complete: function(xmlHttp){
            console.log(xmlHttp)
            if (xmlHttp.status == 200){
                properties = xmlHttp.responseJSON;
                fillPropertyCards(properties);
            }
        }     
    })
}

const fillPropertyCards = (properties) => {
    let i = 0;
    for (i; i < properties.length; i++){
        // console.log(properties[i])
        let card = propertyCard();
        let cardDescription = card.firstElementChild.childNodes[1];


        //handle bathroom images
        let bathroomSVG = document.createElement('img');
        bathroomSVG.src = '../resources/iconSvg/bathroom-icon.svg';
        bathroomSVG.classList.add('contact-img')

        console.log(properties[i])
        cardDescription.innerHTML = `

                <div class = "row compact">
                <div class = "col s12 compact">
                    <div class = "row compact">
                        <p class = "compact">${properties[i].suburb}, ${properties[i].postcode}</p>
                        </p>
                    </div>
                </div>
               
            </div>


            <div class = "row compact icon-row">
                <div class = "col s4 compact">
                    <div class = "row compact">
                        <img src = "../resources/iconSvg/bathroom-icon.svg" class = "contact-img col s6 compact">
                        <label class = "col s6 compact" s>${properties[i].bathrooms}</label>
                    </div>
                </div>
                <div class = "col s4 compact" >
                    <div class = "row compact">
                        <img src = "../resources/iconSvg/bedroom-icon.svg" class = "contact-img col s6 compact">
                        <label class = "col s6 compact">${properties[i].bedrooms}</label>
                    </div>
                </div>
                <div class = "col s4 compact">
                    <button type = "button" class = "btn  apply-btn compacts">Apply</button>
                </div>
            </div>

          
        `
        // cardDescription.appendChild(bathroomSVG)



        document.getElementById('gallery').appendChild(card)
    }
}
