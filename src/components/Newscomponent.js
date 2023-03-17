import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./spinner";

export class Newscomponent extends Component {
  constructor() {
    super();
    // console.log("constructor called");
    this.state = {
      article: [],
      loaded: false,
      pageno: 1,
      // total_article:this.state.article.length,
    };
    // console.log(this.article);
  }

  async componentDidMount() {
    this.setState.loaded = false;
    // this.loader();
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=45b2bdcf36524b35950bb5e31d2cdba7&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      article: parsedData.articles,
      loaded: true,
      total_article: parsedData.totalResults,
    });
  }
  async loader(goto_page) {
    this.setState({
      pageno: goto_page,
      loaded: false,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=45b2bdcf36524b35950bb5e31d2cdba7&page=${goto_page}&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({ article: parsedData.articles, loaded: true });
  }
  HandlePrevClick = () => {
    // console.log("prev clicked");
    // console.log("current page", this.state.pageno);
    // console.log("going to page", this.state.pageno + 1);
    this.loader(this.state.pageno - 1);
  };
  HandleNextClick = () => {
    // console.log("next clicked");
    // console.log("current page", this.state.pageno);
    // console.log("going to page", this.state.pageno + 1);
    this.loader(this.state.pageno + 1);
  };

  render() {
    return (
      <div className="container my-3">
        <h1>Top headlines</h1>
        {!this.state.loaded && <Spinner />}
        <div className="row">
          {this.state.loaded &&
            this.state.article.map((element) => {
              return (
                <div className="col-md-4 my-2" key={element.url}>
                  <Newsitem
                    title={element.title}
                    description={element.description}
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
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
        </div>
      </div>
    );
  }
}

export default Newscomponent;
