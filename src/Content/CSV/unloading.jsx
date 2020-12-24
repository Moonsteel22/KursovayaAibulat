import React from 'react'
import CSS from '../CSV/unloading.module.css'
import axios from 'axios'
class UnloadToCSV extends React.Component{
    constructor(props){
        super(props)
        this.state={
            startDate:"",
            endDate:"",
            filename:"",
            datareceived:false,
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.startDate!="" && this.state.endDate!="" && this.state.filename!="")
        axios.get("http://127.0.0.1:8000/UnloadingTx/"+this.state.startDate+"/"+this.state.endDate+"/"+this.state.filename)
        .then(res=>{
            alert("Success")
            this.setState({
                datareceived:true
            })
        })
        else {alert("Заполните пустое поле!")}
    }
    handleChanging=(e)=>{
        e.preventDefault();
        const {name,value}=e.target
        this.setState({
            [name]:value
        })
    }
    
    render(){
        if(this.state.datareceived===false)
        return(
            
            <div className={CSS.MainBlock}>
                <heh></heh>
                    <div className={CSS.someclass}>
                        
                        <div className={CSS.InputBlock}>
                            <h2>
                                Введите промежуток
                            </h2>
                            <div >
                            <form className={CSS.formInput} onSubmit={this.handleSubmit} className>
                                <input  
                                placeholder='Введите дату начала'
                                name='startDate' 
                                value={this.state.txHash} 
                                onChange={this.handleChanging}
                                type='date'>
                                
                                </input>
                                <input  
                                placeholder='Введите дату конца'
                                name='endDate' 
                                value={this.state.txHash} 
                                onChange={this.handleChanging}
                                type='date'>

                                </input>
                                <div>
                                    <input
                                    placeholder='Введите имя файла'
                                    name='filename' 
                                    value={this.state.catalog} 
                                    onChange={this.handleChanging}>

                                    </input>
                                    </div>
                                    <div>
                                    <input type="submit"></input>
                                    
                                    </div>
                                
                            </form>
                           
                            
                            
                            </div>
                            
                        </div>
                    </div>
            </div>
        )
        else{
            return(
            
                <div className={CSS.MainBlock}>
                    <heh></heh>
                        <div className={CSS.someclass}>
                            
                            <div className={CSS.InputBlock}>
                                <h2>
                                    Введите промежуток
                                </h2>
                                <div >
                                <form className={CSS.formInput} onSubmit={this.handleSubmit} className>
                                    <input  
                                    placeholder='Введите дату начала'
                                    name='startDate' 
                                    value={this.state.txHash} 
                                    onChange={this.handleChanging}
                                    type='date'>
                                    
                                    </input>
                                    <input  
                                    placeholder='Введите дату конца'
                                    name='endDate' 
                                    value={this.state.txHash} 
                                    onChange={this.handleChanging}
                                    type='date'>
    
                                    </input>
                                    <div>
                                        <input
                                        placeholder='Введите имя файла'
                                        name='filename' 
                                        value={this.state.catalog} 
                                        onChange={this.handleChanging}>
    
                                        </input>
                                        </div>
                                        <div>
                                        <input type="submit"></input>
                                        
                                        </div>
                                    
                                </form>
                                <a download href={this.state.filename+this.state.startDate+"_"+this.state.endDate+".csv"}>{this.state.filename+this.state.startDate+"_"+this.state.endDate+".csv"}</a>
                                
                                
                                </div>
                                
                            </div>
                        </div>
                </div>
            )
        }
    }









}
export default UnloadToCSV