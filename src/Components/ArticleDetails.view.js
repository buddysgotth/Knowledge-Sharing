import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Container,
  Heading,
  Content,
  Box,
  Columns
} from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faFolder,
  faTags,
  faClock
} from '@fortawesome/free-solid-svg-icons';

const ArticleView = ({
  id,
  contents,
  title,
  modifiedDate,
  author,
  category,
  tags
}) => {
  const updatedDate = new Date(modifiedDate);

  return (
    <Container className="article">
      <Heading className="has-text-centered">{title}</Heading>
      <Box className="is-shadowless is-marginless">
        <Columns>
          <Columns.Column narrow className="article-info">
            <div>
              <FontAwesomeIcon icon={faFolder} /> : {category}
            </div>
          </Columns.Column>
          <Columns.Column narrow className="article-info">
            <div>
              <FontAwesomeIcon icon={faTags} /> : {tags.join(', ')}
            </div>
          </Columns.Column>
          <Columns.Column narrow className="article-info">
            <div>
              <FontAwesomeIcon icon={faUser} /> : {author}
            </div>
          </Columns.Column>
          <Columns.Column narrow className="article-info">
            <div>
              <FontAwesomeIcon icon={faClock} /> :{' '}
              {updatedDate.toLocaleString('th-TH')}
            </div>
          </Columns.Column>
          <Columns.Column narrow className="article-info">
            <Link to={`/edit/${id}`}>แก้ไข</Link>
          </Columns.Column>
        </Columns>
      </Box>
      <Box className="is-shadowless is-marginless">
        <Content>
          <div dangerouslySetInnerHTML={{ __html: contents }} />
        </Content>
      </Box>
    </Container>
  );
};

ArticleView.propTypes = {
  id: PropTypes.string,
  contents: PropTypes.string,
  title: PropTypes.string,
  modifiedDate: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default ArticleView;
