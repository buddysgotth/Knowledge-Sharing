import React from 'react';
import PropTypes from 'prop-types';
import { Button, Level } from 'react-bulma-components';

const PaginationController = ({ current, total, onChange }) => {
  const handleChangePage = page => {
    onChange(page);
  };
  return (
    <Level className="is-mobile is-flex">
      <Level.Side align="left">
        <Level.Item>
          <Button
            className="is-marginless paging"
            onClick={() => handleChangePage(current - 1)}
            disabled={current === 1}>
            ก่อนหน้า
          </Button>
        </Level.Item>
      </Level.Side>
      <Level.Item className="has-text-centered">
        หน้า {current} / {total}
      </Level.Item>
      <Level.Side align="right">
        <Level.Item>
          <Button
            className="is-marginless paging"
            onClick={() => handleChangePage(current + 1)}
            disabled={current === total}>
            ถัดไป
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
