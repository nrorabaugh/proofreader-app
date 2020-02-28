import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'

export default class Login extends Component {
    state = {
        users: [],
        currentUserHandle: '',
        currentPasswordHandle: '',
        loggedInUser: null
    }

    login = (evt) => {
        if(this.state.currentUserHandle === ''){
            document.getElementById('incorrect').innerText = 'Please enter your username'
            document.getElementById('incorrect').style.color = 'red'
        }
        if(this.state.currentPasswordHandle === ''){
            document.getElementById('incorrect').innerText = 'Please enter your password'
            document.getElementById('incorrect').style.color = 'red'
        }
        if(this.state.currentUserHandle === '' && this.state.currentPasswordHandle === ''){
            document.getElementById('incorrect').innerText = 'Please enter your login credentials'
            document.getElementById('incorrect').style.color = 'red'
        }
        evt.preventDefault()
        Axios.get(`/userApi/users/username/${this.state.currentUserHandle}/password/${this.state.currentPasswordHandle}`)
        .then((res) => {
            if(res.data === null) {
                document.getElementById('incorrect').innerText = 'Incorrect username or password'
                document.getElementById('incorrect').style.color = 'red'
            } else {
                localStorage.setItem("loggedInUser", JSON.stringify(res.data))
                this.setState({loggedInUser: res.data})
            }
        })
    }
    
    userHandle = (evt) => {
        const currentUserHandle = evt.target.value
        this.setState({currentUserHandle})
    }

    passwordHandle = (evt) => {
        const currentPasswordHandle = evt.target.value
        this.setState({currentPasswordHandle})
    }

    render() {
        let href = null
        if(this.state.loggedInUser && this.state.loggedInUser.role==="teacher") {href = `/admin/class/${this.state.loggedInUser._id}`}
        if(this.state.loggedInUser && this.state.loggedInUser.role==="student") {href = `/class/${this.state.loggedInUser.classId}`}
        return (
            <div>
                { this.state.loggedInUser? <Redirect to={href}/> :
                <div>
                    <div className='banner'><h1>ProofReader</h1></div>
                <form id='loginForm' className='userAccess' onSubmit={this.login}>
                    <p id='incorrect'>Incorrect username or password</p>
                    <input className='uaInput' type='text' name='username' autoComplete='off' placeholder='Username' onChange={this.userHandle}/>
                    <input className='uaInput' type='password' name='password' autoComplete='off' placeholder='Password' onChange={this.passwordHandle}/>
                </form>  
                <button className='loginButton' type='submit' form='loginForm'>Enter</button>
                <a href='/signup'>New User?</a>
                </div>}
            </div>
        )
    }
}