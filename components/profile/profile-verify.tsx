import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";
import pb from "../../src/pocketbase";

const VerifyProfile: React.FC = () => {
  const [loggedInUser] = useRecoilState(userAtom);
  const [sent, setSent] = useState(false);

  const handleClick = () => {
    pb.users.requestVerification(loggedInUser?.email);
    setSent(true);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h6" component="h2" className="my-2">
        Verify Profile
      </Typography>
      <Button variant="contained" onClick={handleClick} disabled={sent}>
        {sent ? "Sent" : "Resend Verification Email"}
      </Button>
    </div>
  );
};

export default VerifyProfile;
