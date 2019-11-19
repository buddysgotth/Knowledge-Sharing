import React from 'react';
import PropTypes from 'prop-types';
import { Columns, Box, Content } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faFolder,
  faTags,
  faClock
} from '@fortawesome/free-solid-svg-icons';

const ArticleCard = ({
  id,
  title,
  author,
  category,
  tags,
  modifiedDate,
  excerpt
}) => {
  const updatedDate = new Date(modifiedDate);

  const preview = excerpt.replace(/<p>|<\/p>/gi, '');

  return (
    <Columns.Column size={6}>
      <Link to={`/article/${id}`} className="has-text-black article-card">
        <Box className="full-height">
          <Content>
            <h2>{title}</h2>
            <Columns.Column>
              <Columns breakpoint="desktop">
                <Columns.Column className="is-paddingless">
                  <div>
                    <FontAwesomeIcon icon={faFolder} /> : {category}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faTags} /> :{' '}
                    {tags.map(tag => tag.join(', '))}
                  </div>
                </Columns.Column>
                <Columns.Column className="is-paddingless">
                  <div>
                    <FontAwesomeIcon icon={faUser} /> : {author}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faClock} /> :{' '}
                    {updatedDate.toLocaleString('th-TH')}
                  </div>
                </Columns.Column>
              </Columns>
            </Columns.Column>
            <br />
            <div
              dangerouslySetInnerHTML={{
                __html: '<p>' + preview.slice(0, 150) + '... </p>'
              }}
            />
          </Content>
        </Box>
      </Link>
    </Columns.Column>
  );
};

ArticleCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  modifiedDate: PropTypes.string,
  excerpt: PropTypes.string
};

export default ArticleCard;
