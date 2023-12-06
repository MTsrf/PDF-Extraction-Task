import { useRoutes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './app/context/JWTAuthContext';
import routes from './app/routes';
import { pdfjs } from 'react-pdf';
import { SnackbarProvider } from 'notistack'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function App() {
  const content = useRoutes(routes);
  return (
    <>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={2000}>
        <AuthProvider>
          {content}
        </AuthProvider>
      </SnackbarProvider >
    </>
  );
}

export default App;
