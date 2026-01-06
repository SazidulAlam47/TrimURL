/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation, useNavigate } from "react-router";
import { headerLinks } from "@/constants/header.constant";
import { getUser, userLogout } from "@/utils/user";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

const Header = () => {
    const user = getUser();

    const [, forceUpdate] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const toastId = toast.loading("Logging out...");
        try {
            await userLogout();
            toast.success("Logout successful!", { id: toastId });
            forceUpdate({});
            navigate("/");
        } catch (error: any) {
            toast.error(error.message || error.data || "Something went wrong", {
                id: toastId,
            });
        }
    };

    return (
        <>
            <nav className="border-b bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600">
                                TrimURL
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center space-x-8">
                            {headerLinks.map((headerLink, index) => (
                                <Link
                                    key={index}
                                    to={headerLink.path}
                                    className={cn(
                                        "text-gray-700 hover:text-blue-600 transition-colors font-medium",
                                        {
                                            "text-blue-600":
                                                location.pathname ===
                                                headerLink.path,
                                        }
                                    )}
                                >
                                    {headerLink.title}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage
                                                src={user.profilePhoto}
                                                alt={user.name}
                                            />
                                            <AvatarFallback className="bg-blue-600 text-white">
                                                {user.name
                                                    ?.charAt(0)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-56"
                                    >
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {user.hasPassword ? (
                                            <DropdownMenuItem asChild>
                                                <Link to="/change-password">
                                                    Change Password
                                                </Link>
                                            </DropdownMenuItem>
                                        ) : (
                                            <DropdownMenuItem asChild>
                                                <Link to="/set-password">
                                                    Set Password
                                                </Link>
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                        >
                                            Sign out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link to="/login">
                                    <Button
                                        size="sm"
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        Login
                                    </Button>
                                </Link>
                            )}

                            <Sheet>
                                <SheetTrigger asChild className="md:hidden">
                                    <Button variant="ghost" size="icon">
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <div className="flex flex-col space-y-4 mt-8">
                                        {headerLinks.map(
                                            (headerLink, index) => (
                                                <Link
                                                    key={index}
                                                    to={headerLink.path}
                                                    className={cn(
                                                        "text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-2",
                                                        {
                                                            "text-blue-600":
                                                                location.pathname ===
                                                                headerLink.path,
                                                        }
                                                    )}
                                                >
                                                    {headerLink.title}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
