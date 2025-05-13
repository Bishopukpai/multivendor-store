import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

//Interface for individual sidebar items
interface NavbarItem {
    href: string;
    children: React.ReactNode;
}

//interface for sidebar nav
interface Props {
    items: NavbarItem[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({
    items,
    open,
    onOpenChange,
}: Props) => {
    return(
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="p-0 transition-none">
                <SheetHeader className="p-4 border-b">
                    <div className="flex items-center">
                        <SheetTitle>MENU</SheetTitle>
                    </div>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    
                    {/** Navbar items */}
                    {items.map((item)=> (
                        <Link key={item.href} href={item.href} className="w-full text-green-600 text-left p-4 hover:bg-green-500 hover:text-white flex items-center text-base font-medium" onClick={() =>onOpenChange(false)}>
                            {item.children}
                        </Link> 
                    ))}

                    {/** Sign-in and Register buttons */}

                    <div className="border-t">
                        <Link href="/sign-in" className="w-full text-green-600 text-left p-4 hover:bg-green-500 hover:text-white flex items-center text-base font-medium" onClick={() =>onOpenChange(false)}>
                            LOG IN
                        </Link>

                        <Link href="/sign-up" className="w-full text-green-600 text-left p-4 hover:bg-green-500 hover:text-white flex items-center text-base font-medium" onClick={() =>onOpenChange(false)}>
                            START NOW
                        </Link>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
};