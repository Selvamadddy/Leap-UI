import Snackbar from '@mui/material/Snackbar';
import React from 'react';

export default function SnackBarMessage(props) {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        props.setdisplayCopiedMsg();
    };
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={props.message}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
    );
}