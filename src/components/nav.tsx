import Link from "next/link";

const Nav = () => {
  return (
    <div className="text-white w-[500px] flex items-center gap-[30px] ml-[40px] text-[16px] font-bold">
      <Link href={"/swap"}>Swap</Link>
      <Link href={"/explore"}>Explore</Link>
      <Link href={"/farm"}>Earn</Link>
      <Link href={"/portfolio/myportfolio"}>My Portfolio</Link>
    </div>
  );
};

export default Nav;
