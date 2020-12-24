import React from 'react'
import CSS from './Transaction.module.css'
import Axios from 'axios'
import {Link} from 'react-router-dom'
class Transaction extends React.Component{
    constructor(props){
        super(props)
        this.state={
            Hash:"",
            DataReceived:false,
            InputHashList:[
            
            ],
            OutputHashList:[
            
            ],
            TxInfo:[{}]
        }
        this.handleChangeForm=this.handleChangeForm.bind(this)
        this.handleSubmitForm=this.handleSubmitForm.bind(this)
    }
    componentDidMount(){
       if(window.location.href.slice(30).length>8 && window.location.href.slice(34)!='undefined'){
        Axios("http://127.0.0.1:8000/Transaction/"+window.location.href.slice(34))
        .then((res)=>{
            
            if(res.data[0]['Code']==200){
                console.log(res.data)
                this.setState({
                    DataReceived:true,
                    InputHashList:res.data[0]['InputAddrList'],
                    OutputHashList:res.data[0]['OutputAddrList'],
                    TxInfo:res.data[0]['TxInfo'],
                })
                console.log(this.state.TxInfo)
            }
            else{ alert("Проверьте корректность хэша!")
        }
        })
    }
    }
    handleSubmitForm(e){
        e.preventDefault()
        Axios("http://127.0.0.1:8000/Transaction/"+this.state.Hash)
        .then((res)=>{
            
            if(res.data[0]['Code']==200){
                console.log(res.data)
                this.setState({
                    DataReceived:true,
                    InputHashList:res.data[0]['InputAddrList'],
                    OutputHashList:res.data[0]['OutputAddrList'],
                    TxInfo:res.data[0]['TxInfo'],
                })
                console.log(this.state.TxInfo)
            }
            else alert("Проверьте корректность хэша!")
        })
    }
    
    handleChangeForm(e){
        e.preventDefault()
        this.setState({
            Hash:e.target.value
        })

    }

    linkClick=(e)=>{
        e.preventDefault()
        console.log(e.target.href.slice(22))
        Axios("http://127.0.0.1:8000/Address/"+e.target.href.slice(22))
        .then((res)=>{
            
            if(res.data[0]['Code']==200){
                console.log(res.data)
                this.setState({
                    DataReceived:true,
                    InputHashList:res.data[0]['InputAddrList'],
                    OutputHashList:res.data[0]['OutputAddrList'],
                    TxInfo:res.data[0]['TxInfo'],
                })
                console.log(this.state.TxInfo)
            }
            else alert("Проверьте правильность адреса!")
        })
    }

    render(){
       


        var InputHashMapFunction = this.state.InputHashList.map(
            props=>
                <div key={props['InputAddr']} className={CSS.InputHashMap}>
                    <div className={CSS.InputHashMapHash}>
                        <div className={CSS.InputHashMapHashOverflow}><a href={'http://localhost:3000/Address/'+props.InputAddr}>{props["InputAddr"]}</a></div></div>
                    <div className={CSS.InputHashMapBTC}><span >{props.InputBTC}</span></div>
                </div>
            
        )

        var OutputHashMapFunction = this.state.OutputHashList.map(
            props=>
                <div key={props['OutputAddr']} className={CSS.OutputHashMap}>
                    <div className={CSS.OutputHashMapHash}>
                        <div className={CSS.OutputHashMapOverflow}><a  href={'http://localhost:3000/Address/'+props.OutputAddr}  >{props["OutputAddr"]}</a></div>
                        </div>
                    <div className={CSS.OutputHashMapBTC}><span>{props.OutputBTC}</span></div>
                </div>
            
        )
        if(this.state.DataReceived==true){
        return(
            <div className={CSS.Main}>
                <div className={CSS.Information}>
                 <div className={CSS.InformationBlock}>
                     <h2>Введите хэш транзакции</h2>
                     
                    <form id="HashFormTT" className={CSS.justanotherclass} >
                        <input id="HashInputT" className={CSS.InputForm} value={this.state.Hash} onChange={this.handleChangeForm}></input>
                        <input id="TxInputButtonT"   type="submit"></input>
                    </form>
                    
                    <div className={CSS.InformationPanelMain}>
                        <h2>Информация</h2>
                    </div>
                    <div className={CSS.InformationPanelBlock}>
                        <div className={CSS.hashBlock}>
                            <div className={CSS.hash}><span>Хэш</span></div>
                            <div><span>{this.state.TxInfo[0]['Hash']}</span></div>
                        </div>
                        <div className={CSS.StatusBlock}>
                            <div className={CSS.Status}><span>Статус</span></div>
                            <div><span>{this.state.TxInfo[0]['Status']}</span></div>
                        </div>
                        <div className={CSS.TimeGetBlock}>
                            <div className={CSS.TimeGet}><span>Время получения</span></div>
                            <div><span>{this.state.TxInfo[0]['Time']}</span></div>
                        </div>
                        <div className={CSS.SizeBlock}>
                            <div className={CSS.Size}><span>Размер</span></div>
                            <div><span>{this.state.TxInfo[0]['Size']} байт</span></div>
                        </div>
                        <div className={CSS.SizeBlock}>
                            <div className={CSS.Size}><span>Вес</span></div>
                            <div><span>{this.state.TxInfo[0]['Weight']}</span></div>
                        </div>
                        <div className={CSS.InputsBlock}>
                            <div className={CSS.Inputs}><span>Общее кол-во входов</span></div>
                            <div><span>{this.state.TxInfo[0]['Inputs']}</span></div>
                        </div>
                        <div className={CSS.OutputsBlock}>
                            <div className={CSS.Outputs}><span>Выходы</span></div>
                            <div><span>{this.state.TxInfo[0]['Out']}</span></div>
                        </div>
                        <div className={CSS.OutputsBlock}>
                            <div className={CSS.Outputs}><span>Содержится в блоке</span></div>
                            <div><span>{this.state.TxInfo[0]['ContBlock']}</span></div>
                        </div>
                    </div>
                 </div>
                 <div className={CSS.AdressBlock}>
                    <div className={CSS.AdressName}>
                         <h2>Адреса</h2>
                    </div>
                    <div className={CSS.AdressBlockName}>
                        <div className={CSS.AdressInfoPanel}>
                            <div className={CSS.AdressInfoPanelInput}><h4>Входы</h4></div>
                            <div className={CSS.AdressInfoPanelInputBTC}><h4>BTC</h4></div>
                            <div className={CSS.AdressInfoPanelOutput}><h4>Выходы</h4></div>
                            <div className={CSS.AdressInfoPanelOutputBTC}><h4>BTC</h4></div>
                        </div>
                        <div className={CSS.CommonHashBlock}>
                            <div className={CSS.InputHashBlock}>
                                {InputHashMapFunction}
                            </div>
                            <div className={CSS.OutputHashBlock}>
                                {OutputHashMapFunction}
                            </div>
                        </div>
                     </div>
                 </div>
                 
                 </div>
            </div>
           
        )
        }
        return(
            <div className={CSS.Main}>
            <div className={CSS.Information}>
             <div className={CSS.InformationBlock}>
                 <h2>Введите хэш транзакции</h2>
                 <form className={CSS.justanotherclass} id="HashFormTF" onSubmit={this.handleSubmitForm}>
                        <input id="HashInputT" className={CSS.InputForm} value={this.state.Hash} onChange={this.handleChangeForm}></input>
                        <input id="TxInputButtonF"  type="submit"></input>
                    </form>
                </div>
                </div>
                </div>
        )
    }
}

export default Transaction