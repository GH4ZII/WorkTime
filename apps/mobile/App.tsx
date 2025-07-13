import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
  );
};

export default App;
