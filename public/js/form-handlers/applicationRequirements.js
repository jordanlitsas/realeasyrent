let propertyId = "";

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('app_req_submit_btn').onclick = submitApplicationRequirementForm;
 });

 const submitApplicationRequirementForm = async () => {



    let requirements = [];
    let temp = {};
    let i = 1;

    while (i <= 14){
        if ($(`#benchmark${i}`).val() != ""){
            console.log(i)
            switch(i){
                case 1:
                  
                    temp.category = "preferredMoveInDate";
                    temp.benchmark = $(`#benchmark${i}`).val();
                    temp.classification = $(`#classification${i}`).val();
                    requirements.push(temp);
                    temp = {};
                break;
                
                case 2:
                    temp.category = 'pets';
                    temp.benchmark = $(`#benchmark${i}`).val();
                    temp.classification = $(`#classification${i}`).val();
                    requirements.push(temp);
                    temp = {};
                break;
    
                case 3:
                    temp.cateogry = 'breed';
                    temp.benchmark = $(`#benchmark${i}`).val();
                    temp.classification = $(`#classification${i}`).val();
                    requirements.push(temp);
                    temp = {};
                break;
    
                case 4:
                    temp.category = 'size';
                    temp.benchmark = $(`#benchmark${i}`).val();
                    temp.classifcation = $(`#classification${i}`).val();
                    requirements.push(temp);
                    temp = {};
                break;
                case 5:
                    temp.category = "personalReferences";
                    temp.benchmark = $(`#benchmark${i}`).val();
                    temp.classifcation = $(`#classification${i}`).val();
                    requirements.push(temp);
                    temp = {};
                break;
                case 6:
                    temp.category = 'professionalReferences';
                    temp.benchmark = $(`#benchmark${i}`).val();
                    temp.classification = $(`#classification${i}`).val();
                    requirements.push(temp);
                    temp = {};
                break;
                case 7:
                    temp.category = 'children';
                    temp.benchmark = $(`#benchmark${i}`).val();
                    temp.classification = $(`#classification${i}`).val();
                    requirements.push(temp);
                    temp = {};
                break;
                case 9:
                    temp.category = ["employement", "monthlyIncome"];
                    temp.benchmark = $(`#benchmark${i}`).val();
                    temp.classification = $(`#classification${i}`).val();
                    requirements.push(temp);
                    temp = {};
                break;
                case 10:
                    temp.category = ['rentalHistory', 'evicted']
                    temp.benchmark = $(`#benchmark${i}`).is(':checked');
                    temp.classification = $(`#classification${i}`).val();
                    requirements.push(temp);
                    temp = {};
                break;
                case 11:
                    temp.category = ['rentalHistory', 'rentalAgreementBroken']
                    temp.benchmark = $(`#benchmark${i}`).is(':checked');
                    temp.classification = 'equal';
                    requirements.push(temp);
                    temp = {};
                break;
                case 12:
                    temp.category = 'lengthOfLastTenancy';
                    temp.benchmark = $(`#benchmark${i}`).val();
                    temp.classification = $(`#classification${i}`).val();
                    requirements.push(temp);
                    temp = {};
                break;
    
                case 12:
                    temp.category = 'smoker';
                    temp.benchmark = $(`#benchmark${i}`).is(':checked');
                    temp.classification = 'equal';
                    requirements.push(temp);
                    temp = {};
                break;
    
                case 13:
                    temp.category = 'committedOfCrime';
                    temp.benchmark = $(`#benchmark${i}`).is(':checked');
                    temp.classification = 'equal';
                    requirements.push(temp);
                    temp = {};
                break;

                default: break;
    
    
            } 
        }
       

        i++;
    }


    // await $.ajax({
    //     url: '/property',
    //     contentType: 'application/json',
    //     data: queryBody, 
    //     type: 'PUT',
    //     complete: function(xmlHttp){
    //       let property = xmlHttp.responseJSON;
    //       propertyData = {
    //         addressNumber: property.addressNumber,
    //         addressName: property.addressName,
    //         suburb: property.suburb,
    //         postcode: property.postcode
    //       };
          
    //     }
    // })
    console.log(propertyId)
 }

 const setPropertyId = (id) => {
     propertyId = id;
     console.log(propertyId)
 }
 
export{setPropertyId}