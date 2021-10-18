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
            <div class = "row">
                <div class = "col s4">
                    <div class = "row">
                        <img src = "../resources/iconSvg/bathroom-icon.svg" class = "contact-img col s6">
                        <label class = "col s6" style = "padding-left: 0px">${properties[i].bathrooms}</label>
                    </div>
                </div>
                <div class = "col s4" style = "padding-left:0px; border-left:0px; margin-left:0px;">
                    <div class = "row">
                        <img src = "../resources/iconSvg/bedroom-icon.svg" class = "contact-img col s6">
                        <label class = "col s6" style = "padding-left: 0px">${properties[i].bedrooms}</label>
                    </div>
                </div>
                <div class = "col s2"></div>
            </div>
        `
        // cardDescription.appendChild(bathroomSVG)



        document.getElementById('gallery').appendChild(card)
    }
}
