// @ts-nocheck
import React, { useRef, useEffect } from "react";
import Component from '../../src/plugins/dropdown';


// @ts-ignore
export default React.forwardRef((props, mainReference) => {
    // Dom element
    const Ref = useRef(null);

    // Get the properties for the spreadsheet
    let options = { ...props };

    useEffect(() => {
        // @ts-ignore
        if (!Ref.current.innerHTML) {
            mainReference.current = Component(Ref.current, options);
        }
    }, []);

    // useEffect(() => {
    //     for (let key in props) {
    //         if (props.hasOwnProperty(key) && mainReference.current.hasOwnProperty(key)) {
    //             if (props[key] !== mainReference.current[key]) {
    //                 mainReference.current[key] = props[key];
    //             }
    //         }
    //     }
    // }, [props])

    let prop = {
        ref: Ref,
        style: { height: '100%', width: '100%' }
    };

    return React.createElement("div", prop);
})