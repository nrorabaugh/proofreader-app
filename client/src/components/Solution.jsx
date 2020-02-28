import React, { Component } from 'react'
import Axios from 'axios'
import Calculation from './Calculation'

export default class Solution extends Component {

    state = {
        submitted: false,
        calculations: [],
        solution: {},
        buttonText: "Add Solution",
        calculationField: false,
        calculationButton: "Show your work"
    }

    componentDidMount = () => {
        let user = JSON.parse(localStorage.getItem("loggedInUser"))
        Axios.get(`/solutionApi/solutions/question/${this.props.question._id}`)
        .then((res) => {
            for(let i=0; i<res.data.length; i++) {
                if(res.data[i].userId === user._id) {
                    this.setState({solution: res.data[i], buttonText: "Update Solution"})
                    Axios.get(`/calculationApi/calculations/solution/${res.data[i]._id}`)
                    .then((res) => {
                        res.data.sort((a,b)=>{
                            return a.seq-b.seq
                        })
                        this.setState({calculations: res.data, calculationButton: "Add a Calculation"})
                    })
                }
            }
        })
    }

    addSolution = (evt) => {
        evt.preventDefault()
        if(this.state.solution.content === undefined) {
            let solution = {
                correct: false,
                questionId: this.props.question._id,
                assignmentId: this.props.question.assignmentId,
                userId: JSON.parse(localStorage.getItem("loggedInUser"))._id,
                content: evt.target.expression.value,
                submitted: false
            } 
            this.setState({solution})
            Axios.post('/solutionApi/solutions', solution)
            this.setState({submitted: true})
        } else {
            let solution = {
                questionId: this.props.question._id,
                assignmentId: this.props.question.assignmentId,
                userId: JSON.parse(localStorage.getItem("loggedInUser"))._id,
                id: this.state.solution._id,
                content: evt.target.expression.value,
                correct: false,
                submitted: false
            }   
            Axios.put('/solutionApi/solutions', solution)
            this.setState({submitted: true})
        }
    }

    calculationField = () => {
        if(this.state.solution.questionId !== undefined){
            Axios.get(`/solutionApi/solutions/question/${this.state.solution.questionId}`)
            .then((res) => {
                this.setState({solution: res.data[0]})
                console.log(res)
            })
        }
        let toggle = !this.state.calculationField
        this.setState({calculationField: toggle})
    }

    addCalculation = (evt) => {
        evt.preventDefault()
        let calculation = {
            solutionId: this.state.solution._id,
            expression: evt.target.calcExpression.value,
            seq: this.state.calculations.length,
            comment: evt.target.comment.value
        }
        Axios.post('/calculationApi/calculations', calculation)
        setTimeout(() => {
            Axios.get(`/calculationApi/calculations/solution/${this.state.solution._id}`)
            .then((res) => {
                // res.data.sort((a, b) => {
                //     return a.id - b.id
                // })
                this.setState({calculations: res.data})
            })
        }, 100)
    }

    render() {
        let calcMap = this.state.calculations.map((calculation, index) => {
            return <Calculation  key = {index} id = {calculation._id}/>
        })
        return (
            <div>
                {this.state.submitted? <p>Solution submitted</p> : null}
                <form onSubmit={this.addSolution}>
                    <input type='text' name='expression' defaultValue={this.state.solution.content}></input>
                    <input type='submit' value={this.state.buttonText}/>
                </form>
                     {calcMap}    
                {this.state.calculationField? <form onSubmit={this.addCalculation}>
                    <input type='text' name='calcExpression'></input>
                    <input type='text' name='comment'></input>
                    <input type='submit' value="Add Calculation"></input>
                </form> : null}
                {this.state.solution? <button id='calcFieldButton' onClick={this.calculationField}>{this.state.calculationField? "Cancel":"Add a Calculation"}</button> : null}
            </div>
        )
    }
}
