import { SkipPrevious } from "@mui/icons-material";
import { ToggleButton, Tooltip } from "@vidstack/react";

const PreviousEpisode: React.FC = () => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <ToggleButton className="vds-button">
          <SkipPrevious className="vds-icon" />
        </ToggleButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement="top start">
        Previous Episode
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

export default PreviousEpisode;
