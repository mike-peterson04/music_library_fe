function SongTable(props) {
    
    function buildTable(song){
        return(
            <table className="table table-striped">
                <tbody className="table-secondary">
                    <tr>
                        <td>{song.title}</td>
                        <td>{song.artist}</td>
                    </tr>
                    <tr>
                        <td>{song.album}</td>
                        <td>{song.release_date}</td>
                    </tr>
                    <tr>
                        <td><button id={song.id} name="edit" onClick={(e) => props.handleEdit(e,song)} className='btn btn-dark'>Edit Song</button></td>
                        <td><button id={song.id} name="delete" onClick={(e) => props.handleDelete(e,song)} className='btn btn-dark'>Delete Song</button></td>
                    </tr>
                </tbody>
            </table>
        )
    
    }
        return(props.songs.map(buildTable))

    
    }

export default SongTable