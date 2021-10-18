export const renterProfileForm = () => {
    return `<div>
    <form class="col s12" id = "form">
        <!-- employment  -->
        <h6 class="center ">Employment Details</h6>
    <div class="row">
      <div class="row">
        <div class="input-field col s12 ">
          <input id="employer_name" type="text" class="validate " >
          <label for="employer_name">Employer</label>
        </div>
        <div class="input-field col s6">
            <input id="lengthofemployment" type="text" class="validate " >
            <label for="lengthofemployment">How long have you been employed with them?</label>
        </div>
        <div class="input-field col s6">
            <input id="position" type="text" class="validate " >
            <label for="position">My position</label>
        </div>
        <div class="input-field col s12">
            <input id="monthly_income" type="number" class="validate " >
            <label for="monthly_income">Monthly Income</label>
        </div>
        <!-- Personal reference  -->
        <h6 class="center ">Personal Reference</h6>
        <div class="input-field col s6">
            <input id="ref_name" type="text" class="validate " >
            <label for="ref_name">Reference Name</label>
        </div>
        <div class="input-field col s6">
            <input id="phnumber" type="number" class="validate " >
            <label for="phnumber">Contact Number</label>
        </div>
        <div class="input-field col s6">
              <input id="ref_email" type="email" class="validate " >
              <label for="ref_email">Reference Email</label>
        </div>
        <div class="input-field col s6">
              <input id="personalrefrelationship" type="text" class="validate " >
              <label for="personalrefrelationship">Relationship with Reference</label>
        </div>
        
          <!-- Professional reference  -->
        <h6 class="center ">Professional Reference</h6>
        <div class="input-field col s6 ">
            <input id="pro_name" type="text" class="validate " >
            <label for="pro_name">Reference Name</label>
        </div>
        <div class="input-field col s6 ">
            <input id="pro_phnumber" type="number" class="validate " >
            <label for="pro_phnumber">Contact Number</label>
        </div>
        <div class="input-field col s6">
              <input id="pro_email" type="email" class="validate " >
              <label for="pro_email">Reference Email</label>
        </div>
        <div class="input-field col s6">
              <input id="personalprorelationship" type="text" class="validate " >
              <label for="personalprorelationship">Relationship with Reference</label>
        </div>
          <!-- pets  -->
        <h6 class="center ">Pets</h6>
        <div class="input-field col s6">
            <input id="pet_species" type="text" >
            <label for="pet_species">Species</label>
        </div>
        <div class="input-field col s6">
            <input id="pet_breed" type="text" >
            <label for="pet_breed">Breed</label>
        </div>
        <div class="input-field col s6">
              <input id="pet_size" type="text" >
              <label for="pet_size">Size</label>
        </div>
        <div class="input-field col s6">
              <input id="pet_age" type="number" >
              <label for="pet_age">Age</label>
        </div>
        <!-- rentalHistory  -->
        <h6 class="center ">Previous Rental History</h6>
        <div class="input-field col s6">
            <input id="prev_address" type="text" class="validate " >
            <label for="prev_address">Address</label>
        </div>
        <div class="input-field col s6">
            <input id="prev_landlord_name" type="number" class="validate " >
            <label for="prev_landlord_name">Landlords Name</label>
        </div>
        <div class="input-field col s6">
              <input id="previous_landlord_email" type="email" class="validate " >
              <label for="previous_landlord_email">Landlords Email</label>
        </div>
        <div class="input-field col s6">
              <input id="prev_landlord_phone" type="text" class="validate " >
              <label for="prev_landlord_phone">Landlords contact number</label>
        </div>
        <div class="input-field col s6">
          <input class="" id="prev_lease_start" type="date" class="validate " >
          <label  for="prev_lease_start">Length of tenancy - Start date</label>
        </div>
        <div class="input-field col s6">
          <input class="" id="prev_lease_end" type="date" class="validate " >
          <label for="prev_lease_end">Length of tenancy - End date</label>
        </div>

        <div class = "row">
          <div class = "col s4">
            <p>
              <label>
                <input type="checkbox" id = "prev_lease_broken"/>
                <span>Was your previous rental agreement broken?</span>
              </label>
            </p>
          </div>
          <div class = "col s4">
            <p>
              <label>
                <input type="checkbox" id = "prev_lease_evicted"/>
                <span>Were you evicted?</span>
              </label>
            </p>
          </div>
          <div class = "col s4">    
          <p>
            <label>
              <input type="checkbox" id = "criminal_record"/>
              <span>Do you have a criminal record?</span>
            </label>
          </p>
          </div>
        </div>

       
      
        
        <div class="input-field col s6">
          <input  class="" id="moveindate" type="date" class="validate " ">
          <label for="moveindate">Preferred date of move-in</label>
        </div>
       
       

        <div class = "row">
            <div class = "col s12">
            <button class="btn waves-effect waves-light dark-blue" type="button" name="action" id = "renter-profile-submit-btn" style = "width: 100%;">
                Submit
            </button></div>
          
        </div>
    </div>`;
}

