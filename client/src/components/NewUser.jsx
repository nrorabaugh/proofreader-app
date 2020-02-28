import React, { Component } from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class NewUser extends Component {

    state = {
        status: null,
        class: {},
        user: {},
        exClass: {},
        joined: false
    }

    setStatus = (evt) => {
        this.setState({status: evt.target.id})
    }

    findClass = (evt) => {
        evt.preventDefault()
        Axios.get(`/classroomApi/classrooms/${evt.target.classId.value}`)
        .then((res) => {
            this.setState({exClass: res.data, status: "studentJoin"})
        })
    }

    createTeacher = async (evt) => {
        evt.preventDefault()
        let teacher = {
            username: evt.target.username.value,
            password: evt.target.password.value,
            classId: 0,
            role: "teacher"
        }
        Axios.get(`/usernameApi/usernames/extant/${teacher.username}`)
        .then((res) => {
            if(res.data !== null) {
                alert("Username taken")
            }
            if(res.data === null) {
                Axios.post('/userApi/users', teacher)
                .then((res) => {
                    let username = {
                        userId: res.data._id,
                        username: res.data.username
                    }
                    Axios.post('/usernameApi/usernames', username)
                })
                this.setState({user: teacher, status: 'class'})
            }
        })
    }

    createStudent = (evt) => {
        evt.preventDefault()
        let student = {
            username: evt.target.username.value,
            password: evt.target.password.value,
            classId: this.state.exClass._id,
            role: "student"
        }
        Axios.get(`/usernameApi/usernames/extant/${student.username}`)
        .then((res) => {
            console.log(res)
            if(res.data !== null) {
                alert("Username taken")
            }
            if(res.data === null) {
                Axios.post('/userApi/users', student)
                .then((res) => {
                    let username = {
                        userId: res.data._id,
                        username: res.data.username
                    }
                    Axios.post('/usernameApi/usernames', username)
                })
                setTimeout(() => {
                    Axios.get(`/userApi/users/username/${student.username}/password/${student.password}`)
                    .then((res) => {
                        localStorage.setItem("loggedInUser", JSON.stringify(res.data))
                        this.setState({user: res.data, joined: true})
                    })
                }, 200)
            }
        })        
    }

    createClass = (evt) => {
        evt.preventDefault()
        let thisClass = {
            name: evt.target.className.value,
            teacherId: null
        }
        Axios.get(`/userApi/users/username/${this.state.user.username}/password/${this.state.user.password}`)
        .then((res) => {
            localStorage.setItem('loggedInUser', JSON.stringify(res.data))
            this.setState({user: res.data})
            thisClass.teacherId = res.data._id
            Axios.post('/classroomApi/classrooms', thisClass)
        })
        setTimeout( () => {
            Axios.get(`/classroomApi/classrooms/teacher/${thisClass.teacherId}`)
            .then((res) => {
                this.setState({class: res.data})
            })
        }, 200)
    }

    render() {
        let href = 'string'
        if(this.state.class._id) {
            href=`/admin/class/${this.state.class._id}`
        }
        let studentHref = 'string'
        if(this.state.exClass._id) {
            studentHref=`/class/${this.state.exClass._id}`
        }
        return (
            <div>
                {this.state.status === null? 
                <div><div className='banner'><h1>What are you?</h1></div>
                    <button id="teacher" onClick={this.setStatus}>Teacher</button>
                    <button id="student" onClick={this.setStatus}>Student</button>
                </div> : null}
                {this.state.status === 'teacher'?
                <div>
                    <div className='banner'><h1>Choose your Credentials</h1></div>
                    <form className='vertForm' onSubmit={this.createTeacher}>
                        <input type='text' name='username' placeholder='Username'></input>
                        <input type='password' name='password' placeholder='Password'></input>
                        <input type='submit' value='Sign Up'></input>
                    </form> </div>: null}
                {this.state.status === 'class'?
                <div><div className='banner'><h1>Create your Class</h1></div>
                    <form className='vertForm' onSubmit={this.createClass}>
                        <input type='text' name='className' placeholder='Your Class Name'></input>
                        <input type='submit' value='Create Class'/>
                    </form> </div>: null}
                {this.state.class._id === undefined? null : <Redirect to={href}></Redirect> }
                {this.state.joined? <Redirect to={studentHref}></Redirect> : null}
                {this.state.status === 'student'? <div>
                    <div className='banner'><h1>Find your Class</h1></div>
                    <form className='vertForm'onSubmit={this.findClass}>
                        <input type='text' name='classId' placeholder='Your Class ID'></input>
                        <input type='submit' value='Find Class'></input>
                    </form>
                </div> : null}
                {this.state.status === 'studentJoin'? <div>
                    <div className='banner'><h1>{this.state.exClass.name}</h1><h1>Choose your Credentials</h1></div>
                    <form className='vertForm' onSubmit={this.createStudent}>
                        <input type='text' name='username' placeholder='Username'></input>
                        <input type='password' name='password' placeholder='Password'></input>
                        <input type='submit' value='Create Account'></input>
                    </form>
                </div> : null}
            </div>
        )
    }
}
