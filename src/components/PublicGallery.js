import React, { Component } from 'react';
import axios from 'axios';
import NewUpload from './NewUpload';

class PublicGallery extends Component 
{

  getArrayOfPicData()
  {
    let pics = [];
    for(let i=0; i<this.props.arr.length; i++)
    {
      axios.get(`/api/photos/${this.props.arr[i]}`)
        .then((response) => 
        {
          // console.log("pics ", pics);
          pics.push(response.data[0]);
        }
      )
    }
    return pics;
  }

  render() 
  {
    console.log(this.getArrayOfPicData())
    return (
      <div>
        {/* {pics.map((e) => 
          {
            console.log("PG ", e.url )
            return <NewUpload
                    key={e.pid}
                    id={e.pid}
                    url={e.url} 
                    alt={e.title}
                  />
          })
        } */}
      </div>
    );
  }
}

export default PublicGallery;