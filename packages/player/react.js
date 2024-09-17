// @ts-nocheck
import React, { useRef, useEffect } from "react";
import player from './player';

// @ts-ignore
export default React.forwardRef((props, mainReference) => {
    // Dom element
    const Ref = useRef(null);

    // Get the properties for the spreadsheet
    let options = { ...props };

    useEffect(() => {
        // @ts-ignore
        if (!Ref.current.innerHTML) {
            mainReference.current = player(Ref.current, options);
        }
    }, []);

    let prop = {
        ref: Ref,
    };

    return React.createElement("div", prop);
})