import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { PostHogProvider } from "posthog-js/react";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { ThemeProvider } from "./utils/ThemeContext";

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <PostHogProvider
          apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
          options={options}
        >
          <App />
        </PostHogProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
