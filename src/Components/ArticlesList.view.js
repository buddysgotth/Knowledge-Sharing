import React from "react";
import PropTypes from "prop-types";
import { Container, Section, Heading, Table } from "react-bulma-components";

const ArticlesListView = ({ articles, authors, categories, tags }) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };

  return (
    <Section>
      <Container>
        <Heading>All Articles</Heading>
      </Container>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Tags</th>
              <th>Updated Time</th>
              <th>Excerpt</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id}>
                <th>{article.title.rendered}</th>
                <th>
                  {authors
                    .filter(author => author.articleId === article.id)
                    .map(author => author.name.join())}
                </th>
                <th>
                  {categories
                    .filter(categories => categories.articleId === article.id)
                    .map(categories => categories.name.join())}
                </th>
                <th>
                  {tags
                    .filter(tag => tag.articleId === article.id)
                    .map(tag => tag.name.join(", "))}
                </th>
                <th>
                  {new Date(article.modified).toLocaleString("en-US", options)}
                </th>
                <th>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: article.excerpt.rendered
                    }}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Section>
  );
};

ArticlesListView.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.shape({
        rendered: PropTypes.string
      }),
      excerpt: PropTypes.shape({
        rendered: PropTypes.string
      }),
      modified: PropTypes.string
    })
  ),
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      articleId: PropTypes.number,
      name: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      articleId: PropTypes.number,
      name: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      articleId: PropTypes.number,
      name: PropTypes.arrayOf(PropTypes.string)
    })
  )
};

export default ArticlesListView;
