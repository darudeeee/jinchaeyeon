import {
	AccountCircle,
	ArrowDropDown,
	CalendarMonth,
	ExpandLess,
	ExpandMore,
	Home,
	Menu,
	Send,
} from "@mui/icons-material";
import { Breadcrumbs } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import MenuList from "../Data/MenuList.json";
import { drawerOpenState, menuOpenState } from "../Store/atom";

const drawerWidth = 240;
const appbarHeight = 64;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below the app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Appbar = (props) => {
  const [menuopen, setMenuOpen] = useRecoilState(menuOpenState);
  const [open, setOpen] = useRecoilState(drawerOpenState);
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [menu, setMenu] = useState({
    id: 1.1,
    name: "공지사항",
    submenu: [],
    link: "/Notice",
  });
  const [breadcrumbs, setBreadcrumbs] = useState("게시판");

  useEffect(() => {
    setList(MenuList);
    MenuList.map((item) => {
      item.submenu.map((link) => {
        if (link.link == window.location.pathname) {
          setMenu(link);
          setMenuOpen(item.name);
          setBreadcrumbs(item.name);
        }
      });
    });
  }, []);

  const handleClick = (name) => {
    setMenuOpen(name == menuopen ? "" : name);
  };
  const onLink = (link, item) => {
    setBreadcrumbs(item.name);
    setMenu(link);
    navigate(link.link);
  };

  const Breadcrumb = () => {
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Typography sx={{ display: "flex", alignItems: "center" }} color="gray">
          <Home />
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          color="gray"
        >
          {breadcrumbs}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          color="gray"
        >
          {menu.name}
        </Typography>
      </Breadcrumbs>
    );
  };

  return (
    <>
      <AppBar position="fixed" open={open} sx={{ height: appbarHeight }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              edge="start"
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h4"
              sx={{ flexGrow: 1, fontWeight: 600, paddingRight: "10px" }}
            >
              TMS
            </Typography>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              Total Marketing Server
            </Typography>
          </div>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
              <Typography
                variant="subtitle1"
                sx={{ flexGrow: 1, paddingLeft: "5px" }}
              >
                휴머스온
              </Typography>
              <ArrowDropDown />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: `${appbarHeight}px`,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex" }}>
            <Typography variant="subtitle1" color="gray">
              휴머스온
            </Typography>
            <ArrowDropDown color="gray" />
          </div>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((item) => (
            <div key={item.id}>
              <ListItemButton onClick={(e) => handleClick(item.name)}>
                <ListItemIcon sx={{ color: "black" }}>
                  {item.name == "게시판" ? (
                    <CalendarMonth />
                  ) : item.name == "메시지" ? (
                    <Send />
                  ) : null}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontWeight: 600,
                  }}
                />
                {menuopen == item.name ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {item.submenu.length > 0 && (
                <Collapse
                  in={menuopen == item.name}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.submenu.map((submenu) => (
                      <ListItemButton sx={{ pl: 4 }} key={submenu.id}>
                        <ListItemText
                          primary={submenu.name}
                          primaryTypographyProps={{
                            fontWeight: 600,
                            color:
                              submenu.name == menu.name ? "orange" : "gray",
                          }}
                          onClick={() => onLink(submenu, item)}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            style={{ paddingLeft: "15px", fontWeight: 700 }}
          >
            {menu.name}
          </Typography>
          <Breadcrumb />
        </DrawerHeader>
        <Divider />
        {props.children}
      </Main>
    </>
  );
};

export default Appbar;
