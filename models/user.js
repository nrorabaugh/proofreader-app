const mongoose = require('./connection.js')

const UserModelSchema = new mongoose.Schema({
 classId: String,
 username: String,
 password: String,
 role: String
})

const UserCollection = mongoose.model('User', UserModelSchema)

const getUserByCred = (username, password) => {
  return UserCollection.findOne({username: username, password: password})
}

const checkUsernameAvailability = (username) => {
  return UserCollection.findOne({username: username})
}

const deleteUser = (id) => {
  return UserCollection.deleteOne({_id: id})
}

const getUsers = () => {
  return UserCollection.find()
}

const getAUser = (id) => {
  return UserCollection.findOne({_id: id})
}

const addUser = (data) => {
  return UserCollection.create(data)
} 

const updateUser = (id, data) => {
    return UserCollection.findByIdAndUpdate(id, {classId: data.classId, username: data.username, password: data.password})
} 

module.exports = {
  getUserByCred,
  addUser,
  checkUsernameAvailability,
  deleteUser,
  getAUser,
  getUsers,
  updateUser
}