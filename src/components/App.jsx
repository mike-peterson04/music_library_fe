import React, { Component } from 'react';
import Axios from 'axios';
import SongTable from './songtable';
import AddSong from './addsong';
import Navbar from './navbar';
import FilterTable from './filterTable'
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
constructor(props){
    super(props);
    

    
    this.handleDelete = this.handleDelete.bind(this)
    this.updateSong = this.updateSong.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.updateSong = this.updateSong.bind(this)
    this.startFilter = this.startFilter.bind(this)
    this.filterUpdate = this.filterUpdate.bind(this)
    
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

startFilter(){
    this.setState({renderType:'filter'})
}

filterUpdate(songs){
    this.setState(
        {
            songs:songs,
            renderType:"table"
        }
    )  
}

async handleEditSubmit(event, song){
    event.preventDefault();
    if (song.id === "New Song"){
        try{
            console.log(await Axios.post('http://127.0.0.1:8000/music/',{
                title:song.title,
                artist:song.artist,
                album:song.album,
                release_date:song.release_date,
                likes:song.likes
            }));
            this.updateSong()
            this.setState({
                renderType:"table",
                editSong:song});
        }
        catch(e){
            console.log(e.message);
        }
    }
    else{
        try{
            console.log(await Axios.put('http://127.0.0.1:8000/music/'+song.id+'/',song));
            this.updateSong()
            this.setState({
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
            );
        }
        catch(e){
            console.log(e.message);
        }
    }


}

handleEdit(event,song=this.state.editSong){
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
            renderType:'table',
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
    //check
    if (this.state.songs !== false){
        if(this.state.renderType === "table"){
            return(
                <div>
                    <Navbar handleEdit={this.handleEdit} updateSong={this.updateSong} startFilter ={this.startFilter}/><br/>
                    <table align='center' className='table-secondary' width='80%'>
                        <tbody>
                            <tr>
                                <td>
                                <SongTable songs={this.state.songs} handleDelete={this.handleDelete} handleEdit={this.handleEdit}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        else if(this.state.renderType === "add"){
            return(
            <div>
                <Navbar handleEdit={this.handleEdit} updateSong={this.updateSong} startFilter ={this.startFilter}/><br/>
                <table align='center' className='table-dark' width='80%'>
                    <tbody>
                        <tr>
                            <td>
                                <AddSong song={this.state.editSong} handleEditSubmit={this.handleEditSubmit}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            )
        }
        else if(this.state.renderType === "filter"){
            return(
            <div>
                <Navbar handleEdit={this.handleEdit} updateSong={this.updateSong} startFilter ={this.startFilter}/><br/>
                <table align='center' className='table-dark' width='80%'>
                    <tbody>
                        <tr>
                            <td>
                                <FilterTable songs={this.state.songs} filterUpdate={this.filterUpdate}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>)
        }
    }
    console.log("No Data")
    return(<Navbar handleEdit={this.handleEdit} updateSong={this.updateSong} startFilter ={this.startFilter}/>)
}

}


export default App;
