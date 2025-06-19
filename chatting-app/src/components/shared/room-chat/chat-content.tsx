import BadgeFieldChat from "../../ui/badge-field-chat";
import OptionMessageSetting from "../option-message-setting";

interface ChatContentProps {
  sender?: React.ReactNode;
  message: string;
  sent: string;
  typeSide: "left" | "right";
}

const ChatContent = ({ sender, message, sent, typeSide }: ChatContentProps) => {
  return (
    <div className="px-4">
      <div className="my-1 flex flex-1 flex-col">
        {typeSide === "left" ? (
          <div className="group relative ml-4 flex items-start justify-start gap-2">
            <div className="relative max-w-[55%] items-end gap-2 rounded-tl-[2px] rounded-r-md rounded-b-md bg-[#1D1F1F] px-4 py-2 text-[#FAFAFA]">
              <div className="flex flex-col">
                <p className="text-sm text-[16px] text-teal-500">{sender}</p>
                <p className="mr-8 text-sm">{message}</p>
              </div>
              <div className="absolute right-2 bottom-2 text-end text-[11px] text-[#A5A5A5]">
                {sent}
              </div>

              <BadgeFieldChat type="left" />
            </div>

            <OptionMessageSetting />
          </div>
        ) : (
          <div className="group relative mr-4 flex items-start justify-end gap-2">
            <OptionMessageSetting />

            <div className="relative max-w-[55%] rounded-l-md rounded-tr-[2px] rounded-b-md bg-[#144D37] px-2 py-1 text-sm text-white">
              <div className="flex flex-col">
                <p className="mr-8 text-sm">{message}</p>
              </div>
              <div className="absolute right-2 bottom-1 text-end text-[11px] text-[#A5A5A5]">
                {sent}
              </div>

              <BadgeFieldChat type="right" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContent;
