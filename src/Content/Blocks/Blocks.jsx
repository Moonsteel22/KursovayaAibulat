import React from 'react'
import CSS from '../Blocks/Blocks.module.css'
import Axios from 'axios'
class Blocks extends React.Component{
   constructor(props){
        super(props)
        this.state={
            Wrong:false,
            FormContain:"",
            TransactionsBlock:[],
            Block:[],
            DataReceived:false,
        }
        this.componentDidMount=this.componentDidMount.bind(this)
    }
    componentDidMount(){
        if(window.location.href.slice(29).length>8 && window.location.href.slice(29)!='undefined'){
            Axios("http://127.0.0.1:8000/Blocks/"+window.location.href.slice(29))
        .then((res)=>{
            if(res.data[0]['Code']==200){
                this.setState({
                    DataReceived:true,
                    TransactionsBlock:res.data[0]['TransactionsBlock'],
                    Block:res.data[0]['Block'],
                })
            }
            else alert("Неправильный номер/хэш блока!")
        },
        (error)=>{
            console.log("Error happend!",error)
        })
    }
}

    formSubmit=(e)=>{
        e.preventDefault()
        Axios("http://127.0.0.1:8000/Blocks/"+this.state.FormContain)
        .then((res)=>{
            if(res.data[0]['Code']==200){
            console.log("Data received!",res.data)
            this.setState({
                DataReceived:true,
                TransactionsBlock:res.data[0]['TransactionsBlock'],
                Block:res.data[0]['Block'],
            })
            }
            else alert("Неправильный номер/хэш блока!")
        },
        (error)=>{
            alert("Ошибка!")
        })
    }

    formChange=(e)=>{
        e.preventDefault()
        this.setState({
            FormContain:e.target.value
        })
    }

    render(){
        

  var IOMap=this.state.TransactionsBlock.map(
    (props)=>{
        var IMap=props["Inputs"].map(
            props1=>
            <div className={CSS.IAdressesBlock}>
                <div className={CSS.IEmptyBlock}>

                </div>
                <div className={CSS.IExistAdressesBlock}>
                        <div className={CSS.InputAdress}><a href={props1["Address"]}> {props1["Address"]}</a></div>
                        <div className={CSS.BTCOfAdress}><span> {props1["BTC"]} BTC</span></div>
                </div>
             </div>
        )

        var OMap=props["Outputs"].map(
            props2=>
            
            <div className={CSS.OAdressesBlock}>
                <div className={CSS.OEmptyBlock}>
                
                </div>
                <div className={CSS.OExistAdressesBlock}>
                    <div className={CSS.OutputAdress}><a href={props2["Address"]}> {props2["Address"]}</a></div>
                    <div className={CSS.BTCOfAdress}><span> {props2["BTC"]} BTC</span></div>
                </div>
            </div>
        )
        return(
    <div className={CSS.IOMainDiv}>
    <div className={CSS.HashBlock}>
        <div className={CSS.HashWithName}>
            <div className={CSS.HashName}><span>Хэш</span></div>
        <div className={CSS.Hash}><a href={"Transaction/"+props["hash"]}>{props['hash']}</a></div>
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

        if(!this.state.DataReceived)
        return(
            <div className={CSS.MainBlock}>
            <div className={CSS.InputBlock}>
                    <div className={CSS.EnterAdressText}>
                            <h2>Введите блок</h2>
                        </div>
                        <form id="BlockInputForm" onSubmit={this.formSubmit} >
                            <input id="BlockInput" onChange={this.formChange} className={CSS.InputForm} value={this.state.FormContain} />
                            <input id="BlockInputSubmit" className={CSS.acceptButton} type="submit"/>
                        </form>
                </div>
            </div>
        )
        else
        return(
            <div className={CSS.MainBlock}>
                <div className={CSS.InputBlock}>
                    <div className={CSS.EnterAdressText}>
                            <h2>Введите блок</h2>
                        </div>
                        <form id="BlockInputForm" onSubmit={this.formSubmit} >
                            <input id="BlockInput" onChange={this.formChange} className={CSS.InputForm} value={this.state.FormContain} />
                            <input id="BlockInputSubmit" className={CSS.acceptButton} type="submit"/>
                        </form>
                </div>
                    <div className={CSS.DescriptionBlock}>
                        <div className={CSS.AdressMainText}><h2>Блок</h2></div>
                        <div className={CSS.AdressField}>
                            <div className={CSS.AdressText}><span>Хэш</span></div>
                            <div>{this.state.Block[0]["hash"]}</div>
                        </div >
                        <div className={CSS.AdressTransactionField}>
                            <div className={CSS.TransactionText}><span>Количество транзакций</span></div>
                            <div>{this.state.Block[0]["quantTx"]}</div>
                        </div>
                        <div className={CSS.AdressBTCAcceptField}>
                            <div className={CSS.AcceptBTCText}><span>Время</span></div>
                            <div>{this.state.Block[0]["time"]}</div>
                        </div>
                        <div className={CSS.AdressBTCSendField}>
                            <div className={CSS.SendBTCText}><span>Высота</span></div>
                            <div>{this.state.Block[0]["height"]}</div>
                        </div >
                        <div className={CSS.AdressBalanceField}>
                            <div className={CSS.BalanceText}><span>Биты</span></div>
                            <div>{this.state.Block[0]["bits"]}</div>
                        </div>
                        <div className={CSS.AdressBalanceField}>
                            <div className={CSS.BalanceText}><span>Размер</span></div>
                            <div>{this.state.Block[0]["size"]}</div>
                        </div>
                        <div className={CSS.AdressBalanceField}>
                            <div className={CSS.BalanceText}><span>Комиссионное вознаграждение</span></div>
                            <div>{this.state.Block[0]["fee"]}</div>
                        </div>
                        
                        
                    </div>
                    <div className={CSS.TransactionsBlock}>
                        <div><h2>Транзакции</h2></div>
                        {IOMap}
                    </div>
                    </div>
        )
    }
}

export default Blocks;