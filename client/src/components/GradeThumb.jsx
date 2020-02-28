import React, { Component } from 'react'
import Axios from 'axios'

export default class GradeThumb extends Component {
    state = {
        user: {},
        grade: 0
    }

    componentDidMount() {
        Axios.get(`/userApi/users/${this.props.userId}`)
        .then((res) => {
            this.setState({user: res.data})
        })
        Axios.get(`/solutionApi/solutions/student/${this.props.userId}`)
        .then((res) => {
            let total = 0
            let correct = 0
            for(let i=0; i<res.data.length; i++){
                if(res.data[i].submitted === true && res.data[i].assignmentId === this.props.assignmentId){
                    total += 1
                    if(res.data[i].correct === true){
                        correct +=1
                    }
                }
            }
            let percent = (correct/total) * 100
            this.setState({grade: percent})
        })
    }

    render() {
        return (
            <div className='gradeThumb'>
                <span>{this.state.user? <strong className='user'>{this.state.user.username}:</strong> : null} {this.state.grade? <p className='gb'>{this.state.grade}</p> : null}</span>
            </div>
        )
    }
}
