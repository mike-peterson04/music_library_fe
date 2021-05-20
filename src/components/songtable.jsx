import React,{Component} from 'react'

class SongTable extends Component{
    constructor(props){
        super(props);
        this.songs = props.songs

    
    }
    buildTable(song){
        return(
            <table>
                <tr>
                    <td>{song.title}</td>
                    <td>{song.artist}</td>
                </tr>
                <tr>
                    <td>{song.album}</td>
                    <td>{song.release_date}</td>
                </tr>
                <tr>
                    <td><button id={song.id} name="edit">Edit Song</button></td>
                    <td><button id={song.id} name="delete">Delete Song</button></td>
                </tr>
            </table>
        )

    }

    render()
    {    
        return(this.songs.map(this.buildTable))
    }

}
export default SongTable