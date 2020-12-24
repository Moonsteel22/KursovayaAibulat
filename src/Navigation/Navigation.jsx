import React from 'react'
import NavBar from '../Navigation/Navigation.module.css'
import {NavLink} from 'react-router-dom'

const NavigationLink=(props)=>{
    return (<div className={NavBar.NavLinkBlock}><NavLink activeClassName={NavBar['active']} to={props.path}>{props.message}</NavLink></div>     
    )
    }


class Navigation extends React.Component{

    render(){
        return(
            <nav className={NavBar['navTop']}>
                <div className={NavBar["navList"]}>

                    <NavigationLink  message='• Главная'  path='/Main'/>     
                   
                    <NavigationLink  message='• Транзакции' path='/Transactions'/>
                    
                    <NavigationLink  message='• Адреса' path='/Address'/>

                    <NavigationLink  message='• Блоки' path='/Blocks'/>
                    
                    <NavigationLink  message='• Выгрузка   транзакций' path='/TxUnloading'/>

                    <NavigationLink  message='• Выгрузка   транзакций адреса' path='/UnloadingAddressTx'/>
                </div>

            </nav>

        )
    }
}

export default Navigation;