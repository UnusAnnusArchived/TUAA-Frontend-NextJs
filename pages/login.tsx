import TextField from "@mui/material/TextField";
import React, ***REMOVED*** useState ***REMOVED*** from "react";
import ***REMOVED*** Layout ***REMOVED*** from "../components/layout";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import styles from "../styles/Login.module.scss";
import classNames from "classnames";
import Button from "@mui/material/Button";
import ***REMOVED*** endpoint ***REMOVED*** from "../src/endpoints";
import axios from "axios";
import ***REMOVED*** LoginResponse ***REMOVED*** from "../src/types";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** previousPageAtom, userAtom ***REMOVED*** from "../src/atoms";
import ***REMOVED*** MetaHead ***REMOVED*** from "../components/meta-head";
import ***REMOVED*** useRouter ***REMOVED*** from "next/router";
import ***REMOVED*** useToasts ***REMOVED*** from "@geist-ui/react";
import Typography from "@mui/material/Typography";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";

const LoginPage: React.FC = () => ***REMOVED***
  const ***REMOVED*** t ***REMOVED*** = useTranslation();
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [previousPage, setPreviousPage] = useRecoilState(previousPageAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [, setToast] = useToasts();

  const handleClickShowPassword = () => ***REMOVED***
    setShowPassword(!showPassword);
***REMOVED***;

  const isValid = () => ***REMOVED***
    return email.length > 0 && password.length > 0;
***REMOVED***;

  const onSubmit = async () => ***REMOVED***
    if (!isValid()) ***REMOVED***
      return;
***REMOVED***

    try ***REMOVED***
      const res = await axios.post<LoginResponse>(
        `$***REMOVED***endpoint***REMOVED***/v2/account/login`,
        ***REMOVED***
          username: email,
          password,
      ***REMOVED***
        ***REMOVED***
          headers: ***REMOVED***
            "Access-Control-Allow-Origin": "*",
        ***REMOVED***
    ***REMOVED***
      );

      if (res.status !== 200) ***REMOVED***
        return;
  ***REMOVED***

      const ***REMOVED*** data ***REMOVED*** = res;

      if (data) ***REMOVED***
        if (data.isValid) ***REMOVED***
          setLoggedInUser(data);
          if (previousPage && previousPage.length > 3) ***REMOVED***
            router.push(previousPage);
      ***REMOVED*** else router.push("/");
          return;
    ***REMOVED***

        setToast(***REMOVED***
          type: "error",
          text: t("login:error"),
    ***REMOVED***);
  ***REMOVED***
***REMOVED*** catch (err) ***REMOVED***
      console.log(err);
***REMOVED***
***REMOVED***;

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => ***REMOVED***
    event.preventDefault();
***REMOVED***;

  return (
    <Layout>
      <MetaHead title=***REMOVED***`$***REMOVED***t("login:title")***REMOVED*** | The Unus Annus Archive`***REMOVED*** />
      <Typography className="text-center my-2" variant="h5" component="h1">
        ***REMOVED***t("login:titleLong")***REMOVED***
      </Typography>
      <form id="login-form">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <TextField
            className=***REMOVED***classNames("my-3", styles.field)***REMOVED***
            id="email-archive"
            name="email-archive"
            label=***REMOVED***t("login:usernameEmail")***REMOVED***
            variant="standard"
            value=***REMOVED***email***REMOVED***
            type="email"
            onChange=***REMOVED***(e) => setEmail(e.target.value)***REMOVED***
          />
          <FormControl
            variant="standard"
            className=***REMOVED***classNames("my-3", styles.field)***REMOVED***
          >
            <InputLabel htmlFor="standard-adornment-password">
              ***REMOVED***t("login:password")***REMOVED***
            </InputLabel>
            <Input
              id="password-archive"
              name="password-archive"
              type=***REMOVED***showPassword ? "text" : "password"***REMOVED***
              value=***REMOVED***password***REMOVED***
              onChange=***REMOVED***(event) => setPassword(event.currentTarget.value)***REMOVED***
              endAdornment=***REMOVED***
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick=***REMOVED***handleClickShowPassword***REMOVED***
                    onMouseDown=***REMOVED***handleMouseDownPassword***REMOVED***
                  >
                    ***REMOVED***showPassword ? <VisibilityOff /> : <Visibility />***REMOVED***
                  </IconButton>
                </InputAdornment>
          ***REMOVED***
            />
          </FormControl>
          <div
            className=***REMOVED***classNames(
              "my-4 d-flex justify-content-end",
              styles.field
            )***REMOVED***
          >
            <Button
              variant="contained"
              disabled=***REMOVED***!isValid()***REMOVED***
              onClick=***REMOVED***onSubmit***REMOVED***
            >
              ***REMOVED***t("login:loginBtn")***REMOVED***
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
***REMOVED***;

export default LoginPage;
