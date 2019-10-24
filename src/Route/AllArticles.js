import React from "react";
import ArticlesList from "./../Components/ArticlesList";

class AllArticles extends React.Component {
  render() {
    const searchParams = this.props.location.search;
    return <ArticlesList search={searchParams} />;
  }
}

export default AllArticles;
