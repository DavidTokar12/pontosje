import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const GrammarErrorPopup = ({ errorInfo, anchorEl, onClose }) => {
    const open = Boolean(anchorEl);

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <div style={{ padding: '10px' }}>
                <Typography variant="body1"><strong>Type:</strong> {errorInfo?.type}</Typography>
                <Typography variant="body1"><strong>Replace with:</strong> {errorInfo?.replaceWith}</Typography>
            </div>
        </Popover>
    );
};

export default GrammarErrorPopup;
