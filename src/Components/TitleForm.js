import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bulma-components";

const TitleForm = ({ onChange, value }) => {
  const handleChange = event => {
    onChange(event);
  };

  return (
    <Form.Field>
      <Form.Label>Title</Form.Label>
      <Form.Input name="title" value={value} onChange={handleChange} />
    </Form.Field>
  );
};

TitleForm.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default TitleForm;
