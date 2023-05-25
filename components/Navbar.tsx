import Link from "next/link";
const Navbar = () => {
  return (
    <nav className=" py-6 px-12 flex justify-between">
      <Link href={"/"} className="text-2xl text-white font-bold">
        Books
      </Link>

      <Link
        href={"/login"}
        className="text-[16px] bg-blue-500 px-6 rounded-2xl py-1"
      >
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
