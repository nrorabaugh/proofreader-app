import React, { Component } from 'react'
import Axios from 'axios'
import QuestionThumbnail from './QuestionThumbnail'

export default class AssignmentThumbnail extends Component {
    state = {
        assignment: {
            classId: this.props.classId,
            id: this.props.id,
            name: this.props.name,
            description: this.props.description
        },
        update: false,
        questions: [],
        remapIndex: -1,
        addQuestion: false,
        percentInt: undefined,
        percent: undefined
    }

    componentDidMount() {
        let total = 0
        Axios.get(`/questionApi/questions/assignment/${this.props.id}`)
        .then((res) => {
            res.data.sort((a, b) => {
                return a.number-b.number
            })
            this.setState({questions: res.data})
            total = res.data.length
        })
        Axios.get(`/solutionApi/solutions/assignment/${this.props.id}`)
        .then(async(res) => {
            let correct = 0
            for(let i=0; i<res.data.length; i++){
                if(res.data[i].submitted === true){
                    if(res.data[i].userId === JSON.parse(localStorage.getItem('loggedInUser'))._id){
                        document.getElementsByClassName(`submittedData ${this.props.id}`)[0].style.display = 'flex'
                        if(res.data[i].correct === true){
                            correct+=1
                        }
                    }
                }
            }
            if(total === 0){
                window.location.reload()
            }
            let percent = ((correct/total)*100).toString() + "%"
            document.getElementsByClassName(`correctbar ${this.props.id}`)[0].style.width = percent
            this.setState({percent: `${correct}/${total}`, percentInt: (correct/total)})
        })
    }

    update = () => {
        let update = !this.state.update
        let remapIndex = this.state.remapIndex +1
        this.setState({remapIndex, update})
    }

    updateAssignment = (evt) => {
        evt.preventDefault()
        let assignment = {
            name: evt.target.name.value,
            description: evt.target.description.value,
            classId: this.props.classId
        }
        Axios.put(`/assignmentApi/assignments/${this.props.id}`, assignment)
        this.setState({assignment})
        setTimeout(300, () => {})
    }

    addQuestion = () => {
        let toggle = !this.state.addQuestion
        this.setState({addQuestion: toggle})
    } 

    submitQuestion = (evt) => {
        evt.preventDefault()
        let question = {
            number: evt.target.number.value,
            content: evt.target.content.value,
            solution: evt.target.solution.value,
            assignmentId: this.props.id
        }
        Axios.post('/questionApi/questions', question)
        let questions = this.state.questions
        questions.push(question)
        questions.sort((a, b) => {
            return a.number-b.number
        })
        this.setState({questions})
    }

    render() {
        let scorebar = `scorebar ${this.props.id}`
        let correctbar = `correctbar ${this.props.id}`
        let submittedData = `submittedData ${this.props.id}`
        let role = JSON.parse(localStorage.getItem("loggedInUser")).role
        let href = null
        if(role === "teacher") { href = `/admin/assignment/${this.props.id}` }
        if(role === "student") { href = `/assignment/${this.props.id}` }
        let remapIndex = this.state.remapIndex
        let questMap = this.state.questions.map((question, index) => {
            return <QuestionThumbnail  key = {index + (remapIndex * this.state.questions.length)} id = {question._id} assignmentId = {question.assignmentId} number = {question.number} content = {question.content} solution = {question.solution}/>
        })
        return (
            <div>
                <a href={href} className='assignment'>
                <div className='assignmentThumb'>
                    <p>{this.state.assignment.name}</p> 
                    <em className='subtitle'>{this.state.questions.length} Questions</em>  
                    <div className={submittedData}>
                        <p>{this.state.percent}</p>
                        <div className={scorebar}><div className={correctbar}></div></div>
                    </div>
                </div>
                </a>
                {role === 'teacher'? <button className='updateAssignment' onClick = {this.update}>{this.state.update?"Cancel" : "Update Assignment"}</button>:null}
                {this.state.update? <div><form onSubmit={this.updateAssignment}>
                        <input type='text' name='name' defaultValue={this.props.name}></input>
                        <input type='text' name='description' defaultValue={this.props.description}></input>
                        <input type='submit' value='Update Assignment'></input>
                    </form>
                        <div>
                            {questMap}
                        </div>
                        <button className='addQuestion' onClick={this.addQuestion}>{this.state.addQuestion? "Cancel":"Add A Question"}</button>
                        {this.state.addQuestion? <form className='vertForm' onSubmit={this.submitQuestion}>
                        <input type='text' name='number' placeholder='Number'></input>
                        <textarea type='text' name='content' placeholder='Prompt'></textarea>
                        <input type='text' name='solution' placeholder='Answer'></input>
                        <input type='submit' value='Add Question'></input>
                        </form> : null}
                    </div>: null}
            </div>
        )
    }
}