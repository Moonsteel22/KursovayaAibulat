import React from 'react'
import {BrowserRouter,Redirect,Route,Switch} from 'react-router-dom'
import Navigation from '../src/Navigation/Navigation.jsx'
import Header from '../src/Header/Header.jsx'
import AppCSS from '../src/App.module.css'
import ContentMain from './Content/Main/ContentContainer.jsx'
import Transactions from './Content/Transactions/Transactions.jsx'
import Transaction from './Content/Transactions/TransactionInfo/Transaction.jsx'
import Adress from './Content/Adress/Adress.jsx'
import Blocks from './Content/Blocks/Blocks'
import RedirectToMain from './Content/RedirectToMain'
import UnloadToCSV from './Content/CSV/unloading'
import TransactionForAddress from './Content/CSV/newfolder/txofAddress.jsx'
class App extends React.Component{
  render(){
    const pathid=new RegExp('/$')
    return(
      <div className={AppCSS['AppCss']}>
          <BrowserRouter>
          <Header/>
          <Navigation/>
          <Route component={ContentMain} exact path='/Main'/>
          <Route component={ContentMain} path={pathid}></Route>
          
          <Route component={Transactions} path="/Transactions"/>
          <Route component={Transaction} path="/Transaction"/>
          <Route component={Adress} exact path="/Address"/>
          <Route component={Blocks} exact path="/Blocks"/>
          <Route component={UnloadToCSV} exact path="/TxUnloading"/>
          <Route component={TransactionForAddress} exact path='/UnloadingAddressTx'/>
          {/* <Route/> */}
          </BrowserRouter>
      </div>
    )
  }
}

export default App;
