import ReactDOM from "react-dom";
import QueryClientProvider from "./react-query/QueryClientProvider";
import QueryClient from "./react-query/QueryClient";

import App from "./App";

const client = new QueryClient();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>,
  rootElement
);
