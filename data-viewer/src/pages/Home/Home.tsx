import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SideDrawer from "../../components/Drawer/SideDrawer";
import TableMain from "../../components/TableMain/TableStore";
import Chart from "../Chart/Chart";
import TableStore from "../../components/TableMain/TableStore";
import TableSKU from "../../components/TableMain/TableSKU";

type Props = {};

const Home = (_props: Props) => {
  // State to track the selected tab
  const [selectedTab, setSelectedTab] = React.useState<string>("Store");

  React.useEffect(() => {
    console.log("Open Tab: " + selectedTab);
  }, [selectedTab]);

  return (
    <div>
      <Navbar />
      <SideDrawer selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab == "Store" && <TableStore selectedTab={selectedTab} />}

      {selectedTab == "SKU" && <TableStore selectedTab={selectedTab} />}

      {selectedTab == "Planning" && <TableStore selectedTab={selectedTab} />}

      {/* {["Store", "SKU", "Planning"].includes(selectedTab) && (
        <TableStore selectedTab={selectedTab} />
      )} */}

      {selectedTab == "Charts" && <Chart selectedTab={selectedTab} />}
    </div>
  );
};

export default Home;
