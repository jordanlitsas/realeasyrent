import {applicationTableRow} from './htmlResources.js'

window.addEventListener('DOMContentLoaded', (event) => {
   populateApplicationTable();
});


const populateApplicationTable = async () => {

  let userId = sessionStorage.getItem('userId').toString();

  let activeApplications = await captureActiveApplication(userId);
  
  
    console.log(activeApplications)
    let i = 0;

    for (i; i < activeApplications.length; i++){
      let tr = applicationTableRow();
  
  
      tr.childNodes[0].innerHTML = `
          ${activeApplications[i].prop.addressNumber} ${activeApplications[i].prop.addressName} ${activeApplications[i].prop.suburb}, ${activeApplications[i].prop.postcode}
        `;
    
      tr.childNodes[1].innerHTML = activeApplications[i].app.dateApplicationMade.substring(0, 15);
      tr.childNodes[2].innerHTML = activeApplications[i].app.status;
      document.getElementById('activeapp_tbody').appendChild(tr);
      console.log(tr)
    }
 

  
}


const captureActiveApplication = async (userId) => {
  let queryBody = {
    operator: "criteria",
    query: {}
  };


  let applications;
  await $.ajax({
          url: '/application',
          contentType: 'application/json',
          data: queryBody, 
          type: 'GET',
          complete: function(xmlHttp){
            applications = xmlHttp.responseJSON;
          }
      })


  //This is really really bad. Need to refactor server to enable easier retrieval of user's applied active_application doc.
  let activeApplications = [];
  let i = 0, j = 0;

  for (i; i < applications.length;i++){
    for (j; j < applications[i].applicants.length; j++){

      console.log(applications[i])
      if (applications[i].applicants[j].userId == sessionStorage.getItem('userId')){
        queryBody.operator = "propertyId";
        queryBody.query = applications[i].propertyId;
        let propertyData;

        await $.ajax({
          url: '/property',
          contentType: 'application/json',
          data: queryBody, 
          type: 'GET',
          complete: function(xmlHttp){
            let property = xmlHttp.responseJSON;
            propertyData = {
              addressNumber: property.addressNumber,
              addressName: property.addressName,
              suburb: property.suburb,
              postcode: property.postcode
            };
            console.log(property)
            
          }
      })
      activeApplications.push({app: applications[i].applicants[j], prop: propertyData});
      }
    }
  }
  return activeApplications
}
