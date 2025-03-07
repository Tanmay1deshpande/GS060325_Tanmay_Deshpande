import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import SideDrawer from "../../components/Drawer/SideDrawer";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <Navbar />
      <SideDrawer />
    </div>
  );
};

export default Home;
