import { useState, useCallback } from "react";
import { ModalCandidate } from "@/components/modal/ModalCandidate";
import type { ModalTone } from "@/components/modal/ModalCandidate";
import { modalConfigs } from "@/components/modal/modalConfigs";
import type { ModalFooterButton } from "@/components/modal/modalConfigs";
import { Button, LockerRoomLogo } from "gts-central-library";

function FooterButtonRenderer({
  btn,
  tone,
  onClose,
  className,
}: {
  btn: ModalFooterButton;
  tone: ModalTone;
  onClose: () => void;
  className?: string;
}) {
  const variantMap: Record<
    ModalFooterButton["variant"],
    { gtsVariant: "primary" | "secondary" | "tertiary"; gtsMode: "base" | "destructive" | "inverted" }
  > = {
    primary: { gtsVariant: "primary", gtsMode: tone === "inverse" ? "inverted" : "base" },
    secondary: { gtsVariant: "secondary", gtsMode: tone === "inverse" ? "inverted" : "base" },
    cancel: { gtsVariant: "tertiary", gtsMode: "base" },
    destructive: { gtsVariant: "secondary", gtsMode: "destructive" },
  };

  const mapped = variantMap[btn.variant];

  return (
    <Button
      variant={mapped.gtsVariant}
      mode={mapped.gtsMode}
      label={btn.label}
      showArrow={false}
      className={className}
      onClick={() => {
        btn.onClick?.();
        onClose();
      }}
      data-testid={`button-footer-${btn.variant}`}
    />
  );
}

function ModalFooter({
  buttons,
  tone,
  onClose,
}: {
  buttons: ModalFooterButton[];
  tone: ModalTone;
  onClose: () => void;
}) {
  if (buttons.length === 0) return null;

  const secondary = buttons.find((b) => b.variant === "secondary" || b.variant === "destructive");
  const primary = buttons.find((b) => b.variant === "primary");
  const cancel = buttons.find((b) => b.variant === "cancel");

  return (
    <ModalCandidate.Footer className="max-sm:flex-col max-sm:items-stretch max-sm:gap-2">
      <div className="hidden max-sm:flex max-sm:flex-col max-sm:gap-2 max-sm:w-full">
        {secondary && (
          <FooterButtonRenderer
            btn={secondary}
            tone={tone}
            onClose={onClose}
            className="w-full"
          />
        )}
        {primary && (
          <FooterButtonRenderer
            btn={primary}
            tone={tone}
            onClose={onClose}
            className="w-full"
          />
        )}
        {cancel && (
          <div className="flex justify-center pt-2">
            <FooterButtonRenderer
              btn={cancel}
              tone={tone}
              onClose={onClose}
            />
          </div>
        )}
      </div>
      <div className="flex max-sm:hidden items-center justify-between gap-4 flex-wrap w-full">
        {buttons.length === 1 ? (
          <div className="flex-1" />
        ) : (
          <FooterButtonRenderer
            btn={buttons[0]}
            tone={tone}
            onClose={onClose}
          />
        )}
        <div className="flex items-center gap-4 flex-wrap">
          {buttons.slice(buttons.length === 1 ? 0 : 1).map((btn, i) => (
            <FooterButtonRenderer
              key={i}
              btn={btn}
              tone={tone}
              onClose={onClose}
            />
          ))}
        </div>
      </div>
    </ModalCandidate.Footer>
  );
}

export default function ModalPlayground() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeConfig = activeId ? modalConfigs.find((c) => c.id === activeId) : null;

  const handleClose = useCallback(() => setActiveId(null), []);

  return (
    <div className="min-h-screen bg-[#f5f5f5] [font-family:'AdihausDIN',Helvetica,sans-serif]">
      <header className="bg-black text-white px-6 py-4 flex items-center gap-4">
        <LockerRoomLogo variant="header" data-testid="img-locker-room-logo" />
        <div className="w-px h-6 bg-white/30" />
        <h1
          className="text-xl font-bold uppercase tracking-wider [font-family:'AdineuePRO',Helvetica,sans-serif]"
          data-testid="text-page-title"
        >
          Modal Prototype Playground
        </h1>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {modalConfigs.map((config) => (
            <button
              key={config.id}
              type="button"
              onClick={() => setActiveId(config.id)}
              className="bg-white border border-gray-200 px-5 py-6 text-left hover:border-black transition-colors"
              data-testid={`button-open-${config.id}`}
            >
              <span className="font-bold text-sm uppercase tracking-wider [font-family:'AdineuePRO',Helvetica,sans-serif]">
                {config.label}
              </span>
              <span className="block text-xs text-gray-500 mt-1">
                {config.defaultSize} / {config.defaultTone}
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeConfig && (
        <ModalCandidate
          open={true}
          onOpenChange={(v) => { if (!v) handleClose(); }}
          size={activeConfig.defaultSize}
          tone={activeConfig.defaultTone}
        >
          <ModalCandidate.Content>
            <ModalCandidate.Header
              title={activeConfig.title}
              description={activeConfig.description}
            />
            <ModalCandidate.Body>
              {activeConfig.bodyRenderer()}
            </ModalCandidate.Body>
            {activeConfig.footerButtons.length > 0 && (
              <ModalFooter
                buttons={activeConfig.footerButtons}
                tone={activeConfig.defaultTone}
                onClose={handleClose}
              />
            )}
          </ModalCandidate.Content>
        </ModalCandidate>
      )}
    </div>
  );
}
