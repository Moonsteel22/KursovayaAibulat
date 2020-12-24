import React from 'react'
import { LineChart,Tooltip,Legend } from 'recharts'
import CC from "../Main/ContainerCSS.module.css"
import axios from 'axios'
import {XAxis,YAxis,Line,CartesianGrid} from 'recharts'
class ContentMain extends React.Component{
    constructor(props){
      super(props)
      this.state={
          BTCConstPeriod:'1years',
          TransactionsPeriod:'1years',
          ConfirmedPeriod:'1years',
          ChartsData:[],
          DataReceived:false,
      }


    }
    componentDidMount(){
      axios.get("http://127.0.0.1:8000/Main")
      .then(res=>{
        console.log(res.data)
        this.setState({
          ChartsData:res.data[0],
          DataReceived:true,
        })
      })
    }
   
    render(){
      
      
      if(this.state.DataReceived){
      var InfoPanel=[
        {'name': "CursPanel",message: "Курс криптовалюты","value":this.state.ChartsData['stats']["market_price_usd"]+"$"},
        {'name':"TransactionCountPanel", message:"Кол-во подтвержденных транзакций","value":this.state.ChartsData['stats']['n_tx']},
        {'name':"Mempul quantity Panel", message:"Размер мемпула(байты)","value":this.state.ChartsData['stats']['mempool_size']},
        {'name':"Mempul quantity Panel", message:"Кол-во блоков","value":this.state.ChartsData['stats']['n_blocks_total']}
      ]
      var InfoPanelMap=InfoPanel
    .map(props=> <div name={props.name} className={CC.mainContainerStatsElement}><h2>{props.value}</h2><p>{props.message}</p></div>)
        return(
            
            <div className={CC.ContainerCSS}>
                <div className={CC.mainContainerStats}>
                    {InfoPanelMap}
                    
                </div>
                
                <div className={CC.mainCharts}>
                  <div className={CC.TxNumberChart}>
                    <div className={CC.MempSizeSpan}><span>Кол-во транзакций в мемпуле</span></div>
                <LineChart name="Mempool_size" className={CC.chartBackground} width={600} height={300} data={this.state.ChartsData['avg_confirmed_tx']['values']}>
                  <XAxis dataKey="x"/>
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip/>
           
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                  <Line dot={false} type="linear" dataKey="y" stroke="#8884d8" />
                  
                </LineChart>
                </div>
                
                <div className={CC.avg_confirmed}>
                <div className={CC.MempSizeSpan}> <span>Кол-во транзакций(подтв.)</span></div>
                <LineChart className={CC.chartBackground} width={600} height={300} data={this.state.ChartsData['n_transactions']['values']}>
                  <XAxis  dataKey="x"/>
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip/>
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                  <Line dot={false} type="linear" dataKey="y" stroke="#8884d8" />
                  
                </LineChart>
                
                </div>
                <div className={CC.priceChart}>
                <div className={CC.priceName}><span>Цена биткоина(USD)</span></div>
                <LineChart className={CC.break} width={1000} height={300} data={this.state.ChartsData['price_chart']['values']}>
                  <XAxis dataKey="x"/>
                  <YAxis/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip/>
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                  <Line dot={false} type="linear" dataKey="y" stroke="#8884d8" />
                  
                </LineChart>
                </div>
                </div>
            </div>
            

        )}
        else return (<div className={CC.ContainerCSS}>
          <div className={CC.mainContainerStats}>
             
          </div>
          <div className={CC.mainCharts}>
            <div className={CC.TxNumberChart}>
          <LineChart name="Mempool_size"  className={CC.chartBackground} width={600} height={300}>
            <XAxis label="Mempool" dataKey="x"/>
            <YAxis/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line activeDot={{ r: 2 }} type="linear" dataKey="y" stroke="#8884d8" />
            
          </LineChart>
          </div>
          <div className={CC.avg_confirmed}>
          <LineChart className={CC.chartBackground} width={600} height={300}>
            <XAxis dataKey="x"/>
            <YAxis/>
            <Tooltip/>
            
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line dot={false} type="linear" dataKey="y" stroke="#8884d8" />
            
          </LineChart>
          </div>
          <div className={CC.priceChart}>
          <LineChart className={CC.break} width={1000} height={300}>
            <XAxis dataKey="x"/>
            <YAxis/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="linear" dataKey="y" stroke="#8884d8" />
            
          </LineChart>
          </div>
          </div>
      </div>
      )
    }
}
export default ContentMain