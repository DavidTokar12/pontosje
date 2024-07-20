import React, { useState } from 'react';
import { Drawer, Divider } from '@mui/material';
import GrammarCorrectionMain from './GrammarCorrectionMain';
import GrammarCollectionSideBar from './GrammarCollectionSideBar';

const GrammarCorrectionWrapper = () => {
    return (
        
        <div
            id='grammar-wrapper'
            style={{
                display: 'flex',
                flexGrow: 1,
                height: '100%',
            }}
        >
            <div
                style={{
                    width: "20rem",
                    height: "100%",
                }}
            >
                <GrammarCollectionSideBar />
            </div>
            <div
                id="quill-scrollbar-wrapper"
                style={{
                    flexGrow: 1,
                    display: 'flex',
                    transition: 'margin-left 0.3s',
                }}
            >
                <GrammarCorrectionMain />
            </div>
        </div>
    );
};

export default GrammarCorrectionWrapper;