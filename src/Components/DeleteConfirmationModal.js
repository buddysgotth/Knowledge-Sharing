import React from 'react';
import { Heading, Box, Columns, Button, Modal } from 'react-bulma-components';

const DeleteConfirmationModal = ({ show, onDelete, onClose, title }) => {
  return (
    <Modal show={show} onClose={onClose} closeOnBlur={true}>
      <Modal.Content>
        <Box>
          <Heading size={5} className="has-text-centered">
            คุณต้องการลบบทความ "{title}" หรือไม่?
          </Heading>
          <Columns breakpoint="mobile">
            <Columns.Column className="has-text-centered">
              <Button
                color="danger"
                className="confirmation"
                onClick={onDelete}>
                ยืนยัน
              </Button>
            </Columns.Column>
            <Columns.Column className="has-text-centered">
              <Button color="light" className="confirmation" onClick={onClose}>
                ย้อนกลับ
              </Button>
            </Columns.Column>
          </Columns>
        </Box>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteConfirmationModal;
