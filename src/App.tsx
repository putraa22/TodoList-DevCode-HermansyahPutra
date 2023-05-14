import React from "react";
import { Global } from "@emotion/react";
import Header from "./components/Header/Header";
import { globalStyle } from "./globalStyle/globalStyle";
import Main from "./components/Main/Main";

function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <Header />
      <Main />
    </>
  );
}

export default App;
