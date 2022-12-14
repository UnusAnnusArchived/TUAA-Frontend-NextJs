import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../../src/endpoints.json";
import { IVideo } from "../../src/types";
import { useToasts } from "@geist-ui/react";
import { Autocomplete, CircularProgress } from "@mui/material";
import router from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme } from "../theme/theme";

const Search: React.FC = () => {
  const { t } = useTranslation();

  const [, setToast] = useToasts();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly IVideo[]>([]);
  const loading = open && options.length === 0;
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const res = await axios.get(`${api}/v2/metadata/all`);

        if (res.status === 200) {
          if (active) {
            setOptions([...res.data[0], ...res.data[1]]);
          }
        } else {
          setToast({
            type: "error",
            text: JSON.stringify(res.data),
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOptionEqualToValue = (option: IVideo, value: IVideo) => option.title === value.title;

  const getOptionLabel = (option: IVideo) => {
    return option.title;
  };

  const handleChange = (evt: any, value: IVideo) => {
    const season = value.season.toString().padStart(2, "0");
    const episode = value.episode.toString().padStart(3, "0");

    router.push(`/watch/s${season}.e${episode}`);
  };

  return (
    <Autocomplete
      // @ts-ignore mui is literally stupid and says it's an array but it's not
      onChange={handleChange}
      sx={{ textAlign: "center" }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={handleOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          key="search-bar"
          variant="standard"
          style={{ width: isMdDown ? "calc(100% - 18px)" : "50%" }}
          label={t("common:search")}
          type="search"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
            autoComplete: "false",
          }}
        />
      )}
    />
  );
};

export default Search;
