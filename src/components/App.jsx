import React, { Component } from 'react';
import Axios from 'axios';
import SongTable from './songtable';
import AddSong from './addsong';
import Navbar from './navbar';
import FilterTable from './filterTable'
import 'bootstrap/dist/css/bootstrap.css';


//this class serves as a display shell for all other components
class App extends Component {
constructor(props){
    super(props);
    

    //binding functions I need to call in other classes or external functions
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
//this function will force the page to re-render and will call the filterTable instead of SongTable component
startFilter(){
    this.setState({renderType:'filter'})
}
//this function is called from the fiterTable component to redraw the page with the results of the filter we want to apply
filterUpdate(songs){
    this.setState(
        {
            songs:songs,
            renderType:"table"
        }
    )  
}

//this function handles BOTH editing an existing song or creating a new song depending on what the song id field is on form submission (not user editable)
async handleEditSubmit(event, song){
    event.preventDefault();
    if (song.id === "New Song"){
        //this will create a new song
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
        //this will edit an existing song
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
//as opposed to actually editing any existing data this function simply redraws the page to show the song editing UI
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
//this delete's a song and grabs the refreshed list of songs from the database
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
//this grabs a refreshed list of songs from the database
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
//grabs list of songs on initial load
async componentDidMount(){
    this.updateSong()
}


//draws the page, checks to make sure we have data and what type of components we want to draw at page render
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
