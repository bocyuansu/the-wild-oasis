import { Navigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';

function FullPage({ children }) {
  return (
    <div className="h-screen bg-grey-50 flex items-center justify-center">
      {children}
    </div>
  );
}

function ProtectedRoute({ children, redirect, requireAuth }) {
  // 1. 讀取通過身分驗證的用戶
  const { isPending, isAuthenticated } = useUser();

  // 2. 判斷使用者是否有權限存取該路由
  const hasAccess = requireAuth === isAuthenticated;

  // 3. 正在讀取時，顯示 Spinner
  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4. 若沒有權限存取該路由，導航到有權限的路由
  if (!hasAccess) {
    return <Navigate to={redirect} replace />;
  }

  return children;
}

export default ProtectedRoute;
