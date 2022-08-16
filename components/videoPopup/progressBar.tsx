import * as React from "react";
import LinearProgress, ***REMOVED*** LinearProgressProps ***REMOVED*** from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface IProps ***REMOVED***
  value: number;
***REMOVED***

const ProgressBar: React.FC<IProps> = (***REMOVED*** value ***REMOVED***) => ***REMOVED***
  return (
    <Box sx=***REMOVED******REMOVED*** display: "flex", alignItems: "center" ***REMOVED******REMOVED***>
      <Box sx=***REMOVED******REMOVED*** width: "100%", mr: 1 ***REMOVED******REMOVED***>
        <LinearProgress variant="determinate" value=***REMOVED***value***REMOVED*** />
      </Box>
      <Box sx=***REMOVED******REMOVED*** minWidth: 35 ***REMOVED******REMOVED***>
        <Typography variant="body2" color="text.secondary">***REMOVED***`$***REMOVED***Math.round(value)***REMOVED***%`***REMOVED***</Typography>
      </Box>
    </Box>
  );
***REMOVED***;

export default ProgressBar;
