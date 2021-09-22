import React, { Component } from 'react'

class UpdateForm extends Component {
    render() {
        return (
            <>
                 <form onSubmit = {this.props.handleUpdateSubmit}>
                   <input type = "text" onChange = {this.props.handleTitle} />
                   <input type = "text" onChange = {this.props.handleDescription} />
                   <input type = "text" onChange = {this.props.handleStatus} />
                   <input type = "text" onChange = {this.props.handleEmail} />
                   <input type ="submit" value = 'Update Book' style ={{"backgroundColor":"red", "color":"blue"}}/>
               </form> 
            </>
        )
    }
}

export default UpdateForm
