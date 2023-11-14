import React from "react";

const Loading = () => {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 mt-[-50px] ml-[-50px]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    </>
  );
};

export default Loading;
