import React, { Component } from 'react'

class Profile extends Component {
    render() {
        return (
            <>
               <h3>{this.props.name}</h3> 
               <h3>{this.props.email}</h3>
               <img src = {this.props.picture} alt = "personal profile"/>
            </>
        )
    }
}

export default Profile
