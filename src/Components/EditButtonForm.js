import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bulma-components';

const EditButtonForm = ({ onSubmit, id, data }) => {
  const handleSubmit = event => {
    onSubmit(event);
  };

  const isDisabled = data => {
    const { title, category, tags, content } = data;
    if (
      title &&
      category &&
      category !== '0' &&
      tags &&
      content &&
      content !== '<p><br></p>'
    ) {
      return false;
    }
    return true;
  };

  return (
    <Form.Field kind="group" className="is-grouped-right">
      <Button.Group>
        <Button
          color="info"
          value="draft"
          onClick={handleSubmit}
          disabled={isDisabled(data)}>
          ร่าง
        </Button>
        <Button
          color="success"
          value="updated"
          onClick={handleSubmit}
          disabled={isDisabled(data)}>
          อัพเดต
        </Button>
        <Link to={`/dashboard`}>
          <Button color="light">ยกเลิก</Button>
        </Link>
      </Button.Group>
    </Form.Field>
  );
};

EditButtonForm.propTypes = {
  onSubmit: PropTypes.func,
  id: PropTypes.number,
  data: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.object),
    content: PropTypes.string
  })
};

export default EditButtonForm;
