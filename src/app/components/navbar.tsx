import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ShoppingCart, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="navbar-main pt-12 bg-none relative z-10">
      {/* Logo section */}
      <div className="logo">
        <Link href="/">
          <span className="flex items-center">
            <Image
              src={"/logo/bublLogo.png"}
              alt="Logo"
              width={100}
              height={100}
            />
          </span>
        </Link>
      </div>
      {/* Navbar routes */}
      <div className="flex w-[65%] justify-evenly">
        <Link href="/about" className=" navbar-links ">
          ABOUT US
        </Link>
        <Link href="/product" className=" navbar-links">
          PRODUCT
        </Link>
        <Link href="/science" className=" navbar-links">
          SCIENCE BEHIND
        </Link>
      </div>
      {/* Call to action buttons */}
      <div className="flex items-center space-x-10">
        <button>
          <ShoppingCart className="h-10 w-10" />
        </button>
        <button>
          <User className="h-10 w-10" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
