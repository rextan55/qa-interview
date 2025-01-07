import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import {ChessboardCanvas} from "./app/Chessboard";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ChessboardCanvas />
  </StrictMode>
);
