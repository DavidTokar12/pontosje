import React, { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { processHtmlContent } from "../../utils/grammarHtmlGenerator"
import { initializeWebSocketConnection, terminateWebSocketConnection, sendWebsocketMessage } from '../../slices//websocket/websocketSlice';
import { minHeight } from '@mui/system';

const commonEditorStyle = {
    minHeight: '100%',
    width: '100%',
    fontSize: '1.5rem',
    fontFamily: 'Arial, sans-serif',
    overflow: 'auto',
    padding: '10px',
    boxSizing: 'border-box',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
};

const GrammarCorrectionMain = () => {
    const [htmlContent, setHtmlContent] = useState('');

    const editorRef = useRef(null);
    const displayRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeWebSocketConnection());

        return () => {
            dispatch(terminateWebSocketConnection());
        };
    }, [dispatch]);

    const debouncedUpdate = useCallback(
        debounce((value) => {

            // dispatch(sendWebsocketMessage(processedHtml));

            // const selection = document.getSelection();
            // const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

            // editorRef.current.innerHTML = processedHtml;

            // if (range) {
            //     const newSelection = document.getSelection();
            //     newSelection.removeAllRanges();

            //     try {
            //         newSelection.addRange(range);
            //     } catch (e) {
            //         console.warn('Could not restore previous selection range:', e);
            //     }
            // }


        }, 1000),
        [dispatch]
    );

    // useLayoutEffect(() => {
    //     debouncedUpdate(htmlContent);
    // }, [htmlContent]);

    // useLayoutEffect(() => {
    //     if (selectionState && editorRef.current) {
    //         const { startContainer, startOffset, endContainer, endOffset } = selectionState;
    //         if (startContainer && endContainer) {
    //             try {
    //                 const range = document.createRange();
    //                 range.setStart(startContainer, startOffset);
    //                 range.setEnd(endContainer, endOffset);

    //                 const selection = window.getSelection();

    //                 selection.removeAllRanges();
    //                 selection.addRange(range);
    //             } catch (error) {
    //                 console.error('Error restoring selection:', error);
    //             }
    //         }
    //     }
    // }, [selectionState, editorRef]);


    const handleEditorChange = useCallback((event) => {
        console.log("Xd");

        const content = event.target.innerHTML;
        setHtmlContent(content);

        // const processedHtml = processHtmlContent(content);
        // setHtmlContent(processedHtml);
    }, []);

    // useEffect(() => {
    //     const syncScroll = (e) => {
    //         if (e.target === displayRef.current) {
    //             editorRef.current.scrollTop = e.target.scrollTop;
    //             editorRef.current.scrollLeft = e.target.scrollLeft;
    //         } else if (e.target === editorRef.current) {
    //             displayRef.current.scrollTop = e.target.scrollTop;
    //             displayRef.current.scrollLeft = e.target.scrollLeft;
    //         }
    //     };

    //     displayRef.current?.addEventListener('scroll', syncScroll);
    //     editorRef.current?.addEventListener('scroll', syncScroll);

    //     return () => {
    //         displayRef.current?.removeEventListener('scroll', syncScroll);
    //         editorRef.current?.removeEventListener('scroll', syncScroll);
    //     };
    // }, []);


    return (
        <div style={{ position: 'relative', height: '100%', width: "100%", overflow: "auto" }}>
            <div
                style={{
                    ...commonEditorStyle,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                }}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleEditorChange}
                style={{
                    ...commonEditorStyle,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    cursor: 'text',
                    caretColor: 'blue',
                    color: 'transparent',
                }}
            />
        </div>
    );
};

export default GrammarCorrectionMain;