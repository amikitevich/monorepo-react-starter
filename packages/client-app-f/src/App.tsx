import React from 'react';
import './App.scss';
import MainRouting from './routing/MainRouting';
import MainMenu from './shared/MainMenu/MainMenu';
import { useAuthorization } from '@foretell/shared';

const App: React.FC = () => {
  const isUserLoaded = useAuthorization();
  if (!isUserLoaded) return <div>Loading...</div>;
  return (
    <div className="app">
      <MainMenu />
      <MainRouting />
    </div>
  );
};

export default App;
