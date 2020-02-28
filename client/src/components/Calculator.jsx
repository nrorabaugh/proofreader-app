import React, { Component } from 'react'

export default class Calculator extends Component {

    evaluate = (evt) => {
        evt.preventDefault()
        if(evt.target.expression.value !== '') {
            //eslint-disable-next-line
            evt.target.expression.value = eval(evt.target.expression.value)
        }
    }

    colorFromKeys(evt) {
        if(document.getElementById(evt.key)){
            let button = document.getElementById(evt.key)
            button.style.backgroundColor = 'gray'
        }
    }

    reset(evt) {
        if(document.getElementById(evt.key)){
            let button = document.getElementById(evt.key)
            button.style.backgroundColor = null
        }
    }

    concat(evt) {
        let ci = document.getElementById('calcInput')
        let value = ci.value + evt.target.id
        ci.value = value
    }

    render() {
        return (
            <div className='calculator'>
                <form id='calc' onSubmit={this.evaluate}>
                    <input id='calcInput' type='text' onKeyDown={this.colorFromKeys} onKeyUp={this.reset} name='expression' autoComplete='off'></input>
                    <button id='equals' type='submit' form='calc'>=</button>
                </form>  
                <div className='cbWrap'>
                    <button onClick={this.concat} className='cb' id='1'>1</button>
                    <button onClick={this.concat} className='cb' id='2'>2</button>
                    <button onClick={this.concat} className='cb' id='3'>3</button>
                    <button onClick={this.concat} className='cb' id='C'>C</button>
                    <button onClick={this.concat} className='cb' id='4'>4</button>
                    <button onClick={this.concat} className='cb' id='5'>5</button>
                    <button onClick={this.concat} className='cb' id='6'>6</button>
                    <button onClick={this.concat} className='cb' id='*'>*</button>
                    <button onClick={this.concat} className='cb' id='7'>7</button>
                    <button onClick={this.concat} className='cb' id='8'>8</button>
                    <button onClick={this.concat} className='cb' id='9'>9</button>
                    <button onClick={this.concat} className='cb' id='/'>/</button>
                    <button onClick={this.concat} className='cb' id='^'>^</button>
                    <button onClick={this.concat} className='cb' id='0'>0</button>
                    <button onClick={this.concat} className='cb' id='-'>-</button>
                    <button onClick={this.concat} className='cb' id='+'>+</button>
                </div>
            </div>
        )
    }
}
