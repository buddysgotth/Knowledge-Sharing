import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Heading, Box, Columns, Button } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import log from 'loglevel';
import axios from 'axios';
import urljoin from 'url-join';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faTags, faClock } from '@fortawesome/free-solid-svg-icons';

import DeleteConfirmationModal from './DeleteConfirmationModal';
const MyArticles = ({ article, categories, tags, token }) => {
  const [showPopup, setShowPopup] = useState(false);

  const updatedDate = new Date(article.modified);
  const drafted = article.status === 'draft';

  const open = () => setShowPopup(true);
  const close = () => setShowPopup(false);

  const handleDelete = () => {
    axios
      .delete(
        urljoin(process.env.REACT_APP_ARTICLES_API_URL, article.id.toString()),
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(res => {
        log.debug(res.data);
        window.location = '/dashboard';
      })
      .catch(error => log.error(error));
  };

  const preview = article.excerpt.rendered.replace(/<p>|<\/p>/gi, '');
  return (
    <Box className="content">
      <Columns breakpoint="mobile">
        <Columns.Column>
          <Heading size={4} className={drafted ? 'has-text-danger' : ''}>
            {article.title.rendered} {drafted ? '[ร่าง]' : ''}
          </Heading>
        </Columns.Column>
        <Columns.Column narrow>
          <Heading size={6}>
            <Link to={`/edit/${article.id}`}>
              <Button size="small" color="light">
                แก้ไข
              </Button>
            </Link>
            <span>
              <Button size="small" color="danger" onClick={open}>
                ลบ
              </Button>
              <DeleteConfirmationModal
                onClose={close}
                show={showPopup}
                onDelete={handleDelete}
                title={article.title.rendered}
              />
            </span>
          </Heading>
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column narrow className="article-info">
          <FontAwesomeIcon icon={faFolder} /> :{' '}
          {categories
            .filter(category => article.categories.includes(category.id))
            .map(category => category.name)}
        </Columns.Column>
        <Columns.Column narrow className="article-info">
          <FontAwesomeIcon icon={faTags} /> :{' '}
          {tags
            .filter(tag => article.tags.includes(tag.id))
            .map(tag => tag.name)
            .join(', ')}
        </Columns.Column>
        <Columns.Column narrow className="article-info">
          <FontAwesomeIcon icon={faClock} /> :{' '}
          {updatedDate.toLocaleString('th-TH')}
        </Columns.Column>
      </Columns>
      <div
        dangerouslySetInnerHTML={{
          __html: '<p>' + preview.slice(0, 150) + '... </p>'
        }}
      />
    </Box>
  );
};

MyArticles.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ),
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.shape({
        rendered: PropTypes.string
      }),
      categories: PropTypes.arrayOf(PropTypes.number),
      tags: PropTypes.arrayOf(PropTypes.number),
      modified: PropTypes.string,
      status: PropTypes.string,
      excerpt: PropTypes.shape({
        rendered: PropTypes.string
      })
    })
  ),
  token: PropTypes.string
};

export default MyArticles;
