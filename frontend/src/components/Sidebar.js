import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Divider } from "@mui/material";
import Primary from "./InnerSide/Primary";
import Recommend from "./InnerSide/Recommend";
import ThemeSide from "./InnerSide/ThemeSide";
import Facilities from "./InnerSide/Facilities";
import { useDispatch, useSelector } from "react-redux";
import actionCreators from "../actions/actionCreators";
import axios from "axios";
import useDrawCommArea from "../actions/useDrawCommArea";
// Sidebar 넓이
const drawerWidth = 600;

const Sidebar = () => {
  const [value, setValue] = React.useState("1");
  const [facdongdata, setFacdongdata] = React.useState();
  const [recodongdata, setRecodongdata] = React.useState();
  const theme = useTheme();
  const dispatch = useDispatch();
  const guselectName = useSelector((state) => state.setMap.eodiyaMap.guNum);
  const dongselectName = useSelector((state) => state.setMap.eodiyaMap.dongNum);
  const RightSideBarMode = useSelector(
    (state) => state.setMap.eodiyaMap.rightSideBarMode
  );
  const isopen = useSelector((state) => state.setMap.eodiyaMap.isRightOpen);

  const { drawCommArea } = useDrawCommArea();

  useEffect(() => {
    setValue("1");
  }, [dongselectName]);

  const getFacData = (g, d) => {
    axios
      .get(`/search/${g}/${d}/location`, {
        headers: {
          "Content-type": "application/json",
          Accept: "*/*",
        },
      })
      .then((response) => {
        setFacdongdata(response.data.locationInfo[0]);
      })
      .catch((response) => {
        console.log("Error!");
        console.log(response, "from search");
      });
  };

  const getRecoData = (g, d) => {
    dispatch(actionCreators.setIsLoading(true));
    axios
      .get(`/search/${g}/${d}/recommend`, {
        headers: {
          "Content-type": "application/json",
          Accept: "*/*",
        },
      })
      .then((response) => {
        dispatch(actionCreators.setCommArea(response.data.commercialAreaInfo));
        dispatch(actionCreators.setIsLoading(false));
        setRecodongdata(response.data);
      })
      .then(() => {
        drawCommArea();
      })
      .catch((response) => {
        console.log("Error!");
        console.log(response, "from reco");
      });
  };
  // const [faciData, setFaciData] = React.useState([]);
  const handleChange = (event, newValue) => {
    if (newValue == 3) {
      getFacData(guselectName, dongselectName);
      // }
    } else if (newValue == 4) {
      getRecoData(guselectName, dongselectName);
    }
    setValue(newValue);
  };
  //  Sidebar 닫기 누르면 닫기
  const handleDrawerClose = () => {
    dispatch(actionCreators.setIsRightOpen(false), []);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "rgb(229, 240, 249)",
          },
        }}
        variant="persistent"
        anchor="right"
        open={isopen}
      >
        {/* Sidebar 닫는 부분 */}
        <DrawerHeader sx={{ backgroundColor: "rgb(34, 158, 251)" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* Sidebar 표시할 내용 */}
        {RightSideBarMode == 1 && (
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="기본정보" value="1" />
              <Tab label="위치정보" value="3" />
              <Tab label="추천정보" value="4" />
            </TabList>
            <TabPanel value="1">
              <Primary />
            </TabPanel>
            <TabPanel value="3">
              <Facilities facdongdata={facdongdata} />
            </TabPanel>
            <TabPanel value="4">
              <Recommend recoData={recodongdata} />
            </TabPanel>
          </TabContext>
        )}
        {RightSideBarMode == 2 && (
          <Box sx={{ p: 2 }}>
            <ThemeSide />
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
