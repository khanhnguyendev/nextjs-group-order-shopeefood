import React from "react";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col gap-4 w-96 h-[596px]">
      <div className="skeleton h-[384px] w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
};

export default SkeletonCard;
