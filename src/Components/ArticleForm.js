import React from "react";
import axios from "axios";
import log from "loglevel";
import PropTypes from "prop-types";
import {
  Container,
  Form,
  Columns,
  Tile,
  Heading
} from "react-bulma-components";
import ReactQuill from "react-quill";

import Loading from "./Loading";
import TitleForm from "./TitleForm";
import CategoryForm, { CategoriesPropTypes } from "./CategoryForm";
import TagsInput, { TagsPropTypes } from "./TagsInput";
import CreateButtonForm from "./CreateButtonForm";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "code"],
    [{ header: [1, 2, 3, false] }],
    ["blockquote", "code-block"],
    [({ list: "ordered" }, { list: "bullet" })],
    ["link", "image"],
    ["clean"]
  ]
};

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "code",
  "header",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image"
];

class ArticleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      category: "",
      tags: null,
      content: "",
      isCreated: "none",
      isLoading: false
    };
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.textEditorOnChange = this.textEditorOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showArticleCreatedStatus = isCreated => {
    if (isCreated === "publish") {
      return (
        <Tile kind="parent" notification color="success">
          <Heading subtitle>Create Article Complete</Heading>
        </Tile>
      );
    }
    if (isCreated === "draft") {
      return (
        <Tile kind="parent" notification color="info">
          <Heading subtitle>Draft Article Complete</Heading>
        </Tile>
      );
    }
    return null;
  };
  handleTagsChange = tags => {
    this.setState({ isCreated: "none", tags: tags });
  };
  handleOnChange = e => {
    this.setState({ isCreated: "none", [e.target.name]: e.target.value });
  };
  textEditorOnChange = value => {
    this.setState({ isCreated: "none", content: value });
  };
  handleSubmit = async e => {
    log.debug(e.target.value);
    const { title, category, tags, content } = this.state;
    const status = e.target.value;
    this.setState({ isLoading: true });
    await axios
      .post(
        "/wp-json/wp/v2/articles",
        {
          title: title,
          categories: [Number(category)],
          tags: tags.map(tag => tag.id),
          content: content,
          author: 1,
          status: e.target.value
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${this.props.token}`
          }
        }
      )
      .then(res => {
        log.debug(res);
        this.setState({ isLoading: false, isCreated: status });
      })
      .catch(error => log.error());
  };

  render() {
    const { title, category, content, tags, isCreated, isLoading } = this.state;
    const { categories } = this.props;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <Container>
        {this.showArticleCreatedStatus(isCreated)}
        <TitleForm onChange={this.handleOnChange} value={title} />
        <Columns>
          <Columns.Column>
            <CategoryForm
              onChange={this.handleOnChange}
              value={category}
              categories={categories}
            />
          </Columns.Column>
          <Columns.Column>
            <TagsInput
              token={this.props.token}
              value={tags}
              options={this.props.tags}
              onChange={this.handleTagsChange}
            />
          </Columns.Column>
        </Columns>
        <Form.Field>
          <Form.Label>Description</Form.Label>
          <ReactQuill
            value={content}
            onChange={this.textEditorOnChange}
            modules={modules}
            formats={formats}
            placeholder="What do you want to share..."
          />
        </Form.Field>
        <CreateButtonForm
          onSubmit={this.handleSubmit}
          data={{ title, category, tags, content }}
        />
      </Container>
    );
  }
}

ArticleForm.propTypes = {
  categories: CategoriesPropTypes,
  tags: TagsPropTypes,
  token: PropTypes.string
};

export default ArticleForm;
