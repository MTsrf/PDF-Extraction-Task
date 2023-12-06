import { Box, CssBaseline, Divider, IconButton, List, Toolbar, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar';
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../hooks/useAuth';
import { Outlet, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
const drawerWidth = 240;


const AppLayout = (props) => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }} onClick={() => navigate("/")}>
                PDF-Extraction
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{ display: "flex", alignContent: "center", flexDirection: "column" }}>
                        <IconButton
                            color="#424242"
                            edge="start"
                            onClick={logout}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav" sx={{ backgroundColor: "#f5f5f5" }}>
                    <Toolbar>
                        <IconButton
                            color="#424242"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            onClick={() => navigate("/")}
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, cursor: "pointer", color: "#424242" }}
                        >
                            PDF-Extraction
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <IconButton
                                color="#424242"
                                edge="start"
                                onClick={logout}
                            >
                                <LogoutIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
                <Box component="main" sx={{ p: 2, width: "100%" }}>
                    <Toolbar />
                    <Outlet />
                </Box>
            </Box>
        </>
    )
}

export default AppLayout
