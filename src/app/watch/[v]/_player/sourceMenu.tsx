import { IDirectSource, ISource } from "@/zodTypes";
import { Check, ChevronLeft, ChevronRight, Language } from "@mui/icons-material";
import { useTolgee } from "@tolgee/react";
import { Menu, RadioGroup } from "@vidstack/react";
import { ReactNode, useMemo, useState } from "react";

interface IProps {
  externalSources?: ISource[];
  srcId: string;
  switchSources: (sourceId: string) => void;
}

const SourceMenu: React.FC<IProps> = ({ externalSources, srcId, switchSources }) => {
  const [selectedSourceName, setSelectedSourceName] = useState("TUAA");
  const { t } = useTolgee();

  useMemo(() => {
    if (externalSources) {
      if (srcId === "tuaa") {
        setSelectedSourceName("TUAA");
      } else if (srcId === "youtube") {
        setSelectedSourceName("YouTube");
      } else {
        const source = externalSources?.find((source) => source.type === "direct" && source.id === srcId) as
          | IDirectSource
          | undefined;

        if (source) {
          setSelectedSourceName(source.name);
        } else {
          setSelectedSourceName(t("vidstack.custom.source.unknown"));
        }
      }
    }
  }, [srcId, externalSources]);

  return (
    <Menu.Root className="vds-accessibility-menu vds-menu">
      <SubmenuButton
        label={t("vidstack.custom.source")}
        hint={selectedSourceName}
        disabled={externalSources === undefined}
        icon={Language}
      />
      <Menu.Content className="vds-menu-items">
        <section className="vds-menu-section">
          <div className="vds-menu-section-body">
            <RadioGroup.Root className="vds-radio-group" value={srcId}>
              <div className="vds-menu-item" style={{ padding: 0 }}>
                <RadioGroup.Item
                  className="vds-radio"
                  value="tuaa"
                  onSelect={() => {
                    if (srcId === "youtube") {
                      if (confirm(t("vidstack.custom.source.youtubeBug"))) {
                        return window.location.reload();
                      } else {
                        return;
                      }
                    }
                    switchSources("tuaa");
                  }}
                  style={
                    srcId === "youtube"
                      ? {
                          opacity: 0.5,
                          cursor: "not-allowed",
                        }
                      : {}
                  }
                >
                  <Check className="vds-icon" />
                  <span className="vds-radio-label">TUAA</span>
                </RadioGroup.Item>
              </div>
              {externalSources?.map?.((source) => {
                let sourceId = "youtube";

                if (source.type === "direct") [(sourceId = source.id)];

                const handleSelect = () => {
                  if (srcId === "youtube") {
                    if (confirm(t("vidstack.custom.source.youtubeBug"))) {
                      return window.location.reload();
                    } else {
                      return;
                    }
                  }
                  switchSources(sourceId);
                };

                return (
                  <div className="vds-menu-item" key={sourceId} style={{ padding: 0 }}>
                    <RadioGroup.Item
                      className="vds-radio"
                      value={sourceId}
                      onSelect={handleSelect}
                      style={
                        srcId === "youtube"
                          ? {
                              opacity: 0.5,
                              cursor: "not-allowed",
                            }
                          : {}
                      }
                    >
                      <Check className="vds-icon" />
                      <span className="vds-radio-label">{source.type === "youtube" ? "YouTube" : source.name}</span>
                    </RadioGroup.Item>
                  </div>
                );
              }) ?? <></>}
            </RadioGroup.Root>
          </div>
        </section>
      </Menu.Content>
    </Menu.Root>
  );
};

export default SourceMenu;

export interface SubmenuButtonProps {
  label: string;
  hint: string;
  disabled?: boolean;
  icon: React.FC<any>;
}

function SubmenuButton({ label, hint, icon: Icon, disabled }: SubmenuButtonProps) {
  return (
    <Menu.Button className="vds-menu-item" disabled={disabled}>
      <ChevronLeft className="vds-menu-close-icon vds-icon" />
      <Icon className="vds-menu-item-icon vds-icon" />
      <span className="vds-menu-item-label">{label}</span>
      <span className="vds-menu-item-hint">{hint}</span>
      <ChevronRight className="vds-menu-open-icon vds-icon" />
    </Menu.Button>
  );
}
