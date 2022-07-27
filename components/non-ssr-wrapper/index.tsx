import dynamic from "next/dynamic";
import React from "react";
const NonSSRWrapper = (props) => <React.Fragment>***REMOVED***props.children***REMOVED***</React.Fragment>;
export default dynamic(() => Promise.resolve(NonSSRWrapper), ***REMOVED***
  ssr: false,
***REMOVED***);
