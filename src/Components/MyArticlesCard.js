import React from 'react';
import { Heading, Box, Columns, Button } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faTags, faClock } from '@fortawesome/free-solid-svg-icons';
const MyArticles = ({ article, categories, tags }) => {
  const updatedDate = new Date(article.modified);
  const drafted = article.status === 'draft';

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
            <Link to={`/edit/${article.id}`}>แก้ไข</Link>
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

export default MyArticles;
