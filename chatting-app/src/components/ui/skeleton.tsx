interface SkeletonProps {
  type: "lots" | "one";
}

export const Skeleton = ({ type }: SkeletonProps) => {
  return (
    <>
      {type === "lots" ? (
        <>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index: number) => (
            <div
              key={index}
              className="flex animate-pulse items-center gap-3 py-1.5"
            >
              <div className={"h-12 w-12 rounded-full bg-[#242626]"} />
              <div className="space-y-2">
                <div className="h-4 w-[280px] rounded-full bg-[#242626]" />
                <div className="h-4 w-[230px] rounded-full bg-[#242626]" />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex animate-pulse items-center gap-2">
          <div className={"h-12 w-12 rounded-full bg-[#242626]"} />
          <div className="space-y-2">
            <div className="h-4 w-[280px] rounded-full bg-[#242626]" />
            <div className="h-4 w-[230px] rounded-full bg-[#242626]" />
          </div>
        </div>
      )}
    </>
  );
};

export const SearchSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((index: number) => (
        <div key={index} className="flex animate-pulse items-center gap-2">
          <div className="h-3 w-[280px] rounded-full bg-[#A5A5A5]" />
        </div>
      ))}
    </div>
  );
};
