 const applicationTableRow = () => {
   
 } 
 
 
 const renterProfileForm = () => {
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
            <label for="lengthofemployment">How long have you been employed with them? (months)</label>
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
            <input id="prev_landlord_name" type="text" class="validate " >
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
          <input class="" id="prev_lease_length" type="number" class="validate " >
          <label  for="prev_lease_length">Length of tenancy (months)</label>
        </div>
        <div class = "col s3">
            <p>
              <label>
                <input type="checkbox" id = "prev_lease_broken"/>
                <span>Was your previous rental agreement broken?</span>
              </label>
            </p>
          </div>
          <div class = "col s3">
            <p>
              <label>
                <input type="checkbox" id = "prev_lease_evicted"/>
                <span>Were you evicted?</span>
              </label>
            </p>
          </div>
      </div>
        

        <div class = "row">
         
        
          <div class = "col s3">    
          <p>
            <label>
              <input type="checkbox" id = "criminal_record"/>
              <span>Do you have a criminal record?</span>
            </label>
          </p>
          </div>
          <div class = "col s3">    
            <input type="number" id = "children" placeholder = "Number of dependents that live with you"/>
          </div>
          <div class = "col s3">
            <p>
              <label>
                <input type="checkbox" id = "smoker"/>
                <span>Do you smoke?</span>
              </label>
            </p>
          </div>
          <div class="input-field col s3">
            <input  class="" id="moveindate" type="date" class="validate " ">
            <label for="moveindate">Preferred date of move-in</label>
          </div>
        </div>
        
      </div>

       
      
        
        
       
       

        <div class = "row">
            <div class = "col s12">
            <button class="btn waves-effect waves-light dark-blue" type="button" name="action" id = "renter-profile-submit-btn" style = "width: 100%;">
                Submit
            </button></div>
          
        </div>
    </div>`;
}

 const propertyForm = () => {
    return `
          
                   <!-- Form for Property Listing  -->
                  <div class="row ">
                  <form id = "form" class = "col s12" enctype="multipart/form-data">
                          <!-- Property Details  -->
                          <h6 class="center ">Property Details</h6>
                          <div class="input-field col s6">
                              <input id="address_number" type="text" class="validate " >
                              <label for="address_number">Address Number</label>
                          </div>
                          <div class="input-field col s6">
                              <input id="address_name" type="text" class="validate " >
                              <label for="address_name">Address Name</label>
                          </div>
                          <div class="input-field col s6">
                                <input id="suburb" type="text" class="validate " >
                                <label for="suburb">Suburb</label>
                          </div>
                          <div class="input-field col s6">
                                <input id="prop_postcode" type="number" class="validate " >
                                <label for="postcode">Postcode</label>
                          </div>
                          <div class="input-field col s6">
                              <input id="state" type="text" class="validate "  >
                              <label for="state">State</label>
                          </div>
                          <div class="input-field col s6">
                            <input id="property_type" type="text" class="validate "  >
                            <label for="property_type">Property Type</label>
                          </div>
                          <div class="input-field col s6">
                            <input id="date_available" type="date" class="validate "  >
                            <label for="date_available">Date Available</label>
                          </div>
                          <div class="input-field col s6 ">
                              <input id="rent_amount" type="number" class="validate "  >
                              <label for="rent_amount">Rent Amount</label>
                          </div>
                          <div class="input-field col s6 ">
                                <input id="rent_frequency" type="text" class="validate "  >
                                <label for="rent_frequency">Rent Frequency</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="market_value" type="number" class="validate "  >
                            <label for="market_value">Market Value of Property</label>
                          </div>
                          <div class="input-field col s6 ">
                                <input id="bathrooms" type="number" class="validate "  >
                                <label for="bathrooms">Bathrooms</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="bedrooms" type="number" class="validate "  >
                            <label for=bedrooms">Bedrooms</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="indoor_features" type="text" class="validate "  >
                            <label for="indoor_features">Indoor Features</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="outdoor_features" type="text" class="validate "  >
                            <label for="outdoor_features">Outdoor Features</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="hvac" type="text" class="validate "  >
                            <label for="hvac">HVAC</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="energy_levels" type="number" class="validate "  >
                            <label for="energy_levels">Energy Levels</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="parking" type="text" class="validate "  >
                            <label for="parking">Parking</label>
                          </div>
                         
                          <div class="input-field col s6 ">
                            <input id="nbn" type="text" class="validate "  >
                            <label for="nbn">NBN Available</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="walking_commute_profile" type="text" class="validate "  >
                            <label for="walking_commute_profile">Walking rating</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="driving_commute_profile" type="text" class="validate "  >
                            <label for="driving_commute_profile">Driving Rating</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="pt_commute_profile" type="text" class="validate "  >
                            <label for="pt_commute_profile">Public Transport Rating</label>
                          </div>
                          <div class="input-field col s6 ">
                            <input id="demographics" type="text" class="validate "  >
                            <label for="demographics">Demographics</label>
                          </div>
                          <div class="input-field col s2 ">
                          <p>
                          <label>
                            <input type="checkbox" id = "pets_allowed"/>
                            <span>Are pets allowed?</span>
                          </label>
                        </p>
                          </div>
                          <div class="input-field col s4 ">
                          <input id="keywords" type="text" class="validate "  >
                          <label for="keywords">Keywords</label>
                        </div>
                        <div class = "col s3 input-field">
                          <input id="image_name" type="text" class="validate">
                          <label for = "image_name">Image Name</label>
                        </div>
                        <div class = "col s3 input-field">
                          <input type = "file" id = "image_file" class = "validate" name = "file">
                          <label for = "image_file" style = "padding-top: 12px" >Upload Main Image</label>
                        </div>
                          <div class="col s12">
                            <button class="btn dark-blue" type="button" name="action" id = "property-submit-btn">Submit
                            </button>
                          </div>
                      </div>
                    </div>
              </span>
              </form>
            </div>
       `
}


const propertyCard = () => {
  let firstDiv = document.createElement('div');
  firstDiv.classList = 'col s12 m3 14 ';

  let secondDiv = document.createElement('div');
  secondDiv.classList = 'card grey-blue';

  let thirdDiv = document.createElement('div');
  thirdDiv.classList = 'card-image waves-effect waves-block waves-light';

  let aTag = document.createElement('a');

  let img = document.createElement('img');
  img.width = 305;
  img.height = 229;
  img.classList = 'responsive-img wp-post-image';
  img.loading = 'lazy';
  img.sizes = "(max-width: 305px) 100vw, 305px";

  let titleSpan = document.createElement('span');
  titleSpan.classList = 'card-title home';

  let descriptionDiv = document.createElement('div');
  descriptionDiv.classList = 'card-action';
  

  aTag.appendChild(img);
  aTag.appendChild(titleSpan);

  thirdDiv.appendChild(aTag);
  secondDiv.appendChild(thirdDiv);
  secondDiv.appendChild(descriptionDiv);
  firstDiv.appendChild(secondDiv);
  return firstDiv;
//   return `<div class="col s12 m6 l4">
//   <div class="card">
//     <div class="card-image waves-effect waves-block waves-light">
//       <a href="#">
//         <img width="305" height="229" src="" class="responsive-img wp-post-image"  loading="lazy" sizes="(max-width: 305px) 100vw, 305px">    
//         <span class="card-title home">Title</span>
//       </a>
//     </div>
//   </div>
// </div>`;
}

export{renterProfileForm, propertyForm, propertyCard}



 // <form class="col s12 form">
                      //     <!-- Applicant Criteria  -->
                      //     // <h6 class="center ">Applicant Criteria</h6>
                      // <div class="row">
                      //   <div class="row">
                      //     <p class="center">
                      //       <label class="center">
                      //         <input type="checkbox" class="filled-in" id="criminalrecbox" />
                      //         <span for="criminalrecbox" class="">Non-Flexible</span>
                      //       </label>
                      //       <label class="center">
                      //         <input type="checkbox" class="filled-in grey-text" id="filled-in-box" />
                      //         <span for="filled-in-box" class="">Flexible</span>
                      //       </label>
                      //     </p>
                      //     <div class="input-field col s4">
                      //         <input id="Category" type="text" class="validate " >
                      //         <label for="Category">Category</label>
                      //     </div>
                      //     <div class="input-field col s4">
                      //         <input id="Benchmark" type="text" class="validate " >
                      //         <label for="Benchmark">Benchmark</label>
                      //     </div>
                      //     <div class="input-field col s4">
                      //         <input id="Classification" type="number" class="validate " >
                      //         <label for="Classification">Classification</label>
                      //     </div>