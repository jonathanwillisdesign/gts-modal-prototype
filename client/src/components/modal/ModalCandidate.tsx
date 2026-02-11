import {
  useState,
  useCallback,
  useRef,
  createContext,
  useContext,
  useId,
  useEffect,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Icon } from "gts-central-library";
import {
  useBodyScrollLock,
  useEscapeKey,
  useClickOutside,
  useRestoreFocus,
  useFocusTrap,
} from "./hooks";

type ModalSize = "sm" | "lg";
type ModalTone = "default" | "inverse" | "danger";

interface ModalContextValue {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  titleId: string;
  descriptionId: string;
  size: ModalSize;
  tone: ModalTone;
  closeOnEsc: boolean;
  closeOnOutsideClick: boolean;
  stickyFooter: boolean;
  saveFocus: () => void;
  restoreFocus: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("ModalCandidate subcomponents must be used within ModalCandidate");
  return ctx;
}

interface ModalCandidateProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  defaultOpen?: boolean;
  size?: ModalSize;
  tone?: ModalTone;
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
  stickyFooter?: boolean;
}

function ModalCandidateRoot({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  defaultOpen = false,
  size = "sm",
  tone = "default",
  closeOnEsc = true,
  closeOnOutsideClick = true,
  stickyFooter = true,
}: ModalCandidateProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const { saveFocus, restoreFocus } = useRestoreFocus();

  const onOpenChange = useCallback(
    (v: boolean) => {
      if (!isControlled) setInternalOpen(v);
      controlledOnOpenChange?.(v);
    },
    [isControlled, controlledOnOpenChange]
  );

  const uid = useId();
  const titleId = `modal-title-${uid}`;
  const descriptionId = `modal-desc-${uid}`;

  return (
    <ModalContext.Provider
      value={{
        open,
        onOpenChange,
        titleId,
        descriptionId,
        size,
        tone,
        closeOnEsc,
        closeOnOutsideClick,
        stickyFooter,
        saveFocus,
        restoreFocus,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

interface TriggerProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

function Trigger({ children, className }: TriggerProps) {
  const { onOpenChange, saveFocus } = useModalContext();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        saveFocus();
        onOpenChange(true);
      }}
      data-testid="button-modal-trigger"
    >
      {children}
    </button>
  );
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-[560px] max-sm:max-w-none",
  lg: "max-w-[680px] max-sm:max-w-none",
};

const toneClasses: Record<ModalTone, { container: string; overlay: string }> = {
  default: {
    container: "bg-white border-black text-black",
    overlay: "bg-black/50",
  },
  inverse: {
    container: "bg-black border-white text-white",
    overlay: "bg-black/70",
  },
  danger: {
    container: "bg-white border-[#e32b2b] text-black",
    overlay: "bg-black/50",
  },
};

interface ContentProps {
  children: ReactNode;
  className?: string;
}

function Content({ children, className }: ContentProps) {
  const {
    open,
    onOpenChange,
    titleId,
    descriptionId,
    size,
    tone,
    closeOnEsc,
    closeOnOutsideClick,
    restoreFocus,
  } = useModalContext();

  const contentRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    onOpenChange(false);
    restoreFocus();
  }, [onOpenChange, restoreFocus]);

  useBodyScrollLock(open);
  useEscapeKey(close, open && closeOnEsc);
  useClickOutside(contentRef, close, open && closeOnOutsideClick);
  useFocusTrap(contentRef, open);

  useEffect(() => {
    if (!open) {
      restoreFocus();
    }
  }, [open, restoreFocus]);

  if (!open) return null;

  const toneStyle = toneClasses[tone];

  return createPortal(
    <div
      className={cn("fixed inset-0 z-50 flex items-center justify-center p-4 max-sm:items-end max-sm:p-0", toneStyle.overlay)}
      data-testid="modal-overlay"
    >
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(
          "flex flex-col w-full border border-solid relative max-h-[90vh] max-sm:max-h-[95vh] max-sm:border-x-0 max-sm:border-b-0",
          sizeClasses[size],
          toneStyle.container,
          className
        )}
        data-testid="modal-content"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

interface HeaderProps {
  children?: ReactNode;
  title: string;
  description?: string;
  className?: string;
  showClose?: boolean;
}

function Header({
  children,
  title,
  description,
  className,
  showClose = true,
}: HeaderProps) {
  const { titleId, descriptionId, tone } = useModalContext();

  return (
    <div
      className={cn("flex flex-col items-start pt-7 px-7 shrink-0", className)}
      data-testid="modal-header"
    >
      <div className="flex flex-col gap-2 items-start w-full">
        <div className="flex gap-2.5 items-start w-full">
          <h2
            id={titleId}
            className={cn(
              "flex-1 font-bold text-[30px] leading-[32px] tracking-[0.8px]",
              "[font-family:'AdineuePRO','Helvetica_Neue',Helvetica,sans-serif]"
            )}
            data-testid="text-modal-title"
          >
            {title}
          </h2>
          {showClose && <Close />}
        </div>
        {description && (
          <p
            id={descriptionId}
            className={cn(
              "text-base leading-[22px] w-full",
              "[font-family:'AdihausDIN',Helvetica,sans-serif]",
              tone === "default" && "text-black",
              tone === "inverse" && "text-white",
              tone === "danger" && "text-black"
            )}
            data-testid="text-modal-description"
          >
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

interface BodyProps {
  children: ReactNode;
  className?: string;
}

function Body({ children, className }: BodyProps) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto", className)}
      data-testid="modal-body"
    >
      {children}
    </div>
  );
}

interface FooterProps {
  children: ReactNode;
  className?: string;
}

function Footer({ children, className }: FooterProps) {
  const { stickyFooter } = useModalContext();

  return (
    <div
      className={cn(
        "flex items-center justify-between px-7 pb-7 pt-4 gap-4 shrink-0",
        stickyFooter && "sticky bottom-0 bg-inherit",
        className
      )}
      data-testid="modal-footer"
    >
      {children}
    </div>
  );
}

function Close({ className }: { className?: string }) {
  const { onOpenChange, restoreFocus, tone } = useModalContext();

  return (
    <button
      type="button"
      onClick={() => {
        onOpenChange(false);
        restoreFocus();
      }}
      className={cn(
        "flex items-center justify-center p-2.5 shrink-0",
        tone === "inverse" ? "text-white" : "text-black",
        className
      )}
      aria-label="Close dialog"
      data-testid="button-modal-close"
    >
      <Icon name="x" size="medium" />
    </button>
  );
}

export const ModalCandidate = Object.assign(ModalCandidateRoot, {
  Trigger,
  Content,
  Header,
  Body,
  Footer,
  Close,
});

export type { ModalSize, ModalTone, ModalCandidateProps };
