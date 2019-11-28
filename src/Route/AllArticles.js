import React from 'react';
import log from 'loglevel';
import ArticlesList from './../Components/ArticlesList';
import { Section, Container, Heading } from 'react-bulma-components';

class AllArticles extends React.Component {
  render() {
    const params = this.props.location.search;
    let search;
    let index;
    let select = { category: '0', tags: null, modified: '0' };
    if (params.indexOf('search') !== -1) {
      index = params.indexOf('search');
      search = params.slice(index + 7, params.indexOf('&', index));
    }
    if (params.indexOf('categories') !== -1) {
      index = params.indexOf('categories');
      select.category = params.slice(index + 11, params.indexOf('&', index));
    }
    if (params.indexOf('tags') !== -1) {
      index = params.indexOf('tags');
      select.tags = params
        .slice(index + 5, params.indexOf('&', index))
        .split('+')
        .map(tag => Number(tag));
    }
    if (params.indexOf('after') !== -1) {
      index = params.indexOf('after');
      const today = new Date();
      const checkDate = new Date(
        params.slice(index + 6, params.indexOf('&', index))
      );
      select.modified = Math.round(
        (today - checkDate) / (1000 * 60 * 60 * 24)
      ).toString();
    }
    log.debug(select);
    return (
      <Section>
        <Container className="header">
          <Heading className="has-text-centered">รายชื่อบทความ</Heading>
        </Container>
        <ArticlesList params={params} search={search} select={select} />
      </Section>
    );
  }
}

export default AllArticles;
