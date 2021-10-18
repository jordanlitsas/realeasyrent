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
        console.log(properties[i])
        let card = propertyCard();
        document.getElementById('gallery').appendChild(card)
    }
}
