import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Modal = ({open, closeModal, children}) =>
  open ? (
    <Container>
      <Backdrop onClick={closeModal} />
      <Content>{children}</Content>
    </Container>
  ) : null

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  transition: 1s ease-in;
`
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`
const Content = styled.div`
  width: 400px;
  height: auto;
  margin-top: 80px;
  z-index: 110;
`

export default Modal
