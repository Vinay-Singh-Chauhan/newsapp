import React from 'react'
const NewsItem =(props)=> {

      let {title,description,urlToImage,url,author,publishedAt,source} =props;
    return (
      <div><div className="card" > 
        <div className='d-flex flex-direction-end position-absolute top-0 end-0'>
          <span className="badge rounded-pill bg-danger" style={{right:"-10%"}}>{source}
  </span>
        </div>
        
  <img src={urlToImage?urlToImage:"https://c1.wallpaperflare.com/preview/608/687/767/the-gap-message-alarm-breaking-news-news.jpg"} className="card-img-top" alt="..."/>
  <div className="card-body">
 
    
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {(new Date(publishedAt)).toGMTString()}</small></p>
    <a href={url} rel="noreferrer" target="_blank" className="btn btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  
}

export default NewsItem