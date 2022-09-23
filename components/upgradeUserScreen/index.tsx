import pb from "../../src/pocketbase";
import styles from "./styles.module.scss";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { siteRoot } from "../../src/endpoints";
import { Button, TextField } from "@mui/material";
import { Record } from "pocketbase";

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
      console.log(`${siteRoot}${loggedInUser.user.pfp.filename}`);
      const pfp = await fetch(`${siteRoot}${loggedInUser.user.pfp.filename}`)
        .then((res) => res.blob())
        .catch(() => {
          console.error("Failed to fetch pfp. Most likely using default.");
        });
      console.log(pfp);
      form.append("avatar", pfp as Blob);
      form.append("name", loggedInUser.user.username);
      form.append("legacy_id", loggedInUser.user.id);

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
      let profile: Record;

      try {
        const records = await pb.records.getList("profiles", 1, 5, { filter: `legacy_id = '${loggedInUser.user.id}'` });
        profile = records.items[0];
      } catch (err) {
        console.error("Failed to fetch PocketBase user; most likely just doesn't exist yet.");
      }

      if (loggedInUser.isValid) {
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
            We are migrating our account system. To continue using your account, please re-enter your password, or set a
            new one. This will be the password you use to login in the future.
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
