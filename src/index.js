import React from "react";
import ReactDOM from "react-dom/client";
import TodoList from "./TodoList";
import { ChakraBaseProvider } from "@chakra-ui/react";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <TodoList />
    </ChakraBaseProvider>
  </React.StrictMode>
);
