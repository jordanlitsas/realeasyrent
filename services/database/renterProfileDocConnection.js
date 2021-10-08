var schemas = require('./_schemas');
var mongoose = require('mongoose')
const renterProfileModel = mongoose.model('renter_profile', schemas.renterProfile);




const insertRenterProfile = async (renterProfileData)=>{
   
    let renterProfile = new renterProfileModel(renterProfileData);
    let savedRenterProfile = await renterProfile.save();
    return savedRenterProfile;

}

const getRenterProfileWithUserId = async (id) => {

    let renterProfile = await renterProfileModel.findOne({userId: id});
    return renterProfile;
}

const updateRenterProfile = async (updatedRenterProfileData) => {
    let flag = await renterProfileModel.findOneAndUpdate({userId: updatedRenterProfileData.userId}, updatedRenterProfileData, {new: true});
    return flag;
}

const getRenterProfilesMatchingCriteria = async (criteria) => {
   
    let renterProfiles = await renterProfileModel.find(criteria);
    return renterProfiles;
}

module.exports = {insertRenterProfile, getRenterProfileWithUserId, updateRenterProfile, getRenterProfilesMatchingCriteria} 