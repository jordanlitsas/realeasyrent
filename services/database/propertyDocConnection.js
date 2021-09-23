var schemas = require('./_schemas');
var mongoose = require('mongoose')
const propertyModel = mongoose.model('propertie', schemas.property);

const insertProperty = async (newProperty) => {
    if(!newProperty){
        return null;
    }

    let existingListing = await propertyModel.findOne({streetNumberAndName: newProperty.streetNumberAndName, postcode: newProperty.postcode});

    if (existingListing == null){

        const property = new propertyModel(newProperty);
        let savedListing = await property.save();
        if (savedListing == property){
            let propertyId = property._id.toString();
            return propertyId;
        }
        else {
            return null;
        }
        
    } 
    else {
        return null;
    }    
  
}

module.exports = {insertProperty}