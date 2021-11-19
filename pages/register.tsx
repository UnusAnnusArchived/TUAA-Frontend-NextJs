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
import ***REMOVED*** SignupResponse ***REMOVED*** from "../src/types";
import ***REMOVED*** useRecoilState ***REMOVED*** from "recoil";
import ***REMOVED*** previousPageAtom, userAtom ***REMOVED*** from "../src/atoms";
import ***REMOVED*** MetaHead ***REMOVED*** from "../components/meta-head";
import ***REMOVED*** useRouter ***REMOVED*** from "next/router";
import ***REMOVED*** useToasts ***REMOVED*** from "@geist-ui/react";
import Typography from "@mui/material/Typography";
import ***REMOVED*** useTranslation ***REMOVED*** from "react-i18next";

const LoginPage: React.FC = () => ***REMOVED***
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const ***REMOVED*** t ***REMOVED*** = useTranslation();
  const [previousPage, setPreviousPage] = useRecoilState(previousPageAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [, setToast] = useToasts();

  const handleClickShowPassword = () => ***REMOVED***
    setShowPassword(!showPassword);
***REMOVED***;

  const isValid = () => ***REMOVED***
    return (
      email.trim().length > 0 &&
      password.trim().length > 5 &&
      password.trim() === confirmPassword.trim()
    );
***REMOVED***;

  const onSubmit = async () => ***REMOVED***
    if (!isValid()) ***REMOVED***
      return;
***REMOVED***

    try ***REMOVED***
      const res = await axios.post<SignupResponse>(
        `$***REMOVED***endpoint***REMOVED***/v2/account/signup`,
        ***REMOVED***
          email: email.trim(),
          username: username.trim(),
          password: password.trim(),
          confirmpassword: confirmPassword.trim(),
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
        if (data.success) ***REMOVED***
          router.push("/login");
          setToast(***REMOVED***
            type: "success",
            text: t("register:success"),
            delay: 10000,
      ***REMOVED***);
          return;
    ***REMOVED***

        setToast(***REMOVED***
          type: "error",
          text: data.error.message,
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
      <MetaHead title=***REMOVED***`$***REMOVED***t("register:title")***REMOVED*** | The Unus Annus Archive`***REMOVED*** />
      <Typography className="text-center my-2" variant="h5" component="h1">
        ***REMOVED***t("register:titleLong")***REMOVED***
      </Typography>
      <form id="register-form">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <TextField
            className=***REMOVED***classNames("my-3", styles.field)***REMOVED***
            id="email-archive"
            name="email-archive"
            label=***REMOVED***t("register:email")***REMOVED***
            variant="standard"
            value=***REMOVED***email***REMOVED***
            type="email"
            onChange=***REMOVED***(e) => setEmail(e.target.value)***REMOVED***
          />
          <TextField
            className=***REMOVED***classNames("my-3", styles.field)***REMOVED***
            id="username-archive"
            name="username-archive"
            label=***REMOVED***t("register:username")***REMOVED***
            variant="standard"
            value=***REMOVED***username***REMOVED***
            type="text"
            onChange=***REMOVED***(e) => setUsername(e.target.value)***REMOVED***
          />
          <FormControl
            variant="standard"
            className=***REMOVED***classNames("my-3", styles.field)***REMOVED***
          >
            <InputLabel htmlFor="standard-adornment-password">
              ***REMOVED***t("register:password")***REMOVED***
            </InputLabel>
            <Input
              id="password-archive"
              name="password-archive"
              type=***REMOVED***showPassword ? "text" : "password"***REMOVED***
              value=***REMOVED***password***REMOVED***
              autoComplete="new-password"
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
          <FormControl
            variant="standard"
            className=***REMOVED***classNames("my-3", styles.field)***REMOVED***
          >
            <InputLabel htmlFor="standard-adornment-password">
              ***REMOVED***t("register:confirmPassword")***REMOVED***
            </InputLabel>
            <Input
              id="confirm-password-archive"
              name="confirm-password-archive"
              type=***REMOVED***showPassword ? "text" : "password"***REMOVED***
              value=***REMOVED***confirmPassword***REMOVED***
              autoComplete="new-password"
              onChange=***REMOVED***(event) =>
                setConfirmPassword(event.currentTarget.value)
          ***REMOVED***
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
              ***REMOVED***t("register:registerBtn")***REMOVED***
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
***REMOVED***;

export default LoginPage;
