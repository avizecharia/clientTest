import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./redux/strore.ts";
import { io } from 'socket.io-client'

export const socket = io('http://localhost:7770')


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
