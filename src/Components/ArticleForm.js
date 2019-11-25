import React from 'react';
import axios from 'axios';
import log from 'loglevel';
import PropTypes from 'prop-types';
import { Form, Columns, Tile, Heading, Content } from 'react-bulma-components';
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

import TitleForm from './TitleForm';
import CategoryForm, { CategoriesPropTypes } from './CategoryForm';
import TagsInput, { TagsPropTypes } from './TagsInput';
import CreateButtonForm from './CreateButtonForm';
import EditButtonForm from './EditButtonForm';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'code'],
    [{ header: [1, 2, 3, false] }],
    ['blockquote', 'code-block'],
    [({ list: 'ordered' }, { list: 'bullet' })],
    ['link', 'image'],
    ['clean']
  ]
};

const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'code',
  'header',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'link',
  'image'
];

class ArticleForm extends React.Component {
  constructor(props) {
    super(props);
    const { articleData, tags } = this.props;
    this.state = {
      title: articleData.title.rendered,
      category: articleData.categories[0].toString(),
      tags: tags.filter(tag => articleData.tags.includes(tag.id)),
      content: articleData.content.rendered,
      status: 'none'
    };
    this.disabledForm = this.disabledForm.bind(this);
    this.showArticleCreatedStatus = this.showArticleCreatedStatus.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.textEditorOnChange = this.textEditorOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  disabledForm = status => {
    if (status === 'creating') {
      return true;
    }
    return false;
  };
  showArticleCreatedStatus = status => {
    if (status === 'publish') {
      return (
        <Tile kind="parent" notification color="success">
          <Heading subtitle>
            <FontAwesomeIcon icon={faCheck} /> สร้างบทความสำเร็จ
          </Heading>
        </Tile>
      );
    }
    if (status === 'updated') {
      return (
        <Tile kind="parent" notification color="success">
          <Heading subtitle>
            <FontAwesomeIcon icon={faCheck} /> แก้ไขบทความสำเร็จ
          </Heading>
        </Tile>
      );
    }
    if (status === 'draft') {
      return (
        <Tile kind="parent" notification color="info">
          <Heading subtitle>
            <FontAwesomeIcon icon={faCheck} /> ร่างบทความสำเร็จ
          </Heading>
        </Tile>
      );
    }
    if (status === 'failed') {
      return (
        <Tile kind="parent" notification color="danger">
          <Heading subtitle>
            <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
            ไม่สามารถสร้าง/แก้ไขบทความได้ กรุณาตรวจสอบและลองใหม่อีกครั้ง
          </Heading>
        </Tile>
      );
    }
    return null;
  };
  renderButtonForm = () => {
    const { articleData } = this.props;
    const { title, category, tags, content } = this.state;
    if (articleData.id) {
      return (
        <EditButtonForm
          onSubmit={this.handleSubmit}
          id={articleData.id}
          data={{ title, category, tags, content }}
        />
      );
    }
    return (
      <CreateButtonForm
        onSubmit={this.handleSubmit}
        data={{ title, category, tags, content }}
      />
    );
  };
  handleTagsChange = tags => {
    this.setState({ status: 'none', tags: tags });
  };
  handleOnChange = e => {
    this.setState({ status: 'none', [e.target.name]: e.target.value });
  };
  textEditorOnChange = value => {
    this.setState({ status: 'none', content: value });
  };
  handleSubmit = async e => {
    log.debug(e.target.value);
    const { title, category, tags, content } = this.state;
    const { articleData } = this.props;
    const status = e.target.value;
    this.setState({ status: 'creating' });
    if (articleData.id) {
      await axios
        .post(
          `/wp-json/wp/v2/articles/${articleData.id}`,
          {
            title: title,
            categories: [Number(category)],
            tags: tags.map(tag => tag.id),
            content: content,
            status: e.target.value === 'updated' ? 'publish' : e.target.value
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${this.props.token}`
            }
          }
        )
        .then(res => {
          log.debug(res);
          this.setState({ status: status });
        })
        .catch(error => {
          log.error();
          this.setState({ status: 'failed' });
        });
    } else {
      await axios
        .post(
          '/wp-json/wp/v2/articles',
          {
            title: title,
            categories: [Number(category)],
            tags: tags.map(tag => tag.id),
            content: content,
            author: this.props.id,
            status: e.target.value
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${this.props.token}`
            }
          }
        )
        .then(res => {
          log.debug(res);
          this.setState({ status: status });
        })
        .catch(error => {
          log.error();
          this.setState({ status: 'failed' });
        });
    }
    window.scrollTo(0, 0);
  };

  render() {
    const { title, category, content, tags, status } = this.state;
    const { categories } = this.props;
    return (
      <React.Fragment>
        {this.showArticleCreatedStatus(status)}
        <fieldset disabled={this.disabledForm(status)}>
          <TitleForm onChange={this.handleOnChange} value={title} />
          <Columns>
            <Columns.Column size={6}>
              <Form.Field>
                <Form.Label>หมวดหมู่</Form.Label>
                <CategoryForm
                  onChange={this.handleOnChange}
                  value={category}
                  categories={categories}
                  placeholder="เลือกหมวดหมู่..."
                />
              </Form.Field>
            </Columns.Column>
            <Columns.Column size={6}>
              <TagsInput
                token={this.props.token}
                value={tags}
                options={this.props.tags}
                onChange={this.handleTagsChange}
              />
            </Columns.Column>
          </Columns>
          <Form.Field>
            <Form.Label>เนื้อหาบทความ</Form.Label>
            <Content>
              <ReactQuill
                value={content}
                onChange={this.textEditorOnChange}
                modules={modules}
                formats={formats}
                placeholder="คุณต้องการที่จะบอกต่อสิ่งใด..."
                readOnly={this.disabledForm(status)}
              />
            </Content>
          </Form.Field>
          {this.renderButtonForm()}
        </fieldset>
      </React.Fragment>
    );
  }
}

ArticleForm.propTypes = {
  categories: CategoriesPropTypes,
  tags: TagsPropTypes,
  token: PropTypes.string,
  articleData: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.shape({
      rendered: PropTypes.string
    }),
    categories: PropTypes.arrayOf(PropTypes.number),
    tags: PropTypes.arrayOf(PropTypes.number),
    content: PropTypes.shape({
      rendered: PropTypes.string
    }),
    status: PropTypes.string
  })
};

ArticleForm.defaultProps = {
  articleData: {
    id: null,
    title: { rendered: '' },
    categories: [0],
    tags: [],
    content: { rendered: '' }
  }
};

export default ArticleForm;
