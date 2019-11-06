import React from "react";
import PropTypes from "prop-types";
import { Button, Level } from "react-bulma-components";

const PaginationController = ({ current, total, onChange }) => {
  const handleChangePage = page => {
    onChange(page);
  };
  return (
    <Level className="is-mobile is-flex">
      <Level.Side align="left">
        <Level.Item>
          <Button
            className="is-marginless"
            onClick={() => handleChangePage(current - 1)}
            disabled={current === 1}
          >
            Prev
          </Button>
        </Level.Item>
      </Level.Side>
      <Level.Item className="has-text-centered">
        Page {current} / {total}
      </Level.Item>
      <Level.Side align="right">
        <Level.Item>
          <Button
            className="is-marginless"
            onClick={() => handleChangePage(current + 1)}
            disabled={current === total}
          >
            Next
          </Button>
        </Level.Item>
      </Level.Side>
    </Level>
  );
};

PaginationController.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
  onChange: PropTypes.func
};

PaginationController.defaultProps = {
  current: 1,
  total: 1,
  onChange: () => {}
};

export default PaginationController;
