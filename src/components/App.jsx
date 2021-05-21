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
    
    this.handleDelete = this.handleDelete.bind(this)
    this.updateSong = this.updateSong.bind(this)
}

state = {
    songs:false,
    songNumber: 0
} 
handleEdit(event,song){
    event.preventDefault();

}
async handleDelete(event,song){
    event.preventDefault();
    try{
        await Axios.delete('http://127.0.0.1:8000/music/'+song.id+'/');
        console.log("api called successfully");
        this.setState({
            songNumber: 1
        });
        this.updateSong();

    }
    catch(e){
        console.log(e.message)
        console.log("api didn't respond delete")
    }

}
async updateSong(){
    try{
        let songs= await Axios.get('http://127.0.0.1:8000/music/')
        songs = songs.data
        console.log(this.songs)
        this.setState({
            songs:songs,
            songNumber:(songs.length-1)})
        }
    
        catch{
            console.log("api didn't respond")
        }
}
async componentDidMount(){
    this.updateSong()
}



render(){
    console.log("Rendering happening")
    if (this.state.songs !== false){
    return(
    <SongTable songs={this.state.songs} handleDelete={this.handleDelete} handleEdit={this.handleEdit}></SongTable>
    )}
    console.log("No Data")
    return("No Data")
}

}


export default App;
