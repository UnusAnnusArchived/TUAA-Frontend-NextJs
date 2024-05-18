import { SkipNext } from "@mui/icons-material";
import { ToggleButton, Tooltip } from "@vidstack/react";

const NextEpisode: React.FC = () => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <ToggleButton className="vds-button">
          <SkipNext className="vds-icon" />
        </ToggleButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement="top center">
        Next Episode
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

export default NextEpisode;
