import React from 'react';
import { Container, Heading } from 'react-bulma-components';

import MyArticles from './MyArticlesCard';

const ProfileView = ({ categories, tags, articles }) => {
  return (
    <React.Fragment>
      <Container className="header">
        <Heading className="has-text-centered">บทความของฉัน</Heading>
      </Container>
      <Container>
        <Heading subtitle size={6} className="has-text-centered">
          ผลลัพธ์: {articles.length} บทความ
        </Heading>
      </Container>
      <Container>
        {articles.map(article => (
          <MyArticles
            article={article}
            categories={categories}
            tags={tags}
            key={article.id}
          />
        ))}
      </Container>
    </React.Fragment>
  );
};

export default ProfileView;
