import { useMoveBack } from '../hooks/useMoveBack';
import Button from '../ui/Button';
import Heading from '../ui/Heading';

function StyledPageNotFound({ children }) {
  return (
    <main className='h-screen bg-grey-50 flex items-center justify-center p-12'>{children}</main>
  );
}

function Box({ children }) {
  return (
    <div className='bg-grey-0 border-2 border-solid border-grey-100 rounded-lg p-12 flex-[0_1_60rem] text-center'>
      {children}
    </div>
  );
}

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Box>
        <Heading level={1} className='mb-[3.2rem]'>
          找不到此頁面 😢
        </Heading>
        <Button onClick={moveBack} size='large'>
          &larr; 回上一頁
        </Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
