"use client"
import { Gem, Image as Img, LogOut, Menu, Search, Settings, Sparkle, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { auth } from '@/auth'
import { User } from '@prisma/client'
import { logoutAction } from '@/action/auth'
import Image from 'next/image'

const navItems = [
    { label: "Generate", icon: <Sparkle size={20} />, href: "/dashboard/gen", path: "gen" },
    { label: "My Images", icon: <Img size={20} />, href: "/dashboard/my-images", path: "my-images" },
    { label: "Explore", icon: <Search size={20} />, href: "/dashboard/explore", path: "explore" },
    { label: "Setting", icon: <Settings size={20} />, href: "/dashboard/settings", path: "settings" },
    { label: "Upgrade", icon: <Gem size={20} />, href: "/dashboard/upgrade", path: "upgrade" },
];

export default function Navbar({session}: {session: User | undefined}) {
    const [open, setOpen] = useState(false)
    // const [session, setSession] = useState<User | undefined>()

    return (
        <div className='md:hidden flex relative bg-gray-50'>
            <div onClick={() => setOpen(!open)} className='pt-4 pl-4'>
                {open ? <X /> : <Menu />}
            </div>
            <div className={`pt-4 absolute flex flex-col justify-between gap-4 top-12 left-0 px-4 z-50 bg-white h-[calc(100vh-4rem)] transition-all duration-200 ${open ? "translate-x-0" : "-translate-x-full"}`}>
                <div className='flex flex-col gap-4'>
                    {navItems.map((item) => (
                    <Link href={item.href} key={item.label}>
                        <Button variant={"ghost"} className="w-full flex items-center gap-2 justify-start" onClick={() => setOpen(false)}>
                            <span className="mr-3">{item.icon}</span>
                            {item.label}
                        </Button>
                    </Link>
                ))}
                </div>

                <form action={logoutAction} className="px-6 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <Image src={session?.image || "/user.png"} width={40} height={40} alt="Profile" className="h-10 w-10 rounded-full border border-zinc-300 dark:border-zinc-700" />
          <div>
            <div className="text-base font-semibold text-zinc-900 dark:text-white">{session?.name || ""}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{session?.email || ""}</div>
          </div>
        </div>
        <Button type="submit" variant="outline" className="w-full flex items-center gap-2 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <LogOut size={18} />
          Sign Out
        </Button>
      </form>
            </div>
        </div>
    )
}
