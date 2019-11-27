import React from 'react';
import axios from 'axios';
import urljoin from 'url-join';
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
      .get(
        urljoin(
          process.env.REACT_APP_TAGS_API_URL,
          '?orderby=count&order=desc&per_page=25&hide_empty=true'
        )
      )
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
