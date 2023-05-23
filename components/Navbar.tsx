import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className=" py-6 px-12 flex justify-between">
      <h1 className="text-2xl text-white font-bold">
        <Link href="/">Books</Link>{" "}
      </h1>
      <button
        type="button"
        className="text-[16px] bg-blue-500 px-6 rounded-2xl py-1"
      >
        Login
      </button>
    </nav>
  );
};

export default Navbar;
