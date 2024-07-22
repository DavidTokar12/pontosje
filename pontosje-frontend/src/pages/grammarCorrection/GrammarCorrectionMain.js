import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { processHtmlContent } from "../../utils/grammarHtmlGenerator"
import { initializeWebSocketConnection, terminateWebSocketConnection, sendWebsocketMessage } from '../../slices//websocket/websocketSlice';

const GrammarCorrectionMain = () => {

    const [htmlContent, setHtmlContent] = useState('<div><sentence>Ohh hi mark</sentence></div><div>XD mi a picsa</div>');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeWebSocketConnection());

        return () => {
            dispatch(terminateWebSocketConnection());
        };
    }, [dispatch]);


    const debouncedUpdate = useCallback(
        debounce((value) => {
            const proceddedHtml = processHtmlContent(value);
            dispatch(sendWebsocketMessage(proceddedHtml));
        }, 1000),
        [dispatch]
    );

    const handleEditorChange = (event) => {

    };

    const handleChange = evt => {
        setHtmlContent(evt.target.value);
    };

    return (
        <div
            contentEditable
            onInput={handleEditorChange}
            style={{
                height: '100%',
                fontSize: '1.5rem',
                fontFamily: 'Arial, sans-serif',
                overflow: 'auto',
                padding: '10px',
                boxSizing: 'border-box',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                cursor: 'text',
                caretColor: "blue"
            }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};


export default GrammarCorrectionMain;
