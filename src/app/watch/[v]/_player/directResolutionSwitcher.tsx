import { IDirectResolution } from "@/zodTypes";
import { T } from "@tolgee/react";
import { Slider } from "@vidstack/react";
import { FormEventHandler } from "react";

interface IProps {
  resolutions: IDirectResolution[];
  currentResolutionWidth: number;
  setResolutionWidth: React.Dispatch<React.SetStateAction<number>>;
}

const DirectResolutionSwitcher: React.FC<IProps> = ({ resolutions, currentResolutionWidth, setResolutionWidth }) => {
  const sortedResolutions = resolutions.sort((a, b) => {
    if (a.width > b.width) {
      return 1;
    } else if (a.width < b.width) {
      return -1;
    } else {
      return 0;
    }
  });

  const steps = 100 / (sortedResolutions.length - 1);

  const handleSliderChange = (detail: number) => {
    const index = Math.round(detail / steps);
    const resolution = sortedResolutions[index];
    setResolutionWidth(resolution.width);
  };

  return (
    <section className="vds-menu-section">
      <div className="vds-menu-section-title">
        <header>
          <T keyName="vidstack.quality" />
        </header>
        <div className="vds-menu-section-value">{Math.round(currentResolutionWidth / (16 / 9) / 2) * 2}p</div>
      </div>
      <div className="vds-menu-section-body">
        <div className="vds-menu-item vds-slider-menu-item">
          <Slider.Root
            className="vds-slider"
            step={steps}
            keyStep={steps}
            value={steps * sortedResolutions.findIndex((resolution) => resolution.width === currentResolutionWidth)}
            onDragValueChange={handleSliderChange}
          >
            <Slider.Track className="vds-slider-track" />
            <Slider.TrackFill className="vds-slider-track-fill vds-slider-track" />
            <Slider.Thumb className="vds-slider-thumb" />
            <Slider.Steps className="vds-slider-steps">
              {(step) => <div className="vds-slider-step" key={String(step)}></div>}
            </Slider.Steps>
          </Slider.Root>
        </div>
      </div>
    </section>
  );
};

export default DirectResolutionSwitcher;
