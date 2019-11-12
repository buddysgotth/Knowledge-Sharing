import React from "react";
import log from "loglevel";
import { Columns, Form, Button } from "react-bulma-components";
import Select from "react-select";

import CategoryForm from "./CategoryForm";

class AdvancedSearchForm extends React.Component {
  constructor(props) {
    super(props);
    const { tagOptions, select } = this.props;
    this.state = {
      category: select.category,
      tags: select.tags
        ? tagOptions.filter(tag => select.tags.includes(tag.id))
        : null,
      modified: select.modified
    };
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    log.debug(e.target.name, ":", e.target.value);
  };

  handleTagsChange = (newValue: any, actionMeta: any) => {
    console.group("Value Changed");
    log.debug(newValue);
    log.debug(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ tags: newValue });
  };

  handleSearch = e => {
    const { category, tags, modified } = this.state;
    const { params } = this.props;
    const allParams = [];
    if (e.target.value === "search") {
      if (params.indexOf("search") !== -1) {
        allParams.push(
          params.slice(params.indexOf("search"), params.indexOf("&"))
        );
      }
      if (category !== "0") {
        allParams.push(`categories=${category}`);
      }
      if (tags) {
        allParams.push(`tags=${tags.map(tag => tag.id).join("+")}`);
      }
      if (modified !== "0") {
        const date = new Date();
        date.setDate(date.getDate() - Number(modified));
        const timeString =
          date.toISOString().slice(0, 11) + date.toTimeString().slice(0, 8);
        allParams.push(`after=${timeString}&date_query_column=post_modified`);
      }
      log.debug(allParams);
      window.location.search = `?${allParams.join("&")}&page=1`;
    } else {
      window.location.search = "?page=1";
    }
  };

  render() {
    const { category, tags, modified } = this.state;
    const { tagOptions, categories } = this.props;
    return (
      <Columns>
        <Columns.Column size={2}>
          <CategoryForm
            onChange={this.handleOnChange}
            categories={categories}
            value={category}
          />
        </Columns.Column>
        <Columns.Column size={2}>
          <Form.Field>
            <Form.Label>Time</Form.Label>
            <Form.Select
              name="modified"
              className="is-fullwidth"
              onChange={this.handleOnChange}
              value={modified}
            >
              <option value="3">3 days ago</option>
              <option value="7">7 days ago</option>
              <option value="14">2 weeks ago</option>
              <option value="0">Anytime</option>
            </Form.Select>
          </Form.Field>
        </Columns.Column>
        <Columns.Column>
          <Form.Field>
            <Form.Label>Tags</Form.Label>
            <Select
              value={tags}
              isMulti
              isClearable={false}
              name="tags"
              options={tagOptions}
              onChange={this.handleTagsChange}
            />
          </Form.Field>
        </Columns.Column>
        <Columns.Column narrow className="is-flex">
          <Form.Field>
            <Form.Label>---</Form.Label>
            <Button.Group>
              <Button value="search" onClick={this.handleSearch} color="link">
                Search
              </Button>
              <Button value="clear" onClick={this.handleSearch} color="light">
                Clear
              </Button>
            </Button.Group>
          </Form.Field>
        </Columns.Column>
      </Columns>
    );
  }
}

AdvancedSearchForm.defaultProps = {
  select: {
    category: "0",
    tags: null,
    modified: "0"
  }
};

export default AdvancedSearchForm;
