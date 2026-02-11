import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Dialog = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <div className="flex flex-col max-w-[680px] w-full items-start bg-backgroundsgl-color-background border border-solid border-black">
        <div className="flex flex-col items-start gap-[30px] pt-8 pb-0 px-8 w-full">
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex items-start gap-2.5 w-full">
              <h2 className="flex-1 font-heading-large-bold font-[number:var(--heading-large-bold-font-weight)] text-black text-[length:var(--heading-large-bold-font-size)] tracking-[var(--heading-large-bold-letter-spacing)] leading-[var(--heading-large-bold-line-height)] [font-style:var(--heading-large-bold-font-style)]">
                Title
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="w-[34px] h-[34px] p-2.5"
              >
                <XIcon className="w-6 h-6" />
              </Button>
            </div>
            <p className="font-body-default-regular font-[number:var(--body-default-regular-font-weight)] text-black tracking-[var(--body-default-regular-letter-spacing)] text-[length:var(--body-default-regular-font-size)] leading-[var(--body-default-regular-line-height)] [font-style:var(--body-default-regular-font-style)]">
              Description
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-5 w-full">
          <div className="flex h-[280px] items-center justify-center gap-2.5 px-[7px] py-0 w-full bg-[#eddffe]">
            <div className="inline-flex h-28 items-center justify-center gap-2.5 p-2.5">
              <div className="flex items-center justify-center [font-family:'AdihausDIN-Bold',Helvetica] font-bold text-[#9747ff] text-xs tracking-[0] leading-[22px] whitespace-nowrap">
                Replace me with content
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-0 pb-8 px-8 w-full h-auto">
          <Button
            variant="outline"
            className="h-auto px-5 py-4 border border-solid border-black bg-transparent hover:bg-transparent"
          >
            <span className="[font-family:'AdihausDIN-Bold',Helvetica] font-bold text-textgl-color-text tracking-[0.32px] text-base leading-[22px]">
              SECONDARY
            </span>
          </Button>

          <div className="flex items-center justify-end gap-4 flex-1">
            <Button
              variant="ghost"
              className="h-auto px-5 py-4 hover:bg-transparent"
            >
              <span className="[font-family:'AdihausDIN-Bold',Helvetica] font-bold text-textgl-color-text-alternative tracking-[0.32px] text-base leading-[22px]">
                CANCEL
              </span>
            </Button>

            <Button className="h-auto px-5 py-4 bg-backgroundsgl-color-background-inverse hover:bg-backgroundsgl-color-background-inverse">
              <span className="[font-family:'AdihausDIN-Bold',Helvetica] font-bold text-textgl-color-text-inverse tracking-[0.32px] text-base leading-[22px]">
                PRIMARY
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
