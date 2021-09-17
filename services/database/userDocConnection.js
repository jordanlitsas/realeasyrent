const insertUser = (user) => {
    database.findOne(user, function(err, result){
        if (result == null){
            user.save();
            res.status(200);
            res.send({newUser: user});
        } 
        else {
            res.status(400);
            res.send({result: 'used'})
        }
    });
    return true;
}

const deleteUser = (userId) => {
    return true;
}

const getUser = (userData) => {
    return true;
}

const updateUser = (newUserState) => {
    //get id from newUserState
    //findOneAndUpdate({userId: id})
    return true;
}

module.exports = {insertUser, deleteUser, getUser, updateUser}