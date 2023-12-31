"use client";

import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";

type Props = {
  question: string;
  answer: string;
  largestContentHeight?: number;
};

export default function Accordion({
  question,
  answer,
  largestContentHeight: largestQuentionHeight,
}: Props) {
  const [showContent, setShowContent] = useState(false);
  const [contentHeight, setContentHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [showContent]);

  return (
    <div className="w-[500px] rounded-md border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <button
        role="button"
        aria-expanded={showContent}
        style={{
          borderBottom: showContent ? "solid 2px" : "0px",
          height: `${largestQuentionHeight}px`,
        }}
        className="flex w-full h-[50px] items-center justify-between rounded-[5px] border-black bg-[#ffffff] p-5 font-semibold text-sm"
        onClick={() => {
          setShowContent(!showContent);
        }}
      >
        <div className="flex-1">
          <p className="text-center">{question}</p>
        </div>
        <FiPlus
          style={{ transform: `rotate(${showContent ? "45deg" : "0"})` }}
          className="ml-4 min-h-[20px] min-w-[20px] transition-transform ease-in-out"
        />
      </button>
      <div
        ref={contentRef}
        style={{ height: showContent ? `${contentHeight}` : "0" }}
        className="overflow-hidden rounded-[5px] bg-white font-bold transition-[height] ease-in-out"
      >
        <p className="p-5">{answer}</p>
      </div>
    </div>
  );
}
