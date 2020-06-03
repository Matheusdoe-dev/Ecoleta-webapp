import React from "react";
import Routes from "./routes";

// styles
import Colors from "./styles/settings/colors";
import Fonts from "./styles/settings/fonts";
import Reset from "./styles/generic/reset";
import Elements from "./styles/base/elements";

const App = () => {
  return (
    <>
      <Colors />
      <Fonts />
      <Reset />
      <Elements />

      <Routes />
    </>
  );
};

export default App;
