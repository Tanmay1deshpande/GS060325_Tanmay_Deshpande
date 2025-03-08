import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  BarChartOutlined,
  CategoryOutlined,
  EventNoteOutlined,
  StoreMallDirectoryOutlined,
} from "@mui/icons-material";

const drawerWidth = 240;

type Props = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

const SideDrawer: React.FC<Props> = ({ selectedTab, setSelectedTab }) => {
  const menuItems = [
    { text: "Store", icon: <StoreMallDirectoryOutlined /> },
    { text: "SKU", icon: <CategoryOutlined /> },
    { text: "Planning", icon: <EventNoteOutlined /> },
    { text: "Charts", icon: <BarChartOutlined /> },
  ];

  return (
    <div>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            top: "64px",
          },
        }}
      >
        {/* <Toolbar /> */}
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map(({ text, icon }) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ background: selectedTab == text ? "#51a9ff" : "initial" }}
              >
                <ListItemButton onClick={() => setSelectedTab(text)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
