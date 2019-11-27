import React from 'react';
import axios from 'axios';
import urljoin from 'url-join';
import log from 'loglevel';
import PropTypes from 'prop-types';
import { Form } from 'react-bulma-components';
import CreatableSelect from 'react-select/creatable';

var newOption = null;

class TagsInput extends React.Component {
  state = {
    isLoading: false,
    options: this.props.options
  };
  handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    log.debug(newValue);
    log.debug(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.props.onChange(newValue);
  };

  handleCreate = async (inputValue: any) => {
    this.setState({ isLoading: true });
    console.group('Option created');
    log.debug(inputValue);
    log.debug('Wait a moment...');

    await axios
      .post(
        process.env.REACT_APP_TAGS_API_URL,
        { name: inputValue },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${this.props.token}`
          }
        }
      )
      .then(res => {
        newOption = {
          value: res.data.slug,
          label: res.data.name,
          id: res.data.id
        };
        log.debug(res);
      })
      .catch(error => log.error());

    await axios
      .get(
        urljoin(
          process.env.REACT_APP_TAGS_API_URL,
          process.env.REACT_APP_GET_ALL
        )
      )
      .then(res => {
        if (this.props.value) {
          this.props.onChange([...this.props.value, newOption]);
        } else {
          this.props.onChange([newOption]);
        }
        log.debug(res.data);
        this.setState({
          options: res.data.map(tag => ({
            value: tag.slug,
            label: tag.name,
            id: tag.id
          })),
          isLoading: false
        });
      })
      .catch(error => log.error());
    console.groupEnd();
  };
  render() {
    const { isLoading, options } = this.state;
    return (
      <Form.Field>
        <Form.Label>แท็ก</Form.Label>
        <CreatableSelect
          isClearable
          isDisabled={isLoading}
          isLoading={isLoading}
          onChange={this.handleChange}
          onCreateOption={this.handleCreate}
          options={options}
          value={this.props.value}
          isMulti={true}
          placeholder="เลือกแท็กหรือสร้างแท็กใหม่..."
          className="tags-select"
        />
      </Form.Field>
    );
  }
}

const TagsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.number
  })
);

TagsInput.propTypes = {
  token: PropTypes.string,
  value: TagsPropTypes,
  options: TagsPropTypes,
  onChange: PropTypes.func
};

export { TagsPropTypes };
export default TagsInput;
