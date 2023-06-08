import React from 'react';
import { AuthProvider } from './context/AuthContext.js'
import AppNav from './routes/AppNav';
export default function App() {
  return (  
    <AuthProvider>
        <AppNav/>
   </AuthProvider>
  );
};



