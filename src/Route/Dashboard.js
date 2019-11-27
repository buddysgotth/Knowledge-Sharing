import React from 'react';
import axios from 'axios';
import urljoin from 'url-join';
import log from 'loglevel';
import { Section } from 'react-bulma-components';

import Loading from './../Components/Loading';
import Profile from './../Components/Profile';

class Dashboard extends React.Component {
  state = {
    id: null,
    categories: [],
    tags: [],
    isLoading: true
  };

  componentDidMount() {
    const slugIndex = document.cookie.indexOf('slug');
    const slugLastIndex = document.cookie.indexOf(';', slugIndex);
    let slug;
    if (slugIndex === -1) {
      return (window.location = '/');
    }
    if (slugLastIndex !== -1) {
      slug = document.cookie.slice(slugIndex + 5, slugLastIndex);
    } else {
      slug = document.cookie.slice(slugIndex + 5);
    }
    log.debug(slug);
    const getUser = axios.get(
      urljoin(process.env.REACT_APP_USERS_API_URL, `?slug=${slug}`)
    );
    const getCategories = axios.get(
      urljoin(
        process.env.REACT_APP_CATEGORIES_API_URL,
        process.env.REACT_APP_GET_ALL
      )
    );
    const getTags = axios.get(
      urljoin(process.env.REACT_APP_TAGS_API_URL, process.env.REACT_APP_GET_ALL)
    );

    Promise.all([getUser, getCategories, getTags]).then(res => {
      this.setState({
        id: res[0].data[0] ? res[0].data[0].id : 0,
        categories: res[1].data,
        tags: res[2].data,
        isLoading: false
      });
      log.debug(res[0].data);
      log.debug(res[1].data);
      log.debug(res[2].data);
      log.debug(this.state);
    });
  }
  render() {
    const { id, categories, tags, isLoading } = this.state;
    return (
      <Section>
        {isLoading ? (
          <Loading />
        ) : (
          <Profile id={id} categories={categories} tags={tags} />
        )}
      </Section>
    );
  }
}

export default Dashboard;
