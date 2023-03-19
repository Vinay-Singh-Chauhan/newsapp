import React, { useState,useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
const News =(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults ] = useState(0)
  // document.title=props.category.charAt(0).toUpperCase()+props.category.slice(1) +`- NewsMonkey`
  // }

    
  const updateNews=async()=>{
    props.setProgress(10)
    setLoading(true);
    const apiurl=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    let data=await fetch(apiurl);
    props.setProgress(30)
    let parsedData=await data.json();
    props.setProgress(60)
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100)
  }

 
  useEffect(() => {
    updateNews()
    document.title=props.category.charAt(0).toUpperCase()+props.category.slice(1) +`- NewsMonkey`
  
  },[])
  

  const fetchMoreData = async() => {
    //  this.setState({
      // await setPage(page+1);
    // })
    const apiurl=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page+1}`;
    let data=await fetch(apiurl);
    let parsedData=await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setPage(page+1)
    // setLoading(false)

  };
    return (
      <>
      <div className='container mt-5'>
      
        <h1>{`Top ${props.category.charAt(0).toUpperCase()+props.category.slice(1)} Headlines`}</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
<div className='container'>

<div className="row mt-5">
        {
          articles.map((e)=>{
            return (
              e.title && e.description &&
              <div className="col-md-4" key={e.url}>
                
        <NewsItem title={e.title.slice(0,45)} description={e.description.slice(0,88)} urlToImage={e.urlToImage} url={e.url} author={e.author} publishedAt={e.publishedAt} source={e.source.name}/>

            </div>
            )
          })
        }
            
        </div>
        </div>
        </InfiniteScroll>
        {/* {loading && <Spinner/>} */}
       
        {/* <div className='d-flex justify-content-between my-5'>
        <button type="button" disabled={this.state.page===1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr;Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled={this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize)}>Next&rarr;</button>

        </div> */}
      </div>
      </>
    )
  
}
News.defaultProps={
  country:"us",
  pageSize:10,
  category:"general"
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}
export default News