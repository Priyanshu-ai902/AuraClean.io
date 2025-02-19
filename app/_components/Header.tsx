import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import React from 'react';

const Header = () => {
    return (
        <header className="bg-black">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:flex items-center space-x-1 p-4  shadow-md">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/016/012/682/non_2x/eraser-creative-icon-design-free-vector.jpg"
                            alt="logo"
                            width={30}
                            height={30}
                            className="rounded-full"
                        />
                        <h1 className="text-xl font-semibold">
                            <span className="text-teal-600">Pix</span>
                            <span className="text-gray-400">Erase</span>
                        </h1>
                    </nav>


                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <LoginLink>
                                <span className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700">
                                    Login
                                </span>
                            </LoginLink>

                            <RegisterLink>
                                <span className="hidden rounded-md bg-gray-800 px-5 py-2.5 text-sm text-teal-600 transition hover:text-teal-600/75 sm:block font-bold">
                                    Register
                                </span>
                            </RegisterLink>
                        </div>

                        <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                            <span className="sr-only">Toggle menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;