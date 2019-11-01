import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bulma-components";

const CategoryForm = ({ onChange, value, categories }) => {
  const handleShowCategoriesOption = categories => {
    return categories.map(parent => (
      <optgroup key={parent.id} label={parent.name}>
        {parent.children.map(child => (
          <option key={child.id} value={child.id}>
            {child.name}
          </option>
        ))}
      </optgroup>
    ));
  };

  const handleChange = event => {
    onChange(event);
  };

  return (
    <Form.Field>
      <Form.Label>Category</Form.Label>
      <Form.Select
        name="category"
        value={value}
        className="is-fullwidth"
        onChange={handleChange}
      >
        <option value="0">Please select the category</option>
        {handleShowCategoriesOption(categories)}
      </Form.Select>
    </Form.Field>
  );
};

const CategoriesPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    )
  })
);

CategoryForm.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  categories: CategoriesPropTypes
};

export { CategoriesPropTypes };
export default CategoryForm;
