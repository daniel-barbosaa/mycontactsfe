import GlobalStyles from '../../assets/styles/global';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../assets/styles/themes/default';
import { Container } from './styles';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from '../../Routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Container>
          <Header />
          <AppRoutes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}
export default App;
