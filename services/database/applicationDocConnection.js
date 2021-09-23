var schemas = require('./_schemas');
var mongoose = require('mongoose')
const activeApplicationModel = mongoose.model('active_applications', schemas.activeApplication);



const insertInitialApplication = async (userId, propertyId) => { 
    if(!propertyId || !userId){
        return false;
    }
    let applicationModel = {
        propertyId: propertyId,
        applicants: []
    }

    applicationModel.applicants.push(userId);

    let propertyApplicationList = new activeApplicationModel( applicationModel );

    let savedApplicationList = await propertyApplicationList.save();
    if (savedApplicationList != null){
        return true;
    } else {
        return false;
    }

}

const addApplication = async (appUserId, appPropertyId) => {
    let applicationListToUpdate = await activeApplicationModel.findOne({propertyId: appPropertyId});
    applicationListToUpdate.applicants.push(appUserId);
    let success = await activeApplicationModel.findOneAndUpdate({propertyID: appPropertyId}, applicationListToUpdate, {new: true});

    if (success) {
        return true;
    } else {
        return false;
    }
}

const getApplications = async (appPropertyId) => {

  let applicantUserIds = await activeApplicationModel.find({propertyId: appPropertyId});
  applicantUserIds = applicantUserIds[0].applicants
  return applicantUserIds;
}

const removeApplicant = async (appUserId, appPropertyId) => {

    let query = {propertyId: appPropertyId};



    let applicationList =  await activeApplicationModel.findOne(query);
    if (!applicationList){
        return false;
    } else if (applicationList.applicants.length == 0){
        return false;
    } 



    let i = 0;
    for (i; i < applicationList.applicants.length; i++){
        if (applicationList.applicants[i] == appUserId){
            applicationList.applicants.splice(i, 1);
        }
    }


    let success = await activeApplicationModel.findOneAndUpdate(query, applicationList, {new: true}); 

    return success;
}

//const updateApplications = (applicationsForProperty) => {
        /*
        applicationsForProperty is equal to  an updated {propertyId: [array of userId that have applied] }
        update the document with corresponding propertyId 
        return true for success, else return false
        */

//}



module.exports = {insertInitialApplication, removeApplicant, getApplications, addApplication}