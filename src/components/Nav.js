import React, { Component } from 'react'
import {Link} from "react-router-dom";
export class Nav extends Component {
    render() {
        return (
            <div style ={{"display":"block"}}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    
                </ul>
            </div>
        )
    }
}

export default Nav