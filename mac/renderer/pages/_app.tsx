import '@/styles/globals.scss';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Component { ...pageProps } />
  </>
);

export default App;