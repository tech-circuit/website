import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "react-owl-carousel2/lib/styles.css";
// import SimpleReactLightbox from "simple-react-lightbox";

ReactDOM.render(
    <React.StrictMode>
        {/* <SimpleReactLightbox> */}
        <App />
        {/* </SimpleReactLightbox> */}
    </React.StrictMode>,
    document.getElementById("root")
);
