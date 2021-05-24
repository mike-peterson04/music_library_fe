import React, { Component } from 'react';

class AddSong extends Component{
constructor(props){
    super(props);
    this.state={
        id:props.song.id,
        title:props.song.title,
        artist:props.song.artist,
        album:props.song.album,
        release_date:props.song.release_date
    }
}    
//this changes the value we have stored in memory for each item as you change it
handleChange=(event)=>{
    this.setState({
        [event.target.name]:event.target.value
    })
}

render(){
    return(
        <form onSubmit={(e) => this.props.handleEditSubmit(e,this.state)}>
            <h3>Song Id:{this.props.song.id}</h3><br/>
            <label>Title:<input type="text" name="title" value={this.state.title} onChange={this.handleChange} className='btn btn-dark'/></label><br/>
            <label>Artist:<input type="text" name="artist" value={this.state.artist} onChange={this.handleChange} className='btn btn-dark'/></label><br/>
            <label>Album:<input type="text" name="album" value={this.state.album} onChange={this.handleChange} className='btn btn-dark'/></label><br/>
            <label>Release Date:<input type="Date" name="release_date" value={this.state.release_date} onChange={this.handleChange} className='btn btn-dark'/></label><br/>
            <input type="submit" value="Submit" className='btn btn-dark'/>

        </form>
    )
}
}
export default AddSong