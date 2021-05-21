import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import SongTable from './songtable';
import AddSong from './addsong';

class App extends Component {
constructor(props){
    super(props);
    // this.api = Axios.create({
    //     baseURL:'http://127.0.0.1:8000/',
    //     timeout: 1000,
    // })
    
    this.handleDelete = this.handleDelete.bind(this)
    this.updateSong = this.updateSong.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
}

state = {
    songs:false,
    songNumber: 0,
    renderType:"table",
    editSong:{
        id:"New Song",
        title:"Title",
        artist:"Artist",
        album:"Album",
        release_date:"Release Date",
        likes:0
    }
} 

handleChange = (event) => {
    let value = event.target.value
    console.log(value);
    this.setState({
        [event.target.value]:value
    });


};

async handleEditSubmit(event, song){
    event.preventDefault();
    let state = this.state;
    if (song.id === "New Song"){
        try{
            console.log(await Axios.post('http:127.0.0.1:8000/music/',{
                title:song.title,
                artist:song.artist,
                album:song.album,
                release_date:song.release_date,
                likes:song.likes
            }));
            this.updateSong()
            this.setState({
                songs:state.songs,
                songNumber: state.songNumber,
                renderType:"table",
                editSong:song});
        }
        catch(e){
            console.log(e.message);
        }
    }
    else{
        try{
            console.log(await Axios.put('http:127.0.0.1:8000/music/'+song.id+'/',song));
            this.updateSong()
            this.setState({
                songs:state.songs,
                songNumber: state.songNumber,
                renderType:"table",
                editSong:song});
        }
        catch(e){
            console.log(e.message);
        }
    }


}

handleEdit(event,song){
    event.preventDefault();
    let state = this.state;
    this.setState({
        songs:state.songs,
        songNumber:state.songNumber,
        editSong:song,
        renderType:"add"
    })

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
        if(this.state.renderType === "table"){
            return(
                <SongTable songs={this.state.songs} handleDelete={this.handleDelete} handleEdit={this.handleEdit}/>
            )
        }
        else if(this.state.renderType === "add"){
            return(
                <AddSong song={this.state.editSong} handleEditSubmit={this.handleEditSubmit} handleChange={this.handleChange}/>
            )
        }
    }
    console.log("No Data")
    return("No Data")
}

}


export default App;
