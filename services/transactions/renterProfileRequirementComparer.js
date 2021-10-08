const { deflateSync } = require("zlib");


const handleMultiLayerObject = (category, renterProfile) => {
   let i = 0;
   let objectLayerReference;

   
   for(i; i < category.length; i++){
       if (objectLayerReference == null){
           objectLayerReference = renterProfile[`${category[i].toString()}`]

       } else {
           if (objectLayerReference instanceof Array){
               continue;
           }
           objectLayerReference = objectLayerReference[`${category[i].toString()}`]
       }
   }

   let result = {name: category[category.length-1], value: objectLayerReference};
   return result;
}

const compareRenterValuesToBenchmarkValues = (renterProfileCriteria) => {
    let screeningOutcome = [];

    let i = 0;
    for (i; i < renterProfileCriteria.length; i++){
        
        
        let criterion = renterProfileCriteria[i];
        let result;
        let flag = false;

        switch (criterion.category){
            case "preferredMoveInDate":
                let renterDate = new Date(criterion.rentersValue);
                let requiredDate = new Date(criterion.benchmark);


                

                if (criterion.classification == "equal"){
                    result = equal(renterDate, requiredDate);
                } 
                else if (criterion.classification == "after"){
                    result = gt(renterDate, requiredDate);

                } 
                else if (criterion.classification == "before"){
                    result = lt (renterDate, requiredDate);
                }
                screeningOutcome.push({category: criterion.classification, outcome: result});

                flag = true;
            break;

            case "pets":
                if (typeof(criterion.benchmark) == "number"){
                    criterion.rentersValue = criterion.rentersValue.length;
                }
            break;

            case "breed":
                criterion.rentersValue.forEach(pet => {
                    result = sortClassification(pet.breed, criterion.benchmark, criterion.classification);
                    screeningOutcome.push({category: criterion.category, outcome: result});
                })
                flag = true;
            break;

            case "personalReferences":
                if (typeof(criterion.benchmark) == "number"){
                    criterion.rentersValue = criterion.rentersValue.length;
                }
            break;

            case "professionalReferences":
                if (typeof(criterion.benchmark) == "number"){
                    criterion.rentersValue = criterion.rentersValue.length;
                }
            break;

            case "children":
                if (typeof(criterion.benchmark) == "number"){
                    criterion.rentersValue = criterion.rentersValue;
                }
            break;

            case "size":
                criterion.rentersValue.forEach(pet => {
                    result = sortClassification(pet.breed, criterion.benchmark, criterion.classification);
                    screeningOutcome.push({category: criterion.category, outcome: result});
                })
                flag = true;
            break;

                
        }

        if (!flag){
            result = sortClassification(criterion.rentersValue, criterion.benchmark, criterion.classification);
            screeningOutcome.push({category: criterion.category, outcome: result});
        } 

    }
    

    return screeningOutcome;
}

const sortClassification = (rentersValue, benchmark, classification) => {
    let result;

    switch (classification){
        case "gt":
            result = gt(rentersValue, benchmark);
            break;
        
        case "lt":
            result = lt(rentersValue, benchmark);
            break;
        
        case "equal":
            result = equal(rentersValue, benchmark);
            break;
        
        case "boolean":
            result = boolean(rentersValue, benchmark);
            break;
        
        case "not":
            result = not(rentersValue, benchmark);
            break;
    }

    return result;
}

const boolean = (val, req) => {
    if (val == req){
        return true;
    }
    return false;
}


const not = (val, req) => {
    if (val != req){
        return true;
    }
    return false;
}

const gt = (val, req) => {
    if (val > req){
        return true;
    }
    return false;
}

const lt = (val, req) => {
    if (val < req){
        return true;
    }
    return false;
}

const equal = (val, req) => {
    if (val == req){
        return true;
    }
    return false;
}

module.exports = {compareRenterValuesToBenchmarkValues, handleMultiLayerObject}