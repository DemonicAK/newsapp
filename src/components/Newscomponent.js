import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const API_KEY = process.env.REACT_APP_API_KEY2;
// console.log(process.env.REACT_APP_API_KEY1)
export class Newscomponent extends Component {
  constructor() {
    super();
    // console.log("constructor called");
    this.state = {
      article: [],
      loaded: false,
      pageno: 1,
      total_article: 0,
    };
    // console.log(this.article);
  }

  async componentDidMount() {
    // this.setState({
    //   loaded: false,
    // });
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}& &page=${this.state.pageno}apiKey=${API_KEY}&pageSize=${this.props.pagesize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   article: parsedData.articles,
    //   loaded: true,
    //   total_article: parsedData.totalResults,
    // });
    this.loader();
  }
  async loader() {
    this.setState({
      loaded: false,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${API_KEY}
    &page=${this.state.pageno}&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      article: parsedData.articles,
      loaded: true,
      total_article: parsedData.totalResults,
    });
  }
  fetchMoreData = async () => {
    // console.log(this.state.pageno)
    // console.log(this.state.loaded)
    this.setState({
      pageno: this.state.pageno + 1,
      loaded: false,
    });
    // console.log(this.state.loaded)
    // console.log(this.state.pageno)

    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${API_KEY}
    &page=${this.state.pageno+1}&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    // console.log(this.state.pageno)
   this.setState({
      article: this.state.article.concat(parsedData.articles),
      // article: parsedData.articles,
      loaded: true,
      // total_article: parsedData.totalResults,
    });
    console.log(this.state.article)


  };
  // HandlePrevClick = async () => {
  //   // console.log("prev clicked");
  //   // console.log("current page", this.state.pageno);
  //   // console.log("going to page", this.state.pageno + 1);
  //   await this.setState({
  //     pageno: this.state.pageno - 1,
  //     // loaded: false,
  //   });
  //   this.loader();
  // };
  // HandleNextClick = async () => {
  //   // console.log("next clicked");
  //   // console.log("current page", this.state.pageno);
  //   // console.log("going to page", this.state.pageno + 1);
  //   await this.setState({
  //     pageno: this.state.pageno + 1,
  //     // loaded: false,
  //   });
  //   this.loader();
  // };

  render() {
    return (
      <>
        <h1 className="text-center">Top headlines</h1>
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.total_article}
          loader={<Spinner/>}
        >
          {/* {this.state.items.map((i, index) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))} */}
          {!this.state.loaded && <Spinner />}
          <div className="container">
            <div className="row">
              {/* {this.state.loaded && */}
              {this.state.article.map((element) => {
                return (
                  <div className="col-md-4 my-2" key={element.url}>
                    <Newsitem
                      title={element.title}
                      description={element.description}
                      imageurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          {" "}
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.HandlePrevClick}
            disabled={this.state.pageno <= 1}
          >
            &larr; previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.HandleNextClick}
            disabled={
              this.state.pageno + 1 >
              Math.ceil(this.state.total_article / this.props.pagesize)
            }
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default Newscomponent;
