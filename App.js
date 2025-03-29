import React from "react";
import ReactDOM from "react-dom/client";
import Jobcomponent from "./src/components/Jobcomponent";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Jobcomponent />
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
