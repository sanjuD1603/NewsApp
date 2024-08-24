import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general",
    totalResults: 0,
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  updatenews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4442df33fed549f586f22d678cf1e022&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let response = await fetch(url);
    let parseData = await response.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  };
  async componentDidMount() {
    this.updatenews();
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4442df33fed549f586f22d678cf1e022&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let response = await fetch(url);
    let parseData = await response.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
    });
  };

  handleclickPrev = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updatenews();
  };
  handleclickNext = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      this.setState({ page: this.state.page + 1 });
      this.updatenews();
    }
  };

  render() {
    let { mode, style } = this.props;
    function capatlize(word) {
      let Word = word.toUpperCase();
      return Word.slice(0, 1) + word.slice(1);
    }
    return (
      <div className="container">
        <div className="container my-3" style={style}>
          <div className="text-center">
            <h1>
              {capatlize(
                this.props.category === "general" ? " " : this.props.category
              )}{" "}
              Headlines{" "}
            </h1>
          </div>
          {this.state.loading && <Loading mode={mode} />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Loading mode={mode} />}
          >
            <div className="row my-3">
              {!this.state.loading &&
                this.state.articles &&
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4 my-3" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 30) : " "}
                        description={
                          element.description
                            ? element.description.slice(0, 70)
                            : " "
                        }
                        mode={mode}
                        style={style}
                        image={element.urlToImage}
                        url={element.url}
                        author={element.author ? element.author : " "}
                        publishedAt={element.publishedAt}
                        name={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </InfiniteScroll>

          {/* <div className="d-flex justify-content-between">
      <button
        disabled={this.state.page <= 1}
        type="button"
        className={`btn btn-${mode === "dark" ? "light" : "dark"}`}
        onClick={this.handleclickPrev}
      >
        {" "}
        &larr; Previous
      </button>
      <button
        type="button"
        disabled={
          this.state.page + 1 >
          Math.ceil(this.state.totalResults / this.props.pageSize)
        }
        className={`btn btn-${mode === "dark" ? "light" : "dark"}`}
        onClick={this.handleclickNext}
      >
        {" "}
        Next &rarr;{" "}
      </button>
    </div> */}
        </div>
      </div>
    );
  }
}

export default News;
