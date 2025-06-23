// import './App.css';
import Heading from './Heading';
import Button from './Button';

function Box({ children }) {
  return (
    <div className="bg-grey-0 border border-grey-100 rounded-md p-12 basis-240 text-center [&_h1]:mb-4 [&_p]:font-['Sono'] [&_p]:mb-8 [&_p]:text-grey-500">
      {children}
    </div>
  );
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <main className="h-screen bg-grey-50 flex items-center justify-center p-12">
        <Box>
          <Heading level={1}>發生錯誤🫠</Heading>
          <p>{error.message}</p>
          <Button size="large" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Box>
      </main>
    </>
  );
}

export default ErrorFallback;
