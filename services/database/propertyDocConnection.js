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

const getPropertiesWithUserId = async (ownersUserId) => {
    let properties = await propertyModel.find({userId: ownersUserId});
    return properties;
}

const getPropertyWithPropertyId = async (ownersPropertyId) => {
    let property = await propertyModel.findById(ownersPropertyId);
    return property;
}

const getPropertiesWithCriteria = async (propertyCriteria) => {
    let properties = await propertyModel.find(propertyCriteria);
    return properties;
}

const updateProperty = async (propertyUpdate) => {
    let flag = await propertyModel.findOneAndUpdate({propertyId: propertyUpdate._id}, propertyUpdate, {new: true});
    return flag;
}

const deleteProperty = async (propertyId) => {
    let flag = await propertyModel.findByIdAndDelete(propertyId);
    return flag;
}

module.exports = {insertProperty, getPropertiesWithUserId, getPropertyWithPropertyId, getPropertiesWithCriteria, updateProperty, deleteProperty}