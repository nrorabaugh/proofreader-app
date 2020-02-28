import React, { Component } from 'react'
import Axios from 'axios'
import AssignmentThumbnail from './AssignmentThumbnail'

export default class TeacherClassView extends Component {
    state = {
        classData: null,
        assignments: [],
        user: null,
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("loggedInUser"))
        this.setState({user})
        Axios.get(`/classroomApi/classrooms/teacher/${user._id}`)
        .then((res) => {
            this.setState({classData: res.data})
            Axios.get(`/assignmentApi/assignments/class/${res.data._id}`)
            .then((res) => {
                this.setState({assignments: res.data})
            })
        })
    }

    render() {
        let assignmentsMap = this.state.assignments.map((assignment, index) => {
            return <AssignmentThumbnail  key = {index} id = {assignment._id} classId = {assignment.classId} name = {assignment.name} description = {assignment.description}/>
        })
        let href = null
        if(this.state.classData) {
            href = `/admin/addAssignment/${this.state.classData._id}`
        }
        return (
            <div>
                <div className='banner'>
                    <h1>{this.state.classData? this.state.classData.name : 'Class'}</h1>
                    <a className='add link' href={href}>Add Assignment</a>
                    <a className='log link' href='/'>Log Out</a></div>
                <div className='pageWrapper'>
                {this.state.classData? <p className='classKey'>Class Key: {this.state.classData._id}</p> : null }
                    <div className='assignmentList'>
                        {assignmentsMap}
                    </div>
                </div>
            </div>
        )
    }
}
