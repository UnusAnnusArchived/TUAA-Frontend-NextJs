import TextField from "@mui/material/TextField";
import axios from "axios";
import React, ***REMOVED*** useEffect, useState ***REMOVED*** from "react";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";
import ***REMOVED*** endpoint ***REMOVED*** from "../../src/endpoints";
import ***REMOVED*** IVideo ***REMOVED*** from "../../src/types";
import ***REMOVED*** useToasts ***REMOVED*** from "@geist-ui/react";
import ***REMOVED*** Autocomplete, CircularProgress ***REMOVED*** from "@mui/material";
import router from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import ***REMOVED*** theme ***REMOVED*** from "../theme/theme";

const Search: React.FC = () => ***REMOVED***
  const ***REMOVED*** t ***REMOVED*** = useTranslation();

  const [, setToast] = useToasts();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly IVideo[]>([]);
  const loading = open && options.length === 0;
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => ***REMOVED***
    let active = true;

    if (!loading) ***REMOVED***
      return undefined;
***REMOVED***;

    (async() => ***REMOVED***
      try ***REMOVED***
        const res = await axios.get(`$***REMOVED***endpoint***REMOVED***/v2/metadata/all`);

        if (res.status === 200) ***REMOVED***
          if (active) ***REMOVED***
            setOptions([...res.data[0],...res.data[1]]);
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
          setToast(***REMOVED***
            type: "error",
            text: JSON.stringify(res.data)
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED*** catch (error) ***REMOVED***
        console.log(error);
  ***REMOVED***
***REMOVED***)();

    return () => ***REMOVED***
      active = false;
***REMOVED***;
***REMOVED*** [loading]);

  useEffect(() => ***REMOVED***
    if (!open) ***REMOVED***
      setOptions([]);
***REMOVED***;
***REMOVED*** [open]);

  const handleOpen = () => ***REMOVED***
    setOpen(true);
***REMOVED***;

  const handleClose = () => ***REMOVED***
    setOpen(false);
***REMOVED***;

  const handleOptionEqualToValue = (option:IVideo, value:IVideo) => ***REMOVED***
    const season = value.season.toString().padStart(2, "0");
    const episode = value.episode.toString().padStart(3, "0");

    router.push(`/watch/s$***REMOVED***season***REMOVED***.e$***REMOVED***episode***REMOVED***`);

    return option.title === value.title;
***REMOVED***;

  const getOptionLabel = (option:IVideo) => ***REMOVED***
    return option.title;
***REMOVED***;

  return (
    <Autocomplete sx=***REMOVED******REMOVED***textAlign: "center"***REMOVED******REMOVED*** open=***REMOVED***open***REMOVED*** onOpen=***REMOVED***handleOpen***REMOVED*** onClose=***REMOVED***handleClose***REMOVED*** isOptionEqualToValue=***REMOVED***handleOptionEqualToValue***REMOVED*** getOptionLabel=***REMOVED***getOptionLabel***REMOVED*** options=***REMOVED***options***REMOVED*** loading=***REMOVED***loading***REMOVED*** renderInput=***REMOVED***(params) => (
      <TextField ***REMOVED***...params***REMOVED*** variant="standard" style=***REMOVED******REMOVED*** width: isMdDown ? "calc(100% - 18px)" : "50%" ***REMOVED******REMOVED*** label=***REMOVED***t("common:search")***REMOVED*** InputProps=***REMOVED******REMOVED***
        ...params.InputProps,
        endAdornment: (
          <React.Fragment>
            ***REMOVED***loading ? <CircularProgress color="inherit" size=***REMOVED***20***REMOVED*** /> : null***REMOVED***
            ***REMOVED***params.InputProps.endAdornment***REMOVED***
          </React.Fragment>
        )
  ***REMOVED******REMOVED*** />
    )***REMOVED*** />
  );
***REMOVED***;

export default Search;
