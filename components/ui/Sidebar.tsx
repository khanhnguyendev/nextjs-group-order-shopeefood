import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="scrollbar top-20 h-[calc(100svh-80px)] max-h-[calc(100svh-80px)] w-[200px] overflow-y-auto border-r-4 border-black m800:w-[180px] m600:hidden">
      {/* <div className="sidebaritem block border-b-4 border-r-4 border-black p-4 text-xl font-bold m800:p-4 m800:text-base">
        Getting started
      </div> */}
      <Link
        href={`/dashboard`}
        className="sidebaritem block border-b-4 border-r-4 border-black p-4 pl-7 text-lg font-semibold text-black/90 hover:bg-[#bc95d4] m800:p-4 m800:pl-6 m800:text-base"
      >
        Dashboard
      </Link>
    </aside>
  );
}
