
const createRenterProfile = async () => {
    let employer = $('#employer_name').val();
    let lengthofemployment = $('#lengthofemployment').val();
    let position = $('#position').val();
    let monthlyIncome = $('#monthly_income').val();

    let personalRefName = $('#ref_name').val();
    let personalRefPhone = $('#phnumber').val();
    let personalRefEmail = $('#ref_email').val();
    let personalRefRelationship = $('#personalrefrelationship').val();

    let professionalReferenceName = $('#pro_name').val();
    let professionalRefPhone = $('#pro_phnumber').val();
    let professionalRefEmail = $('#pro_email').val();
    let professionalRefRelationship = $('#personalprorelationship').val();

    let petSpecies = $('#pet_species').val();
    let pedBreed = $('#pet_breed').val();
    let petSize = $('#pet_size').val();
    let petAge = $('#pet_age').val();

    let previousRentalAddress = $('#prev_address').val();
    let previousLandlordName = $('#prev_landlord_name').val();
    let previousLandlordEmail = $('#previous_landlord_email').val();
    let previousLandlordPhone = $('#prev_landlord_phone').val();
    let previousLeaseStartDate = $('#prev_lease_start').val();
    let previousLeaseEndDate = $('#prev_lease_end').val();
    let previousRentalEvicted = $('#prev_lease_evicted').val();
    let previousLeaseBroken = $('#prev_lease_broken').val();
    
    let criminalRecord = $('#criminal_record').val();
    let preferredMoveInDate = $('#moveindate').val();


}
export{createRenterProfile};