import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps={
    country:"us",
    pageSize:10,
    category:"general"
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  constructor(props){
    super(props);
    
  this.state={
      articles:[],
      loading:true,
      page:1,
      totalResults:0,
    }
    document.title=this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1) +`- NewsMonkey`
  }
  updateNews=async()=>{
    this.props.setProgress(10)
    this.setState({
      loading:true,
    })
    const apiurl=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    let data=await fetch(apiurl);
    this.props.setProgress(30)
    let parsedData=await data.json();
    this.props.setProgress(60)
    this.setState({articles:parsedData.articles,
      totalResults:parsedData.totalResults,

      loading:false,

    })
    this.props.setProgress(100)
  }
  async componentDidMount(){
    await this.updateNews();
  }
  handlePreviousClick=async()=>{
    this.setState({
      page:this.state.page-1,
    })
    this.updateNews();
    
  }
  handleNextClick=async()=>{
    this.setState({
      page:this.state.page+1,
    })
    this.updateNews();
  }
  fetchMoreData = async() => {
    //  this.setState({
      
    // })
    const apiurl=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page+1}`;
    let data=await fetch(apiurl);
    let parsedData=await data.json();
    this.setState({articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
page:this.state.page+1,
      loading:false,

    })
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    // setTimeout(() => {
    //   this.setState({
    //     items: this.state.items.concat(Array.from({ length: 20 }))
    //   });
    // }, 1500);
  };
  render() {
    return (
      <div className='container mt-5'>
        <h1>{`Top ${this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)} Headlines`}</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults-1}
          loader={<Spinner/>}
        >
<div className='container'>

<div className="row mt-5">
        {
          this.state.articles.map((e)=>{
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
        {this.state.loading && <Spinner/>}
       
        {/* <div className='d-flex justify-content-between my-5'>
        <button type="button" disabled={this.state.page===1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr;Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}>Next&rarr;</button>

        </div> */}
      </div>
    )
  }
}

export default News