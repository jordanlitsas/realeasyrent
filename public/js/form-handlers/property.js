import {setPropertyId} from './applicationRequirements.js'

const createProperty = async () => {
    
    let userId = sessionStorage.getItem('userId');
    let availableDate = $('#date_available').val();
    let bathrooms = $('#bathrooms').val();
    let bedrooms = $('#bedrooms').val();
    let addressNumber = $('#address_number').val();
    let addressName = $('#address_name').val();
    let postcode = $('#prop_postcode').val();
    let state = $('#state').val();
    let propertyType = $('#property_type').val();
    let suburb = $('#suburb').val();
    let rentAmount = $('#rent_amount').val();
    let rentFrequency = $('#rent_frequency').val();
    let marketValue = $('#market_value').val();
    let indoorFeatures = $('#indoor_features').val();
    let outdoorFeatures = $('#outdoor_features').val();
    let hvac = $('#hvac').val();
    let energyLevels = $('#energy_levels').val();
    let nbn = $('#nbn').val();
    let demographics = $('#demographics').val();
    let parking = $('#parking').val();
    let pets = $('#pets_allowed').is(':checked');
    let walkingCommuteProfile = $('#walking_commute_profile').val();
    let drivingCommuteProfile = $('#driving_commute_profile').val();
    let ptCommuteProfile = $('#pt_commute_profile').val();
    let keywords = $('#keywords').val();
    let image = $('#image_file');


    let newProperty = { property: {
        userId: userId,
        availabledate: availableDate, 
        bathrooms: bathrooms,
        bedrooms: bedrooms,
        commuteProfile: {
            drive: drivingCommuteProfile,
            publicTransport: ptCommuteProfile,
            walk: walkingCommuteProfile
        },
        demographics: demographics,
        energyLevels: energyLevels,
        hvac: hvac,
        housingType: propertyType,
        indoorFeatures: indoorFeatures,
        keywords: keywords,
        marketValue: marketValue,
        nbn: nbn,
        outdoorFeatures: outdoorFeatures,
        parking: parking,
        petsAllowed: pets,
        addressNumber: addressNumber,
        addressName: addressName,        
        postcode: postcode,
        stateOrTerritory: state,
        rentAmount: rentAmount,
        rentFrequency: rentFrequency,
        suburb: suburb,
        image: image
    }}
    


    $.ajax({
        url: '/property',
          contentType: 'application/json',
          data: JSON.stringify(newProperty), 
          type: 'POST',
          complete: function(xmlHttp){
            console.log(xmlHttp)
            if (xmlHttp.status == 200){
                let id = xmlHttp.responseText;
                setPropertyId(id);
                console.log(id)
                console.log(xmlHttp)
                // top.location.href = './application_requirements.html';
            }
          }, 
          error: function(result){
            
          }
      }) 
     



}
export{createProperty};

