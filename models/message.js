const mongoose = require('./connection.js')

const MessageModelSchema = new mongoose.Schema({
 senderId: String,
 assignmentId: String,
 seq: String,
 content: String 
})

const MessageCollection = mongoose.model('Message', MessageModelSchema)

const getMessagesInAssignment = (assignmentId) => {
  return MessageCollection.find({assignmentId: assignmentId})
}

const deleteMessage = (id) => {
  return MessageCollection.deleteOne({_id: id})
}

const getMessages = () => {
  return MessageCollection.find()
}

const getAMessage = (id) => {
  return MessageCollection.findOne({_id: id})
}

const addMessage = (data) => {
  return MessageCollection.create(data)
} 

const updateMessage = (id, data) => {
    return MessageCollection.findByIdAndUpdate(id, {senderId: data.senderId, assignmentId: data.assignmentId, content: data.content})
} 

module.exports = {
  getMessagesInAssignment,
  addMessage,
  deleteMessage,
  getAMessage,
  getMessages,
  updateMessage
}