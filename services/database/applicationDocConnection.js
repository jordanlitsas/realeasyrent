var schemas = require('./_schemas');
var mongoose = require('mongoose')
const activeApplicationModel = mongoose.model('active_applications', schemas.activeApplication);



const insertInitialApplication = async (appUserId, appPropertyId) => { 
    let existingApplicationList = await activeApplicationModel.findOne({propertyId: appPropertyId});
    if (existingApplicationList != null){
        return false;
    }

    if(!appPropertyId || !appUserId){
        return false;
    }
    let applicationModel = {
        propertyId: appPropertyId,
        applicants: []
    }

    applicationModel.applicants.push(appUserId);

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

    let flag = true;
    applicationListToUpdate.applicants.forEach(userId => {
        if (userId == appUserId){
            flag = false;
        }
    })

    if (!flag){
        return false;
    }


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

const removeProperty = async (appPropertyId) => {
    let success = await activeApplicationModel.findOneAndDelete({propertyId: appPropertyId});
    return success;
}


module.exports = {insertInitialApplication, removeApplicant, removeProperty, getApplications, addApplication}