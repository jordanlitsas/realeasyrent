// import {propertyCard} from '../js/htmlResources.js';

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

const applyForProperty = async (id) => {

    let addressArr = id.split("-");
    
    let queryBody = {
        operator: "criteria",
        query: {
            addressNumber: addressArr[0],
            addressName: addressArr[1],
            postcode: addressArr[2]
        }
    };

    let propertyToApplyFor;
    await $.ajax({
        async: true,
        url: '/property',
        contentType: 'application/json',
        data: queryBody,
        type: 'GET',
        complete: function(xmlHttp){
            if (xmlHttp.status == 200){
                propertyToApplyFor = xmlHttp.responseJSON;
            }
           
        }     
    })

    let propertyId = propertyToApplyFor[0]._id.toString();

    queryBody = {
        operator: "propertyId",
        query: propertyId
    }

    let updateApplications = true;

    await $.ajax({
        async: true,
        url: '/application',
        contentType: 'application/json',
        data: queryBody,
        type: 'GET',
        complete: function(xmlHttp){
            if(xmlHttp.status == 204){
                updateApplications = false;  
            } 
           
        }     
    })

    queryBody = {
        userId: sessionStorage.getItem('userId'),
        propertyId: propertyId
    }

    if (updateApplications){
        await $.ajax({
                async: true,
                url: '/application',
                contentType: 'application/json',
                data: JSON.stringify(queryBody),
                type: 'PUT',
                complete: function(xmlHttp){
                    document.getElementById(id).classList.add('has-applied');
                    document.getElementById(id).innerHTML = "Applied";
                }     
            })
    } else {
        await $.ajax({
                async: true,
                url: '/application',
                contentType: 'application/json',
                data: JSON.stringify(queryBody),
                type: 'POST',
                complete: function(xmlHttp){
                    document.getElementById(id).classList.add('has-applied');
                    document.getElementById(id).innerHTML = "Applied";
                }     
            })
    }
  

    
  
             

}

const fillPropertyCards = async (properties) => {
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

        //check if the user has applied for this property. Grey out and disable the apply button if so.

        let queryBody = {
            operator: "criteria",
            query: {
                addressNumber: properties[i].addressNumber,
                addressName: properties[i].addressName,
                postcode: properties[i].postcode
            }
        };
        let propertyId;
        await $.ajax({
            async: true,
            url: '/property',
            contentType: 'application/json',
            data: queryBody,
            type: 'GET',
            complete: function(xmlHttp){
               propertyId = xmlHttp.responseJSON[0]._id.toString();
               
            }     
        })

        queryBody.operator = "propertyId";
        queryBody.query = propertyId;
        
        let hasApplied = false;
        await $.ajax({
            async: true,
            url: '/application',
            contentType: 'application/json',
            data: queryBody,
            type: 'GET',
            complete: function(xmlHttp){
                applicantList = xmlHttp.responseJSON.applicants.forEach(applicant => {
                    if(sessionStorage.getItem('userId') == applicant.userId){
                        hasApplied = true;
                    }
                })
            }     
        })

        if (hasApplied){
            cardDescription.innerHTML = `

            <div class = "row compact">
            <div class = "col s12 compact">
                <div class = "row compact">
                    <p class = "compact">${properties[i].addressNumber} ${properties[i].addressName}, ${properties[i].suburb}, ${properties[i].postcode}</p>
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
                <button type = "button" class = "btn apply-btn compacts has-applied" id = "${properties[i].addressNumber}-${properties[i].addressName}-${properties[i].postcode}">Applied</button>
            </div>
        </div>
    `
        } else {
            cardDescription.innerHTML = `

            <div class = "row compact">
            <div class = "col s12 compact">
                <div class = "row compact">
                    <p class = "compact">${properties[i].addressNumber} ${properties[i].addressName}, ${properties[i].suburb}, ${properties[i].postcode}</p>
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
                <button type = "button" class = "btn apply-btn compacts" onclick='applyForProperty(this.attributes["id"].value)' id = "${properties[i].addressNumber}-${properties[i].addressName}-${properties[i].postcode}">Apply</button>
            </div>
        </div>
    `
        }

        // cardDescription.appendChild(bathroomSVG)



        document.getElementById('gallery').appendChild(card)
    }
}


const propertyCard = () => {
    let firstDiv = document.createElement('div');
    firstDiv.classList = 'col s12 m3 14 compact';
  
    let secondDiv = document.createElement('div');
    secondDiv.classList = 'card grey-blue compact';
  
    let thirdDiv = document.createElement('div');
    thirdDiv.classList = 'card-image waves-effect waves-block waves-light compact';
  
    let aTag = document.createElement('a');
  
    let img = document.createElement('img');
    img.width = 305;
    img.height = 229;
    img.classList = 'responsive-img wp-post-image';
    img.loading = 'lazy';
    img.sizes = "(max-width: 305px) 100vw, 305px";
  
    let titleSpan = document.createElement('span');
    titleSpan.classList = 'card-title home';
  
    let descriptionDiv = document.createElement('div');
    descriptionDiv.classList = 'card-action compact';
    
  
    aTag.appendChild(img);
    aTag.appendChild(titleSpan);
  
    thirdDiv.appendChild(aTag);
    secondDiv.appendChild(thirdDiv);
    secondDiv.appendChild(descriptionDiv);
    firstDiv.appendChild(secondDiv);
    return firstDiv;
  }
  