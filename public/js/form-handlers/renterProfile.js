
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
    let previousLeaseLength = $('#prev_lease_length').val();
    let previousRentalEvicted = $('#prev_lease_evicted').is(':checked');
    let previousLeaseBroken = $('#prev_lease_broken').is(':checked');
    
    let criminalRecord = $('#criminal_record').is(':checked');
    let preferredMoveInDate = $('#moveindate').val();
    let children = $('#children').val();
    let smoker = $('#smoker').is(':checked');

    let renterProfile = {renterProfileData: {
                            userId: sessionStorage.getItem('userId'),
                            employment: {
                                employer: employer,
                                lengthOfEmployment: lengthofemployment,
                                position: position, 
                                monthlyIncome: monthlyIncome
                            },
                            personalReferences: [
                                {
                                    name: personalRefName,
                                    contactNumber: personalRefPhone,
                                    email: personalRefEmail,
                                    relationship: personalRefRelationship
                                }
                            ],
                            professionalReferences: [
                                {
                                    name: professionalReferenceName,
                                    contactNumber: professionalRefPhone,
                                    email: professionalRefEmail,
                                    relationship: professionalRefRelationship
                                }
                            ],
                            pets: [
                                {
                                    species: petSpecies,
                                    breed: pedBreed,
                                    size: petSize,
                                    age: petAge
                                }
                            ], 
                            children: children,
                            rentalHistory: 
                                {            
                                    property: {
                                    address: previousRentalAddress,
                                    landlordName: previousLandlordName,
                                    landlordEmail: previousLandlordEmail,
                                    landlordContactNumber: previousLandlordPhone,
                                    lengthOfTenancy: previousLeaseLength,
                                    evicted: previousRentalEvicted,
                                    rentalAgreementBroken: previousLeaseBroken
                                }
                                    
                                }
                            ,
                            smoker: smoker,
                            preferredMoveInDate: preferredMoveInDate,
                            committedOfCrime: criminalRecord
                            }
    }
    
    console.log(renterProfile);


    $.ajax({
        url: '/renter_profile',
          contentType: 'application/json',
          data: JSON.stringify(renterProfile), 
          type: 'POST',
          complete: function(xmlHttp){
            console.log(xmlHttp)
            if (xmlHttp.status == 200){
                top.location.href = './propertylisting.html'
            }
          }, 
          error: function(result){
            
          }
      })


}
export{createRenterProfile};