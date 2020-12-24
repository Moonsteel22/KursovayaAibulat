import React from 'react'
import { Redirect } from 'react-router-dom'

export default class RedirectToMain extends React.Component{
    render(){
        return(
            <Redirect to='/Main'></Redirect>
        )
    }
}
