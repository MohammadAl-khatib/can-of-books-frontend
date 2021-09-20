import React, { Component } from 'react';

class Form extends Component {
    render() {
        return (
            <>
               <form onSubmit = {this.props.handleSubmit}>
                   <input type = "text" placeholder = "enter book name" onChange = {this.props.handleTitle}/>
                   <input type = "text" placeholder = "enter book description" onChange = {this.props.handleDescription} />
                   <input type = "text" placeholder = "enter book status" onChange = {this.props.handleStatus}/>
                   <input type = "text" placeholder = "enter user email" onChange = {this.props.handleEmail}/>
                   <input type ="submit" value = "add book"/>
               </form> 
            </>
        )
    }
}

export default Form;
