import {applicationTableRow} from './htmlResources.js'

window.addEventListener('DOMContentLoaded', (event) => {
   populateApplicationTable();
});


const populateApplicationTable = async () => {

  let userId = sessionStorage.getItem('userId').toString();
  let activeApplications = await captureActiveApplication(userId);
  console.log(activeApplications)
  activeApplications.forEach(application => {
    let tr = applicationTableRow();
    tr.childNodes[0].innerHTML = `
        ${application.prop.addressNumber} ${application.prop.addressName} ${application.prop.suburb}, ${application.prop.postcode}
      `;
  
    tr.childNodes[1].innerHTML = application.app.dateApplicationMade.substring(0, 15);
    tr.childNodes[2].innerHTML = application.app.status;
    document.getElementById('activeapp_table').appendChild(tr);

  })

  
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

  let activeApplications = [];
  applications.forEach( async application => {
    application.applicants.forEach( async userApplication => {
      if (userApplication.userId == userId){

        queryBody.operator = "propertyId";
        queryBody.query = application.propertyId;
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
          }
      })


        activeApplications.push({app: userApplication, prop: propertyData});
      }
    })
  })

  return activeApplications
}