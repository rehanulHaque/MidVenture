"use client"
import { Button } from "@/components/ui/button";
import { LogOut, Image as Img, Sparkle, Search, Settings, Gem } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {User} from 'next-auth';
import Image from 'next/image';
import { logoutAction } from "@/action/auth";

const navItems = [
  { label: "Generate", icon: <Sparkle size={20} />, href: "/dashboard/gen", path: "gen" },
  { label: "My Images", icon: <Img size={20} />, href: "/dashboard/my-images", path: "my-images" },
  { label: "Explore", icon: <Search size={20} />, href: "/dashboard/explore", path: "explore" },
  { label: "Setting", icon: <Settings size={20} />, href: "/dashboard/settings", path: "settings" },
  { label: "Upgrade", icon: <Gem size={20} />, href: "/dashboard/upgrade", path: "upgrade" },
];

export default function Sidebar({session}: {session: User}) {
  const params = usePathname().split("/")[2]
  return (
    <div className="hidden md:col-span-1 md:flex justify-between items-center flex-col max-h-screen bg-white sticky top-0 left-0">
      {/* Top: Logo */}
      <div className="px-6 pt-8">
        <div className="flex items-center gap-2 mb-10">
          {/* <img src="/logo.svg" alt="Logo" className="h-10 w-10 rounded-lg bg-gradient-to-tr from-zinc-900 to-zinc-700" /> */}
          <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">MidVenture</Link>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link href={item.href} key={item.label}>
            <Button variant={item.path === params ? "default" : "ghost"} className="w-full flex items-center gap-2 justify-start">
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Button>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom: Profile */}
      <form action={logoutAction} className="px-6 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <Image src={session.image || ""} width={40} height={40} alt="Profile" className="h-10 w-10 rounded-full border border-zinc-300 dark:border-zinc-700" />
          <div>
            <div className="text-base font-semibold text-zinc-900 dark:text-white">{session.name || ""}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{session.email || ""}</div>
          </div>
        </div>
        <Button type="submit" variant="outline" className="w-full flex items-center gap-2 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <LogOut size={18} />
          Sign Out
        </Button>
      </form>
    </div>
  );
}