export const propertyForm = () => {
    return `
          
                   <!-- Form for Property Listing  -->
                  <div class="row ">
                      <form class="col s12 form">
                          <!-- Applicant Criteria  -->
                          <h6 class="center ">Applicant Criteria</h6>
                      <div class="row">
                        <div class="row">
                          <p class="center">
                            <label class="center">
                              <input type="checkbox" class="filled-in" id="criminalrecbox" />
                              <span for="criminalrecbox" class="">Non-Flexible</span>
                            </label>
                            <label class="center">
                              <input type="checkbox" class="filled-in grey-text" id="filled-in-box" />
                              <span for="filled-in-box" class="">Flexible</span>
                            </label>
                          </p>
                          <div class="input-field col s4">
                              <input id="Category" type="text" class="validate " >
                              <label for="Category">Category</label>
                          </div>
                          <div class="input-field col s4">
                              <input id="Benchmark" type="text" class="validate " >
                              <label for="Benchmark">Benchmark</label>
                          </div>
                          <div class="input-field col s4">
                              <input id="Classification" type="number" class="validate " >
                              <label for="Classification">Classification</label>
                          </div>
                          <!-- Property Details  -->
                          <h6 class="center ">Property Details</h6>
                          <div class="input-field col s6">
                              <input id="AddressNumber" type="number" class="validate " >
                              <label for="AddressNumber">Address Number</label>
                          </div>
                          <div class="input-field col s6">
                              <input id="phnumber" type="number" class="validate " >
                              <label for="phnumber">Address Name</label>
                          </div>
                          <div class="input-field col s6">
                                <input id="Suburb" type="text" class="validate " >
                                <label for="Suburb">Suburb</label>
                          </div>
                          <div class="input-field col s6">
                                <input id="Postcode" type="number" class="validate " >
                                <label for="Postcode">Postcode</label>
                          </div>
                          <div class="input-field col s6">
                              <input id="State" type="text" class="validate "  >
                              <label for="State">State</label>
                          </div>
                          <div class="input-field col s6">
                            <input id="PropertyType" type="text" class="validate "  >
                            <label for="PropertyType">Property Type</label>
                          </div>
                          <div class="input-field col s6">
                            <input id="Date Available" type="date" class="validate "  >
                            <label for="Date Available">Date Available</label>
                          </div>
                          <div class="input-field col s6 ">
                              <input id="RentAmount" type="number" class="validate "  >
                              <label for="RentAmount">Rent Amount</label>
                          </div>
                          <div class="input-field col s6 ">
                                <input id="Frequency" type="text" class="validate "  >
                                <label for="Frequency">Rent Frequency</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="MarketValue" type="number" class="validate "  >
                            <label for="MarketValue">Market Value of Property</label>
                          </div>
                          <div class="input-field col s6 ">
                                <input id="Bathrooms" type="number" class="validate "  >
                                <label for="Bathrooms">Bathrooms</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="Bedrooms" type="number" class="validate "  >
                            <label for="Bedrooms">Bedrooms</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="Indoor" type="text" class="validate "  >
                            <label for="Indoor">Indoor Features</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="Outdoor" type="text" class="validate "  >
                            <label for="Outdoor">Outdoor Features</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="HVAC" type="text" class="validate "  >
                            <label for="HVAC">HVAC</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="EnergyLevels" type="text" class="validate "  >
                            <label for="EnergyLevels">Energy Levels</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="Parking" type="text" class="validate "  >
                            <label for="Parking">Parking</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="PetsAllowed" type="text" class="validate "  >
                            <label for="PetsAllowed">Pets Allowed</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="NBN" type="text" class="validate "  >
                            <label for="NBN">NBN Available</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="Commute" type="text" class="validate "  >
                            <label for="Commute">Commute Profile</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="Demographics" type="text" class="validate "  >
                            <label for="Demographics">Demographics</label>
                          </div>
                          <div class="center">
                            <button class="btn waves-effect waves-light dark-blue" type="submit" name="action">Submit
                              <i class="material-icons right">send</i>
                            </button>
                          </div>
                      </div>
                    </div>
              </span>
              </form>
            </div>
       `
}