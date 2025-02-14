import { Overlay } from './styles';
import ReactDOM from 'react-dom';

export default function Loader() {
  return ReactDOM.createPortal(
    <Overlay>
      <div className="loader">
        
      </div>
    </Overlay>,
    document.getElementById('loader-root'),
  );
}
