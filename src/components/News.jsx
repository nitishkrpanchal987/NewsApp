import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import '../App.css';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
// import PropTypes from 'prop-types'

const News= (props)=>{
  // static defaultProps = {
  //   pageSize : 12
  // }
  // static PropTypes = {
  //   pageSize : PropTypes.number  
  // }

  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  // const [totalPage, setTotalPage] = useState(11)
  const [totalResults, setTotalResults] = useState(0)

  const upDate = async()=>{
    props.setProgress(10);
    let url = `https://newsapi.org/v2/everything?q=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url);
    props.setProgress(70);
    let parsedata = await data.json();
    setArticles(parsedata.articles);
    // setTotalPage(Math.floor(parsedata.totalResults/props.pageSize));
    setTotalResults(parsedata.totalResults);
    props.setProgress(100);
  }

  const fetchMoreData = async ()=>{
    // setState({page:state.page+1})
    let url = `https://newsapi.org/v2/everything?q=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page+1)
    // setState({loading:true})
    let data = await fetch(url);
    let parsedata = await data.json();
    setArticles(articles.concat(parsedata.articles));
    // setTotalPage(Math.floor(parsedata.totalResults/props.pageSize));
  }

  useEffect(()=>{
    upDate();
  },[])

    return (
      <div className='w-3'>
        <div className='container my-3'>
        <h1 className='text-center my-2'>Top Headlines</h1>
        {/* {state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="row">
        {articles.map((ele)=>{
          return <div className="col-md-4" key={ele.url}>
                <NewsItem title={!ele.title?"":ele.title.slice(0, 45)} description={!ele.description?"":ele.description.slice(0,88)} imageUrl={!ele.urlToImage?'https://www.middleweb.com/wp-content/uploads/2017/08/breaking-news-blue-600.jpg':ele.urlToImage} newsUrl={ele.url} author={ele.author}
                  date={ele.publishedAt} source={ele.source.name}
                />
            </div>
        })}
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-3">
        <button disabled={state.page <= 1} type="button" className="btn btn-dark" onClick={changePrev}> &larr; prev</button>
        <button disabled={state.totalPage === state.page} type="button" className="btn btn-dark" onClick={changeNext}>next &rarr;</button>
        </div> */}
      
      </div> 
      </div>
    )

}

export default News
