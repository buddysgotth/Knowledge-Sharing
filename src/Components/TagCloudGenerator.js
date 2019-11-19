import React from 'react';
import axios from 'axios';
import log from 'loglevel';

import Loading from './Loading';
import TagCloudView from './TagCloud.view';

class TagCloudGenerator extends React.Component {
  state = {
    isLoading: true,
    tags: []
  };

  componentDidMount() {
    axios
      .get(`/wp-json/wp/v2/tags?orderby=count&order=desc&per_page=25`)
      .then(res => {
        this.setState({
          tags: res.data.map(tag => ({
            text: tag.name,
            value: tag.count,
            id: tag.id
          })),
          isLoading: false
        });
        log.debug('tags:', this.state.tags);
      });
  }

  render() {
    const { tags, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return <TagCloudView tags={tags} />;
  }
}

export default TagCloudGenerator;
