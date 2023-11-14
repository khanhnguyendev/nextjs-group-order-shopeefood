import { auth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { TbNewSection } from "react-icons/tb";

function Navbar() {
  const { userId } = auth();

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Dashboard</Link>
            </li>
            <li>
              <Link href="/room">Room</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href={"/"} className="btn btn-ghost text-xl">
          Group Order ShopeeFood
        </Link>
      </div>
      <div className="navbar-end">
        {!userId ? (
          <>
            <button className="btn btn-ghost">
              <Link href="/auth/login">Login</Link>
            </button>

            <button className="btn btn-ghost">
              <Link href="/auth/registration">Register</Link>
            </button>
          </>
        ) : (
          <>
            <button className="btn">
              <TbNewSection className="ml-3 h-6 min-h-[24px] w-2 min-w-[24px]" />
              <Link href="/create">Create</Link>
            </button>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
            {userId && <UserButton afterSignOutUrl="/" />}
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
