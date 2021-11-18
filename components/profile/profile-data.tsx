import Typography from "@mui/material/Typography";
import React from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";

const ProfileData: React.FC = () => {
  const [loggedInUser] = useRecoilState(userAtom);

  const { user } = loggedInUser;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h6" component="h2" className="my-2">
        Data held about your profile
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>Username:</strong> {user.username}
      </Typography>
      <Typography variant="body1" component="p" className="my-1">
        <strong>Email:</strong> {user.email}
      </Typography>
    </div>
  );
};

export default ProfileData;
