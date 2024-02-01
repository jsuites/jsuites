// @ts-nocheck
import React, { useRef, useEffect } from "react";
import jSuites from '../../dist/jsuites';
import { renderToStaticMarkup } from 'react-dom/server';

// @ts-ignore
export default React.forwardRef((props, mainReference) => {
    // Dom element
    const Ref = useRef(null);

    const template = renderToStaticMarkup(props.children)

    // Get the properties for the spreadsheet
    let options = { ...props };

    useEffect(() => {
        // @ts-ignore
        if (!Ref.current.innerHTML) {
            Ref.current.innerHTML = template

            mainReference.current = jSuites.modal(Ref.current, options);
        }
    }, []);

    let prop = {
        ref: Ref,
        style: { height: '100%', width: '100%' }
    };

    return React.createElement("div", prop);
})