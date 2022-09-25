import pb from "../../src/pocketbase";
import styles from "./styles.module.scss";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { siteRoot } from "../../src/endpoints";
import { Button, TextField } from "@mui/material";

const UpgradeUserScreen: React.FC = () => {
  const password = useRef<HTMLInputElement>(null);
  const confirmpassword = useRef<HTMLInputElement>(null);
  const [loggedInUser] = useRecoilState(userAtom);
  const [showPopup, setShowPopup] = useState(false);

  const createUser = async () => {
    if (password.current.value === "" || confirmpassword.current.value === "") {
      alert("Please fill out info!");
    } else if (password.current.value.length < 8 || confirmpassword.current.value.length < 8) {
      alert("Password needs to be at least 8 characters");
    } else {
      const user = await pb.users.create({
        email: loggedInUser.user.email,
        password: password.current!.value,
        passwordConfirm: confirmpassword.current!.value,
      });
      const form = new FormData();
      let pfp: Blob | void;
      if (loggedInUser.user.pfp.filename !== "/userdata/profilepics/default.jpg") {
        pfp = await fetch(`${siteRoot}${loggedInUser.user.pfp.filename}`)
          .then((res) => res.blob())
          .catch(() => {
            console.error("Failed to fetch pfp. Most likely using default.");
          });
      }
      if (pfp) {
        form.append("avatar", pfp as Blob);
      }
      form.append("name", loggedInUser.user.username);
      form.append("legacy_id", loggedInUser.user.id);
      form.append("emails_account", "true");
      form.append("emails_updates", "false");

      await pb.users.authViaEmail(loggedInUser.user.email, password.current!.value);

      await pb.records.update("profiles", user.profile.id, form);

      await pb.users.requestVerification(user.email);

      location.reload();
    }
  };

  const onKeyPress: KeyboardEventHandler<HTMLDivElement> = (evt) => {
    if (evt.key === "Enter") {
      createUser();
    }
  };

  const logout = async () => {
    const req = await fetch("/api/v2/account/logout", {
      method: "POST",
      body: JSON.stringify({ id: loggedInUser.user.id, loginKey: loggedInUser.loginKey }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (req.status === "success") {
      location.reload();
    }
  };

  useEffect(() => {
    (async () => {
      let profile;

      try {
        const records = await pb.records.getList("profiles", 1, 5, { filter: `legacy_id = '${loggedInUser.user.id}'` });
        profile = records.items[0];
      } catch (err) {
        console.error("Failed to fetch PocketBase user; most likely just doesn't exist yet.");
      }

      if (loggedInUser?.isValid) {
        if (profile?.id) {
          setShowPopup(false);
        } else {
          setShowPopup(true);
        }
      }
    })();
  });

  if (showPopup) {
    return (
      <div className={styles.container}>
        <div className={styles.popup}>
          <h1>Migrate Account</h1>
          <p>
            We are migrating our account system. To continue, please re-enter your password, or set a new one. We will
            be deleting unmigrated accounts and switching out logins to the new system on October 10th. If you choose to
            set a new password for the account, you will have to use your current one until October 10th.
          </p>
          <div className={styles.form} onKeyPress={onKeyPress}>
            <TextField label="Password" type="password" variant="standard" inputRef={password} />
            <TextField label="Confirm Password" type="password" variant="standard" inputRef={confirmpassword} />
            <Button className={styles.button} variant="contained" onClick={createUser}>
              Update
            </Button>
          </div>
          <div className={styles.flexGrow} />
          <span>Don&apos;t have time now?</span>
          <a href="#" onClick={logout}>
            Logout
          </a>
        </div>
      </div>
    );
  }

  return <></>;
};

export default UpgradeUserScreen;
