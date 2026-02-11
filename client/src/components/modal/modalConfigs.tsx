import type { ReactNode } from "react";
import type { ModalSize, ModalTone } from "./ModalCandidate";
import { Input } from "@/components/ui/input";

export interface ModalFooterButton {
  label: string;
  variant: "primary" | "secondary" | "cancel" | "destructive";
  onClick?: () => void;
}

export interface ModalConfig {
  id: string;
  label: string;
  defaultSize: ModalSize;
  defaultTone: ModalTone;
  title: string;
  description?: string;
  bodyRenderer: () => ReactNode;
  footerButtons: ModalFooterButton[];
}

function FolderIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#767677" strokeWidth="1.5">
      <path d="M7.5 5l5 5-5 5" />
    </svg>
  );
}

const moveFolders = [
  "Archive",
  "Belfast Raiders",
  "Cardiff Wolves",
  "Glasgow Clan",
  "Edinburgh Eclipse",
  "Folder with sub folders",
];

export const modalConfigs: ModalConfig[] = [
  {
    id: "delete-items",
    label: "Delete Items",
    defaultSize: "sm",
    defaultTone: "default",
    title: "Delete 2 items?",
    description: "Are you sure you want to delete 2 items from your designs?",
    bodyRenderer: () => null,
    footerButtons: [
      { label: "CANCEL", variant: "cancel" },
      { label: "YES, DELETE", variant: "destructive" },
    ],
  },
  {
    id: "share-designs",
    label: "Share Designs",
    defaultSize: "sm",
    defaultTone: "default",
    title: "Share design(s)",
    description: "Type the email to which you want to share this design or designs:",
    bodyRenderer: () => (
      <div className="px-7 py-5 [font-family:'AdihausDIN',Helvetica,sans-serif]">
        <Input
          type="email"
          placeholder="Email *"
          className="rounded-none border-[#ccc] focus:border-black h-[54px] text-base"
          data-testid="input-share-email"
          data-autofocus
        />
      </div>
    ),
    footerButtons: [
      { label: "CANCEL", variant: "cancel" },
      { label: "SHARE DESIGN(S)", variant: "primary" },
    ],
  },
  {
    id: "move-item",
    label: "Move Item",
    defaultSize: "sm",
    defaultTone: "default",
    title: "Move Item",
    description: undefined,
    bodyRenderer: () => (
      <div className="[font-family:'AdihausDIN',Helvetica,sans-serif]">
        <div className="bg-[#f5f5f5] px-7 py-3 flex items-center gap-2.5">
          <span className="text-[16px] leading-[24px] text-[#767677] [font-family:'AdihausDIN',sans-serif]">
            Level 1
          </span>
          <span className="text-[14px] leading-[20px] text-[#767677] uppercase tracking-[2px] [font-family:'AdihausDIN',sans-serif]">
            /
          </span>
          <span className="text-[16px] leading-[24px] text-black font-medium [font-family:'AdihausDIN',sans-serif]">
            Level 2
          </span>
        </div>
        <div className="flex flex-col">
          {moveFolders.map((folder, i) => (
            <button
              key={folder}
              type="button"
              className="flex items-center gap-4 px-7 py-5 border-b border-[#eee] w-full text-left hover:bg-[#f9f9f9] transition-colors"
              data-testid={`button-folder-${i}`}
            >
              <FolderIcon />
              <span className="flex-1 text-[16px] leading-[22px]">{folder}</span>
              <ChevronRight />
            </button>
          ))}
        </div>
      </div>
    ),
    footerButtons: [
      { label: "CANCEL", variant: "cancel" },
      { label: "MOVE", variant: "primary" },
    ],
  },
  {
    id: "new-folder",
    label: "New Folder",
    defaultSize: "sm",
    defaultTone: "default",
    title: "New folder",
    description: undefined,
    bodyRenderer: () => (
      <div className="px-7 py-5 [font-family:'AdihausDIN',Helvetica,sans-serif]">
        <Input
          type="text"
          placeholder="Folder name *"
          className="rounded-none border-[#ccc] focus:border-black h-[54px] text-base"
          data-testid="input-folder-name"
          data-autofocus
        />
      </div>
    ),
    footerButtons: [
      { label: "CANCEL", variant: "cancel" },
      { label: "CREATE FOLDER", variant: "primary" },
    ],
  },
  {
    id: "rename-folder",
    label: "Rename Folder",
    defaultSize: "sm",
    defaultTone: "default",
    title: "Rename folder",
    description: undefined,
    bodyRenderer: () => (
      <div className="px-7 py-5 [font-family:'AdihausDIN',Helvetica,sans-serif]">
        <Input
          type="text"
          defaultValue="My Folder"
          placeholder="Folder name *"
          className="rounded-none border-[#ccc] focus:border-black h-[54px] text-base"
          data-testid="input-rename-folder"
          data-autofocus
        />
      </div>
    ),
    footerButtons: [
      { label: "CANCEL", variant: "cancel" },
      { label: "CHANGE NAME", variant: "primary" },
    ],
  },
  {
    id: "select-date",
    label: "Select Date",
    defaultSize: "sm",
    defaultTone: "default",
    title: "Select Date",
    description: undefined,
    bodyRenderer: () => {
      const days = ["M", "T", "W", "T", "F", "S", "S"];
      const weeks = [
        [null, null, null, null, null, 1, 2],
        [3, 4, 5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14, 15, 16],
        [17, 18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, null, null],
      ];
      return (
        <div className="px-7 py-5 [font-family:'AdihausDIN',Helvetica,sans-serif]">
          <div className="flex items-center justify-between gap-4 mb-4">
            <button type="button" className="p-2 border border-black" data-testid="button-prev-month">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <span className="font-bold text-base uppercase tracking-wider">February 2026</span>
            <button type="button" className="p-2 border border-black" data-testid="button-next-month">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-0 text-center">
            {days.map((d, i) => (
              <div key={`day-${i}`} className="text-xs font-bold uppercase py-2 text-gray-500">
                {d}
              </div>
            ))}
            {weeks.flat().map((day, i) => (
              <button
                key={`cell-${i}`}
                type="button"
                disabled={day === null}
                className={`py-2 text-sm ${
                  day === null
                    ? "invisible"
                    : day === 11
                    ? "bg-black text-white font-bold"
                    : "hover:bg-gray-100"
                }`}
                data-testid={day ? `button-day-${day}` : undefined}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      );
    },
    footerButtons: [
      { label: "HOLD INVENTORY", variant: "secondary" },
      { label: "CONFIRM", variant: "primary" },
    ],
  },
  {
    id: "download-barcode",
    label: "Download Unique Barcode Data",
    defaultSize: "lg",
    defaultTone: "default",
    title: "Download unique barcode data",
    description:
      "Select your file format to download unique barcode data for your order.",
    bodyRenderer: () => (
      <div className="px-7 py-5 space-y-5 [font-family:'AdihausDIN',Helvetica,sans-serif]">
        <div className="space-y-1">
          <p className="font-bold text-lg [font-family:'AdineuePRO',Helvetica,sans-serif]">
            Step 1
          </p>
          <p className="text-base leading-[22px]">
            Download and add product data or your inventory system (below)
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-lg [font-family:'AdineuePRO',Helvetica,sans-serif]">
            Step 2
          </p>
          <p className="text-base leading-[22px]">
            Select "Unique Barcodes" at checkout
          </p>
        </div>
        <div className="bg-[#f7f7f7] p-10 space-y-5">
          <p className="font-bold text-lg uppercase">Packaging</p>
          <div className="border border-[#eee] bg-white px-5 py-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-sm shrink-0" />
              <div>
                <p className="font-bold text-base leading-[24px]">Standard barcodes</p>
                <p className="text-base leading-[24px] text-gray-600">When scanned, shows article number</p>
              </div>
            </div>
            <div className="w-5 h-5 border-2 border-black rounded-full shrink-0" />
          </div>
          <div className="border border-black bg-white px-5 py-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-[50px] h-[50px] bg-gray-200 rounded-sm shrink-0" />
              <div>
                <p className="font-bold text-base leading-[24px]">Unique barcodes</p>
                <p className="text-base leading-[24px] text-gray-600">When scanned, shows design and size details</p>
              </div>
            </div>
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center shrink-0">
              <div className="w-2.5 h-2.5 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    ),
    footerButtons: [
      { label: "SECONDARY", variant: "secondary" },
      { label: "CANCEL", variant: "cancel" },
      { label: "COMPLETE", variant: "primary" },
    ],
  },
  {
    id: "simplify-receiving",
    label: "Simplify Receiving with Unique Barcodes",
    defaultSize: "lg",
    defaultTone: "default",
    title: "Simplify receiving with unique barcodes",
    description:
      "Use unique barcodes on your next orders to streamline your receiving process.",
    bodyRenderer: () => (
      <div className="px-7 py-5 space-y-5 [font-family:'AdihausDIN',Helvetica,sans-serif]">
        <div className="space-y-1">
          <p className="font-bold text-lg [font-family:'AdineuePRO',Helvetica,sans-serif]">
            Step 1
          </p>
          <p className="text-base leading-[22px]">
            Select "Unique Barcodes" during checkout
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-lg [font-family:'AdineuePRO',Helvetica,sans-serif]">
            Step 2
          </p>
          <p className="text-base leading-[22px]">
            Receive your shipment and scan each item for instant identification
          </p>
        </div>
        <div className="bg-[#f7f7f7] p-8 flex items-center justify-center h-[200px]">
          <p className="text-gray-400 text-sm">[ Illustration placeholder ]</p>
        </div>
      </div>
    ),
    footerButtons: [
      { label: "CLOSE", variant: "cancel" },
    ],
  },
];
