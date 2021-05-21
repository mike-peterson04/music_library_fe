import React,{Component} from 'react'

function SongTable(props) {
    
    function buildTable(song){
        return(
            <table>
                <tbody>
                    <tr>
                        <td>{song.title}</td>
                        <td>{song.artist}</td>
                    </tr>
                    <tr>
                        <td>{song.album}</td>
                        <td>{song.release_date}</td>
                    </tr>
                    <tr>
                        <td><button id={song.id} name="edit" onClick={(e) => props.handleEdit(e,song)}>Edit Song</button></td>
                        <td><button id={song.id} name="delete" onClick={(e) => props.handleDelete(e,song)}>Delete Song</button></td>
                    </tr>
                </tbody>
            </table>
        )
    
    }
        return(props.songs.map(buildTable))

    
    }

export default SongTable