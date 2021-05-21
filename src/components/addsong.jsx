function AddSong(props){
    return(
        <form onSubmit={(e) => props.handleEditSubmit(e,props.song)}>
            <label>Song Id:{props.song.id}</label><br/>
            <label>Title:<input type="text" name={props.song.title} value={props.song.title} onChange={props.handleChange}/></label><br/>
            <label>Artist:<input type="text" name={props.song.artist} value={props.song.artist} onChange={props.handleChange}/></label><br/>
            <label>Album:<input type="text" name={props.song.album} value={props.song.album} onChange={props.handleChange}/></label><br/>
            <label>Release Date:<input type="Date" name={props.song.release_date} value={props.song.release_date} onChange={props.handleChange}/></label><br/>
            <input type="submit" value="Submit" />

        </form>
    )
}
export default AddSong