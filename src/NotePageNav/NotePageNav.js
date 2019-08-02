import React from 'react';
import './NotePageNav.css';

export default function NotePageNav(props) {
    const folderDisplay = (props) => {
        if (props.folders !== undefined) {
            return props.folders.map((item) => (
                <button key={item.id}>{item.name}</button>
            ))
        }
    };

    return (
        <>
        {folderDisplay(props)}
        </>
    )
}