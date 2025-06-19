interface BadgeFieldChatProps {
  type: "left" | "right";
}

const BadgeFieldChat = ({ type }: BadgeFieldChatProps) => {
  return (
    <>
      {type === "left" ? (
        <span className="absolute top-0 -left-2.5 h-0 w-0 border-t-[10px] border-r-[10px] border-b-[10px] border-t-transparent border-r-[#1D1F1F] border-b-transparent"></span>
      ) : (
        <span className="absolute top-0 -right-2.5 h-0 w-0 border-t-[10px] border-b-[10px] border-l-[10px] border-t-transparent border-b-transparent border-l-[#144D37]"></span>
      )}
    </>
  );
};

export default BadgeFieldChat;
