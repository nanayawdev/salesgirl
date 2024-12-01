import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  );
}

export default App;
