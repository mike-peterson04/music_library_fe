import React, { Component } from 'react';

class AddSong extends Component{
constructor(props){
    super(props);
    debugger;
    this.state={
        id:props.song.id,
        title:props.song.title,
        artist:props.song.artist,
        album:props.song.album,
        release_date:props.song.release_date
    }
}    

handleChange=(event)=>{
    this.setState({
        [event.target.name]:event.target.value
    })
}

render(){
    return(
        <form onSubmit={(e) => this.props.handleEditSubmit(e,this.state)}>
            <label>Song Id:{this.props.song.id}</label><br/>
            <label>Title:<input type="text" name="title" value={this.state.title} onChange={this.handleChange}/></label><br/>
            <label>Artist:<input type="text" name="artist" value={this.state.artist} onChange={this.handleChange}/></label><br/>
            <label>Album:<input type="text" name="album" value={this.state.album} onChange={this.handleChange}/></label><br/>
            <label>Release Date:<input type="Date" name="release_date" value={this.state.release_date} onChange={this.handleChange}/></label><br/>
            <input type="submit" value="Submit" />

        </form>
    )
}
}
export default AddSong