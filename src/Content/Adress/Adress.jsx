import React from 'react'
import CSS from '../Adress/Adress.module.css'

import Axios from 'axios'
class Adress extends React.Component{
constructor(props){
    super(props)
    this.state={
        formAdress:"",
        AddressReceived:false,
        TransactionsAdress:[],
        AdressInfo:[{
                 "Adress":"","Transaction":100,"AcceptBTC":100,"SendBTC":100,"Balance":0
             }]
        
        
    }
    this.componentDidMount=this.componentDidMount.bind(this)
    this.handleAdressChange=this.handleAdressChange.bind(this)
}
        
   componentDidMount(prevProps,prevState){
       console.log(window.location.href.slice(30))
       if(window.location.href.slice(30)!='' && window.location.href.slice(30)!='undefined'){
    Axios.get("http://127.0.0.1:8000/Address/"+window.location.href.slice(30))
    .then((res)=>{
        console.log(res.data)
    if(res.data[0]['Code']===200){
        console.log(res.data)
        this.setState({
            formAdress:this.state.formAdress,
            AddressReceived:true,
            TransactionsAdress:res.data[0]['Transactions'],
            AdressInfo:res.data[0]['AdressInfo']
        })
        }
    },
(error)=>{
    console.log("Error happend!",error)
});
       }
   }
    handleAdressChange=(event)=>{
        event.preventDefault()
        this.setState({
            formAdress:event.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        console.log(this.state.formAdress)
        Axios.get("http://127.0.0.1:8000/Address/"+this.state.formAdress)
        .then((res)=>{
            console.log(res.data)
        if(res.data[0]['Code']===200){
            console.log(res.data)
            this.setState({
                formAdress:this.state.formAdress,
                AddressReceived:true,
                TransactionsAdress:res.data[0]['Transactions'],
                AdressInfo:res.data[0]['AdressInfo']
            })
            }
        },
    (error)=>{
        console.log("Error happend!",error)
    });
        
    }
    
    changingAddress=(e)=>
    {
        this.setState({
            formAdress:e.target.value,
        })
    }

    render(){

  var IOMap=this.state.TransactionsAdress.map(
    (props)=>{
        var IMap=props["Inputs"].map(
            props1=>
            <div key={props1.Address} className={CSS.IAdressesBlock}>
                <div className={CSS.IEmptyBlock}>

                </div>
                <div className={CSS.IExistAdressesBlock}>
                        <div className={CSS.InputAdress}><a href={"http://localhost:3000/Adress/"+props1["Address"]}> {props1["Address"]}</a></div>
                        <div className={CSS.BTCOfAdress}><span> {props1["BTC"]} BTC</span></div>
                </div>
             </div>
        )

        var OMap=props["Outputs"].map(
            props2=>
            
            <div key={props2.Address} className={CSS.OAdressesBlock}>
                <div className={CSS.OEmptyBlock}>
                
                </div>
                <div className={CSS.OExistAdressesBlock}>
                    <div className={CSS.OutputAdress}><a value={props2["Address"]} href={"http://localhost:3000/Address/"+props2["Address"]}> {props2["Address"]}</a></div>
                    <div className={CSS.BTCOfAdress}><span> {props2["BTC"]} BTC</span></div>
                </div>
            </div>
        )
        return(
    <div key={props['hash']} className={CSS.IOMainDiv}>
    <div className={CSS.HashBlock}>
        <div className={CSS.HashWithName}>
            <div className={CSS.HashName}><span>Хэш</span></div>
        <div className={CSS.Hash}><a href={"http://localhost:3000/Transaction/"+props["hash"]}>{props['hash']}</a></div>
        </div>
        <div className={CSS.TransactionTime}>
            <div className={CSS.TimeEmptyBlock}>  </div>
            <div className={CSS.Time}>{props["Time"]}</div>
        </div>
        
    </div>
    
    <div className={CSS.IOAdressesBlock}>
        <div className={CSS.FlexInput}>
        {IMap}
        </div>
        <div className={CSS.FlexOutput}>
        {OMap}
        </div>
    </div>
    </div>
        )
    }
)
        

        if(this.state.AddressReceived===true)
        return(
            
            <div className={CSS.MainBlock}>
                <div className={CSS.InputBlock}>
            <div className={CSS.EnterAdressText}>
                <h2>Введите адрес</h2>
             </div>
            <form id="AdressForm" onSubmit={this.handleSubmit}>
                <input id="FieldForAddress" className={CSS.InputForm} value={this.state.formAdress} onChange={this.changingAddress}></input>
                <input id="AdressNameFalseSubmit"  type="submit"/>
            </form>
        
            </div>
                <div className={CSS.AdressBlock}>
               
                    
                    <div className={CSS.DescriptionBlock}>
                        <div className={CSS.AdressMainText}><h2>Адрес</h2></div>
                        <div className={CSS.AdressField}>
                            <div className={CSS.AdressText}><span>Адрес</span></div>
                            <div>{this.state.AdressInfo[0]["Adress"]}</div>
                        </div >
                        <div className={CSS.AdressTransactionField}>
                            <div className={CSS.TransactionText}><span>Транзакций</span></div>
                            <div>{this.state.AdressInfo[0]["Transaction"]}</div>
                        </div>
                        <div className={CSS.AdressBTCAcceptField}>
                            <div className={CSS.AcceptBTCText}><span>Принято BTC</span></div>
                            <div>{this.state.AdressInfo[0]["AcceptBTC"]}</div>
                        </div>
                        <div className={CSS.AdressBTCSendField}>
                            <div className={CSS.SendBTCText}><span>Отправлено BTC</span></div>
                            <div>{this.state.AdressInfo[0]["SendBTC"]}</div>
                        </div >
                        <div className={CSS.AdressBalanceField}>
                            <div className={CSS.BalanceText}><span>Баланс</span></div>
                            <div>{this.state.AdressInfo[0]["Balance"]}</div>
                        </div>
                    </div>
                    <div className={CSS.TransactionsBlock}>
                        <div><h2>Транзакции</h2></div>
                        <div className={CSS.NextTxsBlock}>
                        {IOMap}
                        </div>
                    </div>
    
                </div>
                
            </div>

        );else  return(
            
            <div className={CSS.MainBlock}>
                
                <div className={CSS.AdressBlock}>
                <div className={CSS.InputBlock}>
            <div className={CSS.EnterAdressText}>
                <h2>Введите адрес</h2>
             </div>
            <form id="AdressForm" onSubmit={this.handleSubmit}>
                <input id="FieldForAddress" className={CSS.InputForm} value={this.state.formAdress} onChange={this.changingAddress}></input>
                <input id="AdressNameFalseSubmit"  type="submit"/>
            </form>
        
            </div>
                </div>
                
            </div>

        )
    }
}
export default Adress