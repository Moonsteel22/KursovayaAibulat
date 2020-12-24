import React from 'react'
import HeaderCss from '../Header/Header.module.css'

class Header extends React.Component{

    render(){
        return(
            <header className={HeaderCss["headerTop"]}>   
             <img alt="картинка" className={HeaderCss['circle']} src="https://pngimg.com/uploads/bitcoin/bitcoin_PNG42.png"></img>
             
            
                
            </header>
        )


    }
}
export default Header;