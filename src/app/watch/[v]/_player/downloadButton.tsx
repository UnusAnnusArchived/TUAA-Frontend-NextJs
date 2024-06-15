"use client";

import { Download } from "@mui/icons-material";
import { T } from "@tolgee/react";
import { ToggleButton, Tooltip } from "@vidstack/react";
import { useRouter } from "next/navigation";

interface IProps {
  url: string;
  uaid: string;
}

const DownloadButton: React.FC<IProps> = ({ url, uaid }) => {
  const router = useRouter();

  const handleDownload = () => {
    router.push(url + `&filename=${uaid}.mp4`);
  };

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <ToggleButton onClick={handleDownload} className="vds-button">
          <Download />
        </ToggleButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement="top center">
        <T keyName="vidstack.download" />
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

export default DownloadButton;
