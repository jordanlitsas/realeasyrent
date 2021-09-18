
const insertInitialApplication = (applicationForProperty) => { 
    /*
        applicationForProperty is equal to {propertyId: [userId]}
        add this new document to applications collection
        return true if the insertion was successful
        return false if not
    */
    return true;
}

const getApplications = (propertyId) => {
    /*
        return document ({propertyID: [array of userId that have applied]})
        return false if the document doesnt exist
    */
    return null;
}

const deleteApplication = (applicantToRemove) => {
      /*
        applicantToRemove is equal to {propertyId: userId}
        update the document with the key: propertyID so that the array no longer has the userID

        return true for success, else return false
    */
    return true;
}

const updateApplications = (applicationsForProperty) => {
        /*
        applicationsForProperty is equal to  an updated {propertyId: [array of userId that have applied] }
        update the document with corresponding propertyId 
        return true for success, else return false
        */
}



module.exports = {insertInitialApplication, deleteApplication, getApplications, updateApplications}
