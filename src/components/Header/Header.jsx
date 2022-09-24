import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LoginDialog from '../LoginDialog/LoginDialog';
import RegisterDialog from '../RegisterDialog/RegisterDialog';

import "./styles.css";
import { LoginContext } from "../../contexts/LoginContext";

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const {user,signed,logout} = useContext(LoginContext)
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

  const handleClick = (event) => {
    setShowMenu(event.currentTarget);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setShowMenu(false);
  };

  const handleClickOpenLogin = () => {
    setOpenLoginDialog(true);
  }

  const handleClickCloseLogin = () => {
    setOpenLoginDialog(false)
  }

  const handleClickOpenRegister = () => {
    setOpenLoginDialog(false)
    setOpenRegisterDialog(true)
  }

  const handleClickCloseRegister = () => {
    setOpenRegisterDialog(false)
  }
  
  return (
    <div className="root">
      <AppBar position="sticky" className="appBar">
        <Toolbar className="tollBar">
          <IconButton color="inherit" onClick={handleClick} edge="start">
            <MenuIcon fontSize="large" />
          </IconButton>

          <Menu
            id="customized-menu"
            anchorEl={showMenu}
            keepMounted
            open={showMenu}
            onClose={handleClose}
            MenuListProps={{ disablePadding: true }}
            className="paper"
          >
            <Link to="/" className="linkMenu">
              <MenuItem onClick={handleClose} className="menu">
                <Typography variant="h6">
                  Início
                </Typography>  
              </MenuItem>
            </Link>
            <Link to="/categorias" className="linkMenu">
              <MenuItem onClick={handleClose} className="menu">
                <Typography variant="h6">
                  Busca por restaurantes  
                </Typography>
              </MenuItem>
            </Link>
          </Menu>
          <div className="logo">
            <span>iterisFood</span>
          </div>

          {!signed && (
            <div>
              <IconButton color="inherit" onClick={handleClickOpenLogin} edge="start">
                <AccountCircle fontSize="large" />
              </IconButton>
              <LoginDialog openLoginDialog={openLoginDialog} closeLoginDialog={handleClickCloseLogin} openRegisterDialog={handleClickOpenRegister}/>
              <RegisterDialog openRegisterDialog={openRegisterDialog} closeRegisterDialog={handleClickCloseRegister}/>
            </div>
          )}
          {signed && (
            <div>
              <Box display={"flex"} alignItems="center" onClick={handleClickAnchor}>
                <Avatar>{user.username[0].toUpperCase()}</Avatar>
              </Box>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                >
                <MenuItem onClick={() => {logout(); setAnchorEl(null)} }>Sair</MenuItem>
              </Menu>
            </div>
          )}

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
