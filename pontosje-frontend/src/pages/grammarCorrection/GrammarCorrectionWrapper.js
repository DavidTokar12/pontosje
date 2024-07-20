import React from 'react';
import GrammarCorrectionMain from './GrammarCorrectionMain';
import GrammarCollectionSideBar from './GrammarCollectionSideBar';

const GrammarCorrectionWrapper = () => {
    return (
        <div
            id='grammar-wrapper'
            style={{
                display: 'flex',
                height: '100%',
                width: "100%",
            }}
        >
            <div
                style={{
                    width: "20rem",
                    height: "100%",
                    display: 'flex',
                }}
            >
                <GrammarCollectionSideBar />
            </div>
            <div
                id="quill-scrollbar-wrapper"
                style={{
                    display: "flex",
                    flex: 1,
                }}
            >
                <div style={{ width: "100%", height: "100%", overflow: 'hidden' }}>
                    <GrammarCorrectionMain />
                </div>

            </div>
        </div>
    );
};

export default GrammarCorrectionWrapper;