import React, { Component } from 'react'
import Axios from 'axios'
import Question from './Question'
import Message from './Message'
import Calculator from './Calculator'
import Solution from './Solution'
import openSocket from 'socket.io-client'
import { Redirect } from 'react-router-dom'

let socket = openSocket()

let socketSendChat = (value) => {
    socket.emit('send-message', value)
}
 
export default class AssignmentView extends Component {
   state = {
       solution: null,
       viewer: 'question',
       first: true,
       last: false,
       updatable: true,
       assignment: null,
       questions: [],
       currentQuestion: {},
       messages: [],
       submitted: false
   }
 
   componentDidMount() {
       let { match: { params } } = this.props
       Axios.get(`/questionApi/questions/assignment/${params.id}`)
       .then((response) => {
        response.data.sort((a, b) => {
            return a.number-b.number
        })
           this.setState({questions: response.data, currentQuestion: response.data[0]})
           this.getQuestionSolution()
       })
       Axios.get(`/assignmentApi/assignments/${params.id}`)
       .then((res) => {
           this.setState({assignment: res.data})
       })
       Axios.get(`/messageApi/messages/assignment/${params.id}`)
       .then((res) => {
           this.setState({messages: res.data})
       })
       socket.on('new-message', (event) => {
        if (params.id !== event.data.assignmentId) {
            return
        }
            const previousState = {...this.state}
            previousState.messages.push(event.data)
            this.setState(previousState)
        })
   }
   
   getQuestionSolution = () => {
    let id = JSON.parse(localStorage.getItem("loggedInUser"))._id
    Axios.get(`/solutionApi/solutions/student/${id}`)
    .then((res) => {
        if(this.state.currentQuestion !== undefined){
            for(let i=0; i<res.data.length; i++){
                if(res.data[i].questionId === this.state.currentQuestion._id) {
                    this.setState({solution: res.data[i]})
                    if(res.data[i].submitted === true){
                        this.setState({updatable: false})
                    }
                    return
                } else {
                    this.setState({solution: null})
                }
            }
        }
    })
}

   nextQuestion = () => {
       let currentQuestionIndex = this.state.questions.indexOf(this.state.currentQuestion)
       this.setState({currentQuestion: this.state.questions[(currentQuestionIndex+1)], first: false})
       this.getQuestionSolution()
       this.rangeCheck(currentQuestionIndex+1)
   }

    prevQuestion = () => {
        let currentQuestionIndex = this.state.questions.indexOf(this.state.currentQuestion)
        this.setState({currentQuestion: this.state.questions[(currentQuestionIndex-1)]})
        this.getQuestionSolution()
        this.rangeCheck(currentQuestionIndex-1)
    }

    rangeCheck = (index) => {
        if((index+1) !== this.state.questions.length) {
            this.setState({last: false})
        } 
        if((index+1) === this.state.questions.length) {
            this.setState({last: true})
        }
        if(index !== 0) {
            this.setState({first: false})
        }
        if(index === 0) {
            this.setState({first: true})
        }
    }

   switchView = (evt) => {
       this.setState({viewer: evt.target.id})
   }

   sendMessage = (evt) => {
       evt.preventDefault()
       let userId = (JSON.parse(localStorage.getItem("loggedInUser")))._id
       let assignmentId = this.state.assignment._id
       let message = {
           senderId: userId,
           content: evt.target.messageValue.value,
           seq: this.state.messages.length,
           assignmentId: assignmentId,
       }
       Axios.post('/messageApi/messages', message)
       .then((message) => {
           socketSendChat(message)
       })
       evt.target.messageValue.value = ''
   }

   addSolution = () => {
       this.setState({viewer: 'solution'})
   }

   submitAssignment = () => {
       Axios.get(`/solutionApi/solutions/student/${JSON.parse(localStorage.getItem("loggedInUser"))._id}`)
       .then((res) => {
           for(let i=0; i<res.data.length; i++){
                let newSolution = res.data[i]
                newSolution.submitted = true               
                Axios.get(`/questionApi/questions/${res.data[i].questionId}`)
               .then((response) => {
                if(res.data[i].content === response.data.solution){
                    newSolution.correct = true
                }
                Axios.put(`/solutionApi/solutions/${newSolution._id}`, newSolution)
               })
           }
           this.setState({submitted: true})
       })
   }
 
   render() {
       let redirect = null
       if(this.state.assignment !== null){
           redirect = `/class/${this.state.assignment.classId}`
       }
       let messagesMap = this.state.messages.map((message, index) =>{
           return <Message key={index} senderId={message.senderId} content={message.content}/>
       })
       return (
           <div>
               {this.state.submitted? <Redirect to={redirect}/> : <div><div className='banner'>
                   <h1>{this.state.assignment? this.state.assignment.name : null}</h1>
                   <a className='log link' href='/'>Log Out</a>
               </div>
               <div className='assignmentContent'>
                   <div className='spacer'>
                   <div className = 'switch'>
                       {this.state.questions[0] === undefined? <h2>This assignment currently has no questions.</h2> : null}
                       {this.state.questions[0] !== undefined && this.state.viewer === 'question'? <div><Question
                       number={this.state.currentQuestion.number}
                       content={this.state.currentQuestion.content}
                       />
                       <div className='position'>
                       {this.state.first? null : <button onClick={this.prevQuestion}>Previous Question</button>}
                       {this.state.updatable? <button id="addSolution" onClick={this.addSolution}>{this.state.solution? "Edit Solution" : "Add Solution"}</button> : null}
                       {(this.state.last && this.state.updatable) || (this.state.questions.length === 1 && this.state.updatable)? <button onClick={this.submitAssignment}>Submit Assignment</button> : null }
                       {this.state.last || this.state.questions.length === 1? null : <button onClick={this.nextQuestion}>Next Question</button>}
                       {this.state.solution !== null? <p>Your answer: {this.state.solution.content}</p> : null}
                       </div>
                       </div> : null}
                       {this.state.viewer === 'solution'? <div><Solution question={this.state.currentQuestion} solutionId={this.state.solutionId}/>
                       </div> : null}
                       {this.state.viewer === 'calculator'? <div><Calculator/>
                       </div> : null}
                   </div>
                        {this.state.questions[0] !== undefined?
                        <div className='switchButtonBar'>
                            <button className='b' id='question' onClick={this.switchView}>Questions</button>
                            <button className='b' id='calculator' onClick={this.switchView}>Calculator</button>
                        </div> : null}
                    </div>
                   <div className = 'chatWrap'>
                        <div className='chat'>
                            {messagesMap}
                        </div>
                        <div className='chatFormWrap'>
                            <form id='messageInput' onSubmit={this.sendMessage}>
                                <input id='messageInputBox' type='text' name='messageValue' autoComplete='off' placeholder='Send a message...'/>
                            </form>
                            <button id='messageButton' type='submit' form='messageInput'>Send</button>
                        </div>
                    </div>
               </div></div>}
           </div>
       )
   }
}

