import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import SongTable from './songtable'

class App extends Component {
constructor(props){
    super(props);
    // this.api = Axios.create({
    //     baseURL:'http://127.0.0.1:8000/',
    //     timeout: 1000,
    // })
    this.songs = false
    this.state = {
       songNumber: 0
   } 
}

handleSubmit(){

}

async componentDidMount(){
    try{
    this.songs= await Axios.get('http://127.0.0.1:8000/music/')
    this.songs = this.songs.data
    console.log(this.songs)
    this.setState({songNumber:(this.songs.length-1)})
    }

    catch{
        console.log("api didn't respond")
    }

}



render(){
    if (this.songs !== false){
    return(
    <SongTable songs={this.songs}></SongTable>
    )}
    console.log("No Data")
    return("No Data")
}

}


export default App;
