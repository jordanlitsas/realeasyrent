var schemas = require('./_schemas');
var mongoose = require('mongoose')
const activeApplicationModel = mongoose.model('active_applications', schemas.activeApplication);



const insertInitialApplication = async (application) => { 
    


    let newApplication = new activeApplicationModel( application );
    let success = await newApplication.save();
    return success;


    

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

  let applications = await activeApplicationModel.findOne({propertyId: appPropertyId});
  return applications;
}

const removeApplicant = async (appUserId, appPropertyId) => {

    let applicationList =  await activeApplicationModel.findOne({propertyId: appPropertyId});

    let i = 0;
    for (i; i < applicationList.applicants.length; i++){
        if (applicationList.applicants[i].userId == appUserId){
            applicationList.applicants.splice(i, 1);
        }
    }

    let success = await activeApplicationModel.findOneAndUpdate({propertyId: appPropertyId}, applicationList, {new: true}); 
    return success;
}

const removeProperty = async (appPropertyId) => {
    let success = await activeApplicationModel.findOneAndDelete({propertyId: appPropertyId});
    return success;
}

const updateApplication = async (appUpdate) => {
    let success = await activeApplicationModel.findOneAndUpdate({propertyId: appUpdate.propertyId}, appUpdate, {new: true});
    return success;
}


module.exports = {insertInitialApplication, removeApplicant, removeProperty, getApplications, addApplication, updateApplication}