import { Overlay, Container, Footer } from './styles';
import Button from '../Button';
import PropTypes from 'prop-types';
import ReactPortal from '../ReactPortal';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

export default function Modal({
  danger = true,
  children,
  title,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  onCancel,
  onConfirm,
  visible,
  isLoading = false,
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay $isLeaving={!visible} ref={animatedElementRef}>
        <Container $danger={danger} $isLeaving={!visible}>
          <h1>{title}</h1>
          <div className="modal-body">{children}</div>
          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  isDeleteModalVisible: PropTypes.bool.isRequired,
  IsLoading: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
