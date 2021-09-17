var Propertydb = require();

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be empty!"});
        return;
    }

    // new property listing
    const property = new propertydb({
        property_ID : req.body.property_ID,
        applicantCriteria : req.body.applicantCriteria,
        Availabledate: req.body.Availabledate,
        Bathrooms: req.body.Bathrooms,
        bedrooms: req.body.bedrooms,
        bidding: req.body.bidding,
        Commuteprofile: req.body.Commuteprofile,
        demographics: req.body.demographics,
        Energylevels: req.body.Energylevels,
        heating_cooling : req.body.heating_cooling,
        Housing_type: req.body.Housing_type,
        Indoorfeatures: req.body.Indoorfeatures,
        keywords: req.body.keywords,
        location: req.body.location,
        Marketvalue: req.body.Marketvalue,
        nbn: req.body.nbn,
        Outdoorfeatures: req.body.Outdoorfeatures,
        parking: req.body.parking,
        pet: req.body.pet,
        postcode: req.body.postcode,
        price: req.body.price,
        rent_type: req.body.rent_type,
    
    })

    // save property into the database
    property
        .save(property)
        .then(data => {
            res.send(data)
            res.redirect(''); //NEED HELP FOR REDIRECT
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all properties/ retrive and return a single property
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Propertydb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found property with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving property with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving property information" })
            })
    }

    
}

// Update a new idetified property by property_id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update property with ${id}. Maybe property not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update property information"})
        })
}

// Delete a property with specified property id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "property was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete property with id=" + id
            });
        });
}