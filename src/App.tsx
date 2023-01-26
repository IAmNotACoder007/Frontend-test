import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import { AccessTokenProvider } from "./AuthProvider";
import { Header } from "./components/header/Header";
import { Routes } from "./Routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <AccessTokenProvider>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <Router>
            <Header />
            <main className="app-main">
              <Routes />
            </main>
          </Router>
        </div>
      </QueryClientProvider>
    </AccessTokenProvider>
  );
}

export default App;
