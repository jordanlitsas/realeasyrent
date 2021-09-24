var renterProfileService = require('../users/renter/renterProfileService')
var propertyService = require('../users/landlord/propertyService')

const accessApplicationWithRenterProfile = async (applicantUserId, applicantPropertyId) => {
    

    console.log(applicantUserId);

    let renterProfile = await renterProfileService.getRenterProfileWithUserId(applicantUserId);
    let benchmarkProfile = await renterProfileService.getRenterProfileWithUserId(applicantUserId);

    console.log(benchmarkProfile)
    console.log(renterProfile);
}

module.exports = {accessApplicationWithRenterProfile}