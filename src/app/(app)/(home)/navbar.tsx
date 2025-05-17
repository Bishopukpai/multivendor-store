"use client"

import { Poppins } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

interface NavbarItemProps {
    href: string;
    children: React.ReactNode;
    //will give the navbar's tab a different color for an active page
    isActive?: boolean;
}
const NavbarItem = ({
    href,
    children,
    isActive
}: NavbarItemProps) => {
    return(
        null
        //<Button asChild variant="elevated" className={cn("bg-green-400 text-white hover:bg-green-200 hover:text-green-500 rounded-full px-3.5 text-lg", isActive && "bg-green-200 text-green-700")}>
            //<Link href={href}>
                //{children}
            //</Link>
       // </Button>
    )
}

const navbarItems = [
    { href: "/", children: "HOME"},
    { href: "/about", children: "ABOUT"},
    { href: "/features", children: "FEATURES"},
    { href: "/pricing", children: "PRICING"},
    { href: "/contact", children: "CONTACT"},
]

export const Navbar = () => {
    const pathname = usePathname()

    {/** State for opening and closing the sidebar component */}
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const trpc = useTRPC()
    const session = useQuery(trpc.auth.session.queryOptions());
    return (
        <nav className="h-20 flex border-b justify-between font-medium bg-white">

            <Link href="/" className="pl-6 flex items-center">
                <span className={cn("text-5xl font-semibold", poppins.className)}>FunBuy</span>
            </Link>

            {/** This line below renders the side bar component with all the items in the nav bar */}
            <NavbarSidebar items={navbarItems} open={isSidebarOpen} onOpenChange={setIsSidebarOpen}/>

            <div className="items-center gap-4 hidden lg:flex">
                    {navbarItems.map((item) => (
                        <NavbarItem key={item.href} href={item.href} isActive={pathname === item.href}>
                            {item.children}
                        </NavbarItem>
                    ))}
            </div>
                {
                    session.data?.user ? (
                        <div className="hidden lg:flex">
                          <Button asChild variant="secondary" className="border-l text-green-600 border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-green-600 hover:text-white text-lg">
                            <Link href="/admin">
                               Dashboard
                            </Link>
                           </Button>
                        </div>
                    ): (
                   <div className="hidden lg:flex">
                     <Button asChild variant="secondary" className="border-l text-green-600 border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-green-600 hover:text-white text-lg">
                       <Link prefetch href="/sign-in">
                          LOG IN
                        </Link>
                      </Button>
                      <Button asChild className="border-l border-l-green-800 text-green-600 border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-green-600 hover:text-white text-lg">
                         <Link prefetch href="/sign-up">
                            GET STARTED
                         </Link>
                      </Button>
                     </div>
                )}

            <div className="flex lg:hidden items-center justify-center">
                <Button variant="ghost" className="size-12 border-transparent bg-white" onClick={() => setIsSidebarOpen(true)}>
                    <MenuIcon />
                </Button>
            </div>
        </nav>
    );
};