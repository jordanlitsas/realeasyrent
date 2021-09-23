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

const getPropertyWithUserId = async (ownersUserId) => {
    let property = propertyModel.findOne({userId: ownersUserId});
    return property;
}

const getPropertyWithPropertyId = async (ownersPropertyId) => {
    let property = propertyModel.findById(ownersPropertyId);
    return property;
}

const getPropertiesWithCriteria = async (propertyCriteria) => {
    let properties = propertyModel.find(propertyCriteria);
    return properties;
}

const updateProperty = async (propertyUpdate) => {
    try {
        let success = await propertyModel.findOneAndUpdate({propertyId: propertyUpdate._id}, propertyUpdate, {new: true});
        if (success) {
            return true;
        } else {
            return false;
        }
    }
    catch{
        return false;
    }
    
}

const deleteProperty = async (propertyId) => {
    let success = propertyModel.findByIdAndDelete(propertyId);
    return success;
}

module.exports = {insertProperty, getPropertyWithUserId, getPropertyWithPropertyId, getPropertiesWithCriteria, updateProperty, deleteProperty}