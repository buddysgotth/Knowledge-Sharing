import React from 'react';
import axios from 'axios';
import log from 'loglevel';
import PropTypes from 'prop-types';

import Loading from './Loading';
import ProfileView from './Profile.view';

class Profile extends React.Component {
  state = {
    user_articles: [],
    isLoading: true
  };

  componentDidMount() {
    const { id } = this.props;
    const tokenIndex = document.cookie.indexOf('tkn');
    const tokenLastIndex = document.cookie.indexOf(';', tokenIndex);
    let token;
    if (tokenLastIndex !== -1) {
      token = document.cookie.slice(tokenIndex + 4, tokenLastIndex);
    } else {
      token = document.cookie.slice(tokenIndex + 4);
    }
    axios
      .get(
        `wp-json/wp/v2/articles?author=${id}&status=publish+draft&per_page=100`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => {
        this.setState({
          user_articles: res.data,
          isLoading: false
        });
        log.debug(this.state);
      });
  }

  render() {
    const { isLoading, user_articles } = this.state;
    const { categories, tags } = this.props;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <ProfileView
        categories={categories}
        tags={tags}
        articles={user_articles}
      />
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      slug: PropTypes.string
    })
  )
};

export default Profile;
