import React, { Component } from 'react';

class FilterTable extends Component {
    constructor(props){
        super(props);
        this.setState({filter:null})
    }

    filterReturn(event){
        event.preventDefault()
        let filterType = []
        let filterValue = []
        //validating which checkboxes were checked
        if(event.target.titleBox.checked){
            filterType.push('title')
            filterValue.push(event.target.title.value)

        }
        if(event.target.artistBox.checked){
            filterType.push('artist')
            filterValue.push(event.target.artist.value)
            
        }
        if(event.target.albumBox.checked){
            filterType.push('album')
            filterValue.push(event.target.album.value)
        }
        if(event.target.dateBox.checked){
            filterType.push('release_date')
            filterValue.push(event.target.release_date.value)
            
        }
        let result = this.props.songs
        for(let i=0;i<filterType.length;i++){
            result = this.songSearch(filterType[i],filterValue[i],result)
        }
        //calling the app component's function to apply the filter
        this.props.filterUpdate(result)

    }
//this function searches through the list of songs and then determines which ones match filterType is a string for what element of the song we are filtering by
//filterValue should be the specific value we are looking for in that element
    songSearch(filterType,filterValue,songs){
        if (songs[0]===undefined){
            songs=this.props.songs;
            songs = songs.filter((song)=>{
                if(song[filterType].toLowerCase()===filterValue.toLowerCase()){
                    return true;
                }
                return false;
            }
            )

        }
        else{
            songs = songs.filter((song)=>{
                if(song[filterType].toLowerCase()===filterValue.toLowerCase()){
                    return true;
                }
                return false;
            }
            )
        }
        return songs;
    }
    //draws the table filter form checkbox and textfield need to be filled out to create filter
    render(){
        return(
            <form onSubmit={(e) => this.filterReturn(e)}>
            <h3>Please select what items you wish to filter by</h3><br/>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="titleBox" name='titleBox'></input>
                <label>Title:<input type="text" name="title" className='btn btn-dark'/></label><br/>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="artistBox" name='artistBox'></input>
                <label>Artist:<input type="text" name="artist" className='btn btn-dark'/></label><br/>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="albumBox" name='albumBox'></input>
                <label>Album:<input type="text" name="album"   className='btn btn-dark'/></label><br/>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="dateBox" name='dateBox'></input>
                <label>Release Date:<input type="Date" name="release_date"  className='btn btn-dark'/></label><br/>
            </div>
            <input type="submit" value="Submit" className='btn btn-dark'/>

        </form>
        )

    
    }
}

export default FilterTable