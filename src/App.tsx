import { Routes, Route, Navigate } from 'react-router-dom';
import { FC, Suspense } from 'react';
import InstagramLoading from './components/ui/InstagramLoading';
import useUserStore from './store/userStore';
import Header from './components/header';
import { ROUTES } from './routes';

const App: FC = () => {
  const user = useUserStore((state) => state.user);
  return (
    <Suspense fallback={<InstagramLoading />}>
      <div className="bg-gray-background">
        {user && <Header user={user} />}
        <Routes>
          {Object.values(ROUTES).map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
          <Route
            path="*"
            element={<Navigate replace to={ROUTES.NOTFOUND.path} />}
          />
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
