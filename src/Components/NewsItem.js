import React, { Component } from "react";
import Basicimage from "./Images/sampleImage.jpg";
export class NewsItem extends Component {
  render() {
    let {
      title,
      description,
      mode,
      style,
      image,
      url,
      author,
      publishedAt,
      name,
    } = this.props;
    function setgrey(style) {
      let newStyle = { ...style }; // Create a copy of the style object
      if (mode === "light") {
        newStyle.backgroundColor = "white"; // Set color to grey
      } else {
        newStyle.backgroundColor = "grey"; // Set color to white
      }
      return newStyle;
    }
    function isImage(image) {
      if (!image) {
        return Basicimage;
      } else {
        return image;
      }
    }
    return (
      <>
        <div className="container">
          <div className="card" style={{ ...setgrey(style) }}>
            <img src={isImage(image)} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">
                {title}{" "}
                <span className="position-absolute top-0 start-100  translate-middle badge rounded-pill bg-danger" style={{zIndex: 1, left: '70%' }}>
                  {author}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </h5>
              <p className="card-text">{description}</p>
              <p className="card-text">
                <small className="text-muted">
                  <strong>{!author ? "Unknown" : author}</strong>
                  <br />
                  {new Date(publishedAt).toGMTString()}
                </small>
              </p>
              <a
                href={`${url}`}
                className={`btn btn-${mode === "dark" ? "light" : "dark"}`}
                target="_blank"
                rel="noreferrer"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
