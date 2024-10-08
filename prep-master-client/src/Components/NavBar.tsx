
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';
import Separator from "../Components/Separator"
import Button from "../Components/Button"


export default function NavBar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const signOut = () => {
        window.location.href = 'http://localhost:3000/login';
        localStorage.clear()
    }


    return (
        <div id='navigation' className='z-20 h-[5rem] bg-neutral-200 flex justify-between items-center px-6'>
            <a href="/home">
                <div className='text-[38px] font-bold text-primary'>Prep Master</div>
            </a>
            {
                localStorage.getItem("prep-token") && (
                    <div
                        className="flex flex-row items-center cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        <div className="bg-[url('https://github.com/shadcn.png')] h-[44px] w-[44px] rounded-full bg-cover bg-center mr-2"></div>
                        <div className='flex flex-col'>
                            <div className='text-[14px] font-semibold leading-none mb-1'>{localStorage.getItem("username")}</div>
                            <div className='text-[12px] font-medium text-black/[.60] leading-none'>{localStorage.getItem("role")}</div>
                        </div>
                    </div>
                )
            }
            {
                !localStorage.getItem("prep-token") && (
                    <Button className='w-[100px]'>
                        <a href="/login">
                            Login
                        </a>
                    </Button>
                )
            }
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute mt-2 top-16 right-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg"
                    >
                        <div className="p-4">
                            <div className="text-lg font-semibold">Account</div>
                            <Separator />
                            <button className="mt-2 w-full text-left text-[15px] ">Profile</button>
                            <button onClick={signOut} className="mt-2 w-full text-left text-red-500 text-[15px]">Sign Out</button>
                            {/* Add more profile options here */}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
