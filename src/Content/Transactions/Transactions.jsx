import Axios from 'axios'
import React from 'react'
import TransactionsCSS from '../Transactions/Transactions.module.css'

class Transactions extends React.Component{

    
// фыв
    constructor(props){
        super(props)
        
        this.state={
            SUTData:[],
            SCTData:[],
            BlockData:[]
        }
        
        
        
    
        
    


    }

    

    componentWillUnmount(){
        
    }
    convertTimeStamp=(timestamp)=> {
        var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
            dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
            ampm = 'AM',
            time;
    
        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }
    
        // ie: 2014-03-24, 3:00 PM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
        return time;
    }
    componentDidMount(){
        let Blocksocket=new WebSocket("wss://ws.blockchain.info/inv")
let socket=new WebSocket("wss://ws.blockchain.info/inv")
        Blocksocket.onopen=function(){
            Blocksocket.send("{\"op\":\"blocks_sub\"}")
        }
        Blocksocket.onmessage=(ev)=>{
            
            this.state.BlockData.push({'hash':JSON.parse(ev.data)['x']['hash'],'time':this.convertTimeStamp(JSON.parse(ev.data)['x']['time'])})
           this.setState({
               BlockData:this.state.BlockData
           })
        }

        socket.onopen=function(){
            
            socket.send("{\"op\":\"5000\"}")
            socket.send("{\"op\":\"unconfirmed_sub\"}")
        }
        socket.onmessage=(e)=>{
            console.log(e.data)
            this.state.SUTData.push({'hash':JSON.parse(e.data)['x']['hash'],'time':this.convertTimeStamp(JSON.parse(e.data)['x']['time'])})
            if(this.state.SUTData.length>10)
            {   
                this.state.SUTData.reverse()
                this.state.SUTData.pop()
                this.state.SUTData.reverse()
            }
           this.setState({
               SUTData:this.state.SUTData
           })
        }
    }

   


    render(){  
        

        const SingleTransaction = (props)=>{
            return(<div className={TransactionsCSS.SingleUTransaction}>
                    <div className={TransactionsCSS.SingleUTXHash}><a className={TransactionsCSS.SingleUTXHashAref} href={"http://localhost:3000/Transaction/"+props.hash}>{props.hash}</a></div>
                    <div className={TransactionsCSS.SingleUTXTime}><span >{props.time}</span></div>
                    
                </div>)
        }
        
        let SingleUTransactionMap=this.state.SUTData
        .map(props=> <SingleTransaction hash={props.hash} time={props.time} />
        )
        let SingleCTransactionMap=this.state.BlockData
        .map(props=> <SingleTransaction hash={props.hash} time={props.time} />
        )
    
    const TransactionInfoPanel=(props)=>{
        return(
            <div className={TransactionsCSS.TransactionInfo}>
                <div className={TransactionsCSS.InfoHash}><span>{props.hash}</span></div>
                <div className={TransactionsCSS.InfoTime} id="Time"><span>{props.time}</span></div>
                
            </div>
        )
    }


        
        return(
            <div className={TransactionsCSS['MainCSS']}> {/* Блок всех блоков транзакций */}
            <div className={TransactionsCSS.CommonTInfoBlock}>
                <div className={TransactionsCSS.Information}> {/* Блок неп.транзакций */}
                <h3>Последние неподтвержденные транзакции: </h3>
                    <div className={TransactionsCSS.FirstData}>
                        
                            <TransactionInfoPanel hash="Хэш" time='Время' />
                        
                        <div className={TransactionsCSS.UTransactionBlock}>
                                    {SingleUTransactionMap}
                        </div>
                        
                    </div>
                </div>
                <div className={TransactionsCSS.Information}> {/* Блок неп.транзакций */}
                <h3>Последние блоки: </h3>
                    <div className={TransactionsCSS.FirstData}>
                        
                            <TransactionInfoPanel hash="Хэш" time='Время'/>
                        
                        <div className={TransactionsCSS.UTransactionBlock}>
                                    {SingleCTransactionMap}
                        </div>
                        
                    </div>
                    </div>
                </div>
               
            </div>

        )
    }
}
export default Transactions
