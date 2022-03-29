import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel'; 
import { Divider } from '@mui/material';

// Sidebar 넓이
const drawerWidth = 400;

const Sidebar = ({open, getOpen}) => {
    const [value, setValue] = React.useState('1');
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //  Sidebar 닫기 누르면 닫기
    const handleDrawerClose = () => {
        getOpen(false);
    };
    
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }));

        return (
            <Box sx={{display:'flex'}}>
                <Drawer
                    sx={{
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        },
                    }}
                    variant="persistent"
                    anchor="right"
                    open={open}
                    >
                    {/* Sidebar 닫는 부분 */}
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    {/* Sidebar 표시할 내용 */}
                    <TabContext value={value}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab label="분석1" value="1" />
                            <Tab label="분석2" value="2" />
                            <Tab label="분석3" value="3" />
                        </TabList>
                        <TabPanel value="1">
                            Item One
                        </TabPanel>
                        <TabPanel value="2">
                            Item Two
                        </TabPanel>
                        <TabPanel value="3">
                            Item Three
                        </TabPanel>
                    </TabContext>
                </Drawer>
            </Box>
        );
}

export default Sidebar;