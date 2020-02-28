import React, { Component } from 'react'
import Axios from 'axios'
import CalculationSmall from './CalculationSmall'

export default class SolutionThumbnail extends Component {

    state = {
        user: {},
        question: {},
        solution: {},
        calculations: [],
        showCalculations: false
    }

    componentDidMount = () =>{
        Axios.get(`/userApi/users/${this.props.userId}`)
        .then((res) => {
            this.setState({user: res.data})
        })
        Axios.get(`/questionApi/questions/${this.props.questionId}`)
        .then((res) => {
            this.setState({question: res.data})
        })
        Axios.get(`/solutionApi/solutions/${this.props.id}`)
        .then((res) => {
            this.setState({solution: res.data})
            Axios.get(`/calculationApi/calculations/solution/${res.data._id}`)
            .then((response) => {
                response.data.sort((a,b)=>{
                    return a.seq-b.seq
                })
                this.setState({calculations: response.data})
            })
        })
        let box = document.createElement('div')
        box.setAttribute('id', 'calculations')
        this.setState({box})
    }

    showCalculations = () => {
        let newState = {...this.state}
        let toggle = !this.state.showCalculations
        newState.showCalculations = toggle
        this.setState(newState)
    }

    markAsCorrect = () => {
        let solution = this.state.solution
        solution.correct = !this.state.solution.correct
        Axios.put(`/solutionApi/solutions/${this.props.id}`, solution)
        this.setState({solution})
    }

    render() {
        let color = 'red'
        if(this.state.solution.correct === true){
            color='green'
        }
        let calculationsMap = this.state.calculations.map((calculation, index) => {
            return <CalculationSmall key={index} expression={calculation.expression} comment = {calculation.comment}/>
        })
        return (
                <div className='solutionBox' style={{backgroundColor: color}}>
                    <strong className='solutionContent'>{this.state.user.username}</strong>
                    <p className='solutionContent'>Question #{this.state.question.number}</p>
                    <p className='solutionContent'>{this.state.solution.content}</p>
                    <button className='buttonFloat' onClick={this.markAsCorrect}>{this.state.solution.correct? "Mark as incorrect" : "Mark as correct"}</button>
                    <button className='buttonFloat2' onClick={this.showCalculations}>{this.state.showCalculations? "Hide calculations" : "Show calculations"}</button>
                    {this.state.showCalculations? 
                    <div>
                        {calculationsMap}
                    </div> : null}
                </div>
        )
    }
}
