"use client"
import Image from 'next/image';
import { useState } from 'react';
import Link from "next/link";
import {AiOutlineClose} from 'react-icons/ai';
import {RxHamburgerMenu} from 'react-icons/rx';
import { SlSocialTwitter, SlSocialSpotify, SlSocialInstagram } from 'react-icons/sl';
import {TfiApple} from 'react-icons/tfi';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    
  const mobileNavbar = (
     <nav className="bg-black w-screen flex justify-between p-4 fixed ">
        {/* Mobile Navbar content */}
        <div className="md:hidden w-full">
            {/* Hamburger menu */}
            <div className="flex w-full">
                <button
                    className=" text-white rounded-md outline-none"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? (
                    <AiOutlineClose width={30} height={30} />
                    ) : (
                    <RxHamburgerMenu width={30} height={30} />
                    )}
                </button>
                {/* Logo */}
                <div className="flex-grow flex justify-center items-center">
                    <Image src="/images/_Teller_-_W.png" width={200} height={100} alt="Teller" />
                </div>
            </div>

            {/* Mobile menu content */}
            {isMenuOpen && (
            <div className="absolute left-0 right-0 top-full text-center bg-black">
                <ul className="flex flex-col space-y-4 px-4 py-2">
                <li>
                    <Link href="#home" className="text-white hover:text-gray-300">
                    Home
                    </Link>
                </li>
                <li>
                    <Link href="#about" className="text-white hover:text-gray-300">
                    About me
                    </Link>
                </li>
                <li>
                    <Link href="#music" className="text-white hover:text-gray-300">
                    Music
                    </Link>
                </li>
                </ul>

                {/* Social icons */}
                <ul className="flex space-x-4 py-2 px-4 w-50 items-center justify-center gap-4 mt-4">
                <li>
                    <Link
                    href="https://www.instagram.com/teller.jm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300"
                    >
                    <SlSocialInstagram />
                    </Link>
                </li>
                <li>
                    <Link
                    href="https://twitter.com/tellerjm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300"
                    >
                    <SlSocialTwitter />
                    </Link>
                </li>
                <li>
                    <Link
                    href="https://music.apple.com/pt/artist/teller/1442677107"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300"
                    >
                    <TfiApple />
                    </Link>
                </li>
                <li>
                    <Link
                    href="https://open.spotify.com/artist/3Hdsk1E0X4oe9nHDYJqQYY?si=BehiQIJhST6iRDAwJ9iAqA&nd=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300"
                    >
                    <SlSocialSpotify />
                    </Link>
                </li>
                </ul>
            </div>
            )}
      </div>
    </nav>
  );

  const desktopNavbar = (
    <nav className="bg-black flex justify-between p-4">
      {/* Desktop Navbar content */}
      <div className="flex items-center">
        <ul className="flex space-x-4">
          <li>
            <Link href="#home" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="#about" className="text-white hover:text-gray-300">
              About me
            </Link>
          </li>
          <li>
            <Link href="#music" className="text-white hover:text-gray-300">
              Music
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex justify-center flex-grow">
        <Image src="/images/_Teller_-_W.png" width={200} height={100} alt="Teller" />
      </div>

      <div className="flex items-center">
        <ul className="flex space-x-4">
          <li>
            <Link
              href="https://www.instagram.com/teller.jm/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300"
            >
              <SlSocialInstagram />
            </Link>
          </li>
          <li>
            <Link
              href="https://twitter.com/tellerjm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300"
            >
              <SlSocialTwitter />
            </Link>
          </li>
          <li>
            <Link
              href="https://music.apple.com/pt/artist/teller/1442677107"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300"
            >
              <TfiApple />
            </Link>
          </li>
          <li>
            <Link
              href="https://open.spotify.com/artist/3Hdsk1E0X4oe9nHDYJqQYY?si=BehiQIJhST6iRDAwJ9iAqA&nd=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300"
            >
              <SlSocialSpotify />
            </Link>
          </li>
        </ul>
      </div>
    </nav>

  );

  return (
    <>
      <div className="md:hidden">{mobileNavbar}</div>
      <div className="hidden md:block lg:block xl:block">{desktopNavbar}</div>
    </>
  );

   
}


export default Navbar;
