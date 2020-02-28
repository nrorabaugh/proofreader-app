const express = require('express')
const app = express()
let socket = require('socket.io')

const { messageRouter } = require('./controllers/message.js')
const { userRouter } = require('./controllers/user.js')
const { assignmentRouter } = require('./controllers/assignment.js')
const { calculationRouter } = require('./controllers/calculation.js')
const { classroomRouter } = require('./controllers/classroom.js')
const { questionRouter } = require('./controllers/question.js')
const { solutionRouter } = require('./controllers/solution.js')
const { usernameRouter } = require('./controllers/username.js')

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(express.static(`${__dirname}/client/build`))

app.use('/messageApi', messageRouter)
app.use('/userApi', userRouter)
app.use('/assignmentApi', assignmentRouter)
app.use('/calculationApi', calculationRouter)
app.use('/classroomApi', classroomRouter)
app.use('/questionApi', questionRouter)
app.use('/solutionApi', solutionRouter)
app.use('/usernameApi', usernameRouter)



app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

const PORT = process.env.PORT || 3001

const server = (app.listen(PORT, () => {
            console.log(`App is listening on PORT ${PORT}`)
        }))

const io = socket(server)

io.on('connection', function(socket) {
    socket.on('send-message', (message) => {
        io.emit('new-message', message)
        })
    }
)

