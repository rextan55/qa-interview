import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { BrowserRouter, Route, Routes } from 'react-router';
import { ChessboardNormal } from './app/ChessboardNormal';
import { ChessboardCustomBoard } from './app/ChessboardCustomBoard';
import { ChessboardComputer } from './app/ChessboardComputer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChessboardNormal />} />
        <Route path="computer" element={<ChessboardComputer />} />
        <Route path="custom" element={<ChessboardCustomBoard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
