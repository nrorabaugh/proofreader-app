import React, { Component } from 'react'
import AssignmentThumbnail from './AssignmentThumbnail'
import Axios from 'axios'

export default class Classview extends Component {
    state = {
        classData: null,
        assignments: [],
        assignmentToRedirect: null,
        user: null,
        listening: [],
        percentage: 0,
        grade: false
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("loggedInUser"))
        this.setState({user})
        Axios.get(`/classroomApi/classrooms/${user.classId}`)
        .then((res) => {
            this.setState({classData: res.data})
            localStorage.setItem("currentClass", res.data)
        })
        Axios.get(`/assignmentApi/assignments/class/${user.classId}`)
        .then((res) => {
            res.data.sort((a,b)=>{
                return b.seq-a.seq
            })
            this.setState({assignments: res.data})
        })
        Axios.get(`/solutionApi/solutions/student/${user._id}`)
        .then((res) => {
            let correct = 0
            let total = 0
            let grade = false
            for(let i=0; i<res.data.length; i++) {
                if(res.data[i].submitted === true) {
                    total += 1
                    grade = true
                }
                if(res.data[i].correct === true) {
                    correct +=1
                }
            }
            if(grade === true){
                this.setState({grade})
                let frac = Math.floor((correct/total) * 100)
                setTimeout(() => {
                    document.getElementsByClassName('grade')[0].innerText = `${frac}%`
                    document.getElementsByClassName('total')[0].style.width = frac + '%'
                }, 200)
            }
        })
    }



    render() {
        let assignmentsMap = this.state.assignments.map((assignment, index) => {
            return <AssignmentThumbnail  key = {index} id = {assignment._id} name = {assignment.name}/>
        })
        return (
            <div>
                <div className='banner'>
                    <h1>{this.state.classData? this.state.classData.name : 'Class'}</h1>
                    <a className='log link' href='/'>Log Out</a>
                </div>
                <div className='pageWrapper'>
                    <div className='assignmentList'>
                        {assignmentsMap}
                    </div>
                    {this.state.grade? 
                    <div className='scorecard'>
                    <div className='gradehead'>Homework Average: <p className='grade'></p></div>
                        <div className='scorebar'>
                            <div className='correctbar total'></div>
                        </div>
                    </div> : null}
                </div>
            </div>
        )
    }
}