const mongoose = require('./connection.js')

const UsernameModelSchema = new mongoose.Schema({
 userId: String,
 username: String
})

const UsernameCollection = mongoose.model('Username', UsernameModelSchema)

const getUsernameByUsername = (username) => {
  return UsernameCollection.findOne({username: username})
}

const deleteUsername = (id) => {
  return UsernameCollection.deleteOne({_id: id})
}

const getUsernames = () => {
  return UsernameCollection.find()
}

const getAUsername = (id) => {
  return UsernameCollection.findOne({_id: id})
}

const addUsername = (data) => {
  return UsernameCollection.create(data)
} 

const updateUsername = (id, data) => {
    return UsernameCollection.findByIdAndUpdate(id, {username: data.username})
} 

module.exports = {
    getAUsername,
    getUsernameByUsername,
    getUsernames,
    deleteUsername,
    addUsername,
    updateUsername
}