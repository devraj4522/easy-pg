import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import KitchenIcon from '@mui/icons-material/Kitchen';
import TvIcon from '@mui/icons-material/Tv';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { viewProfileRequest } from '../redux/actions/userActions';

export default function MyProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userProfile?.user);

  useEffect(() => {
    dispatch(viewProfileRequest());
  }, [dispatch]);

  return (
    <Box
      sx={{
        maxWidth: '1000px',
        minHeight: '500px',
        m: 'auto',
        mt: 12,

        textAlign: '-webkit-center',
      }}
    >
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ p: 2 }}>Field</TableCell>
              <TableCell align="right" sx={{ p: 2 }}>
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ p: 2 }}>
                Name
              </TableCell>
              <TableCell align="right" sx={{ p: 2 }}>
                {user && user.name}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ p: 2 }}>
                Email
              </TableCell>
              <TableCell align="right" sx={{ p: 2 }}>
                {user && user.email}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ p: 2 }}>
                Phone Number
              </TableCell>
              <TableCell sx={{ p: 2 }} align="right">
                {user && user.phone}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
        Edit Profile
      </Button>
    </Box>
  );
}
