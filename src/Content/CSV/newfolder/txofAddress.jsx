import React from 'react'
import CSS from '../newfolder/newCSSfile.module.css'
import axios from 'axios'



class TransactionForAddress extends React.Component{
    constructor(){
        super()
        this.state={
            Address:"",
            datareceived:false
        }
    }

    handleSubmit=(e)=>{
        
        e.preventDefault();
        if(this.state.Address!="")
        axios.get("http://127.0.0.1:8000/UnloadingAddressTx/"+this.state.Address)
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
            Address:e.target.value
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
                                Введите адресс
                            </h2>
                            <div >
                            <form id="FormAdddd" className={CSS.formInput} onSubmit={this.handleSubmit} className>
                                
                                <div>
                                    <input
                                    placeholder='Введите адрес'
                                    name="SomeAddress"
                                    value={this.state.Address} 
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
                                    Введите адресс
                                </h2>
                                <div >
                                <form className={CSS.formInput} onSubmit={this.handleSubmit} className>
                                    
                                    <div>
                                        <input
                                        placeholder='Введите адрес'
                                        name="SomeAddress"
                                        value={this.state.Address} 
                                        onChange={this.handleChanging}>
    
                                        </input>
                                        </div>
                                        <div>
                                        <input type="submit"></input>
                                        
                                        </div>
                                    
                                </form>
                                <a id="LinkK" download href={this.state.Address+".csv"}>{this.state.Address+".csv"}</a>
                                
                                
                                </div>
                                
                            </div>
                        </div>
                </div>
            )
        }
    }

    // constructor(props){
    //     super(props)
    //     this.state={
    //         Address:"",
    //         DataReceived:false
    //     }
    // }
    // componentDidMount(){

    // }
    // handleSubmitt=(e)=>{
    //     e.preventDefault()
    //     console.log("asdasd")
    //     if(this.state.Address!=""){
    //     axios.get("http://127.0.0.1:8000/UnloadingAddressTx/"+this.state.Address)
    //     .then(res=>{
    //         alert("succes")
    //             this.setState({
    //                 DataReceived:true
                    
    //             })
    //         }
    //     )
    // }
    // else{
    //     alert("Заполните пустое поле!")
    // }
    // }
    // handleChangingg=(e)=>{
    //     e.preventDefault()
    //     const {name,value}=e.target
    //     this.setState({
    //         [name]:value
    //     })
    // }

    // render(){
    //     if(this.state.DataReceived==true)
    //         return(
    //             <div className={CSS.MainBlock}>
    //                 <div className={CSS.SomeClass}>
    //                    <form>
    //                        <input type='submit'/>
    //                             </form> 
    //                             <a download href={this.state.Address+".csv"}>{this.state.Address+".csv"}</a>
    //                             </div>
    //             </div>
    //         )
    //     else{
    //         return(
    //         <div className={CSS.MainBlock}>
    //         <div className={CSS.SomeClass}>
    //            <form onSubmit={this.handleSubmitt}>
    //                <input placeholder="Введите адресс" name='Address' value={this.state.Address} onChange={this.handleChangingg}/>
    //                 <input type='submit'/>
                            
    //                     </form> 
                        
    //                     </div>
                        
    //     </div>
    //         )
    //     }
    //     }
        
       

}
export default TransactionForAddress