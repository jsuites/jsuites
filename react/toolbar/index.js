// @ts-nocheck
import React, { useRef, useEffect } from "react";
import jSuites from '../../dist/jsuites';

// @ts-ignore
export default React.forwardRef((props, mainReference) => {
    // Dom element
    const Ref = useRef(null);

    // Get the properties for the spreadsheet
    let options = { ...props };

    useEffect(() => {
        // @ts-ignore
        if (!Ref.current.innerHTML) {
            mainReference.current = jSuites.toolbar(Ref.current, options);
        }
    }, []);

    let prop = {
        ref: Ref,
    };

    return React.createElement("div", prop);
})