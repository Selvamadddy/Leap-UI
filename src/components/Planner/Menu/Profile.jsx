import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import profileimg from "../../../assets/profile.PNG";
import "../../../stylesheet/Menu.css";
import { useNavigate } from 'react-router';

export default function Profile() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const HandleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/Login');
  }

  return (
    <Box>
      <Tooltip title="Open settings" sx={{ marginTop: "100px" }}>
        <img src={profileimg} className='profile' onClick={handleOpenUserMenu} />
      </Tooltip>
      <Menu
        sx={{ mt: '2.4%' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Button size="small" onClick={HandleLogOut}>logout</Button>
      </Menu>
    </Box>
  );
}