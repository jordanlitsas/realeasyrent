// var Userdb = require('../model/model');

// create and save new user


exports.insertUser = (userData)=>{
    // validate request
    if(!userData){
        return false;
    }

    // new user
    const user = new Userdb( { userData } )

    // save user in the database
    user.save().then(savedUser => {
        if (savedUser != null){
            return true;
        } else {
            return false;
        }
    }).catch(err =>{
        if (err){
            return false;
        }
    });

}

// retrieve and return all users/ retrive and return a single user
exports.getUser = (userData)=>{

    // if(userData){

        Userdb.findById(userData._id)
            .then(returnedUser =>{
                if(!returnedUser){
                    return null;
                }else {
                    return returnedUser;
                }
            })
            .catch(err =>{
                if (err){
                    return null;
                }
            })

    // } else{
    //     Userdb.find({firstName: userData.firstName, lastName: userData.lastName, email: userData.email})
    //         .then(returnedUser => {
    //             if(!returnedUser){
    //                 return null;
    //             }else {
    //                 return returnedUser;
    //             }
    //         })
    //         .catch(err =>{
    //             if (err){
    //                 return null;
    //             }
    //         })
    // }

    
}

// Update a new idetified user by user id
exports.update = (user)=>{
    

    let userId = user._id;
    Userdb.findByIdAndUpdate(userId, user, { useFindAndModify: false})
        .then(updatedUser => {
            if (updatedUser != null){
                return true;
            } else {
                return false;
            }
        }).catch(err =>{
            if (err){
                return false;
            }
        });
}

// Delete a user with specified user id in the request
exports.delete = (userId)=>{
    let id = userId;

    Userdb.findByIdAndDelete(id)
        .then(deletedUser => {
            if(!deletedUser){
                return false
            }else{
                return true;
            }
        })
        .catch(err =>{
            if (err){
                return false;
            }
        });
}