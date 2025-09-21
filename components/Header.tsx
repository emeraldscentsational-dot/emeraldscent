// src/components/Header.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { toggleSearch, toggleMenu } from "@/lib/store/slices/uiSlice";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import SearchOverlay from "./SearchOverlay";
import CartSlideout from "./CartSlideout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toggleCart } from "@/lib/store/slices/cartSlice";

export default function Header() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { items } = useSelector((state: RootState) => state.cart);
  const { isMenuOpen, isSearchOpen } = useSelector(
    (state: RootState) => state.ui
  );

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
  ];

  // Close menu when the viewport is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        dispatch(toggleMenu());
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, dispatch]);

  return (
    <>
      {/* Header with luxurious dark background */}
      <header className="sticky top-0 z-50 bg-purple-950/90 backdrop-blur-md shadow-lg font-sans">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo and Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-8">
              {/* Logo */}
              <Link
                href="/"
                className="text-3xl font-bold text-amber-400 tracking-wider transition-colors duration-300 hover:text-amber-500"
              >
                EmeraldScentSational
              </Link>
            </div>

            <div className=" sm:hidden flex items-center space-x-8">
              {/* Logo */}
              <Link
                href="/"
                className="text-3xl font-bold text-amber-400 tracking-wider transition-colors duration-300 hover:text-amber-500"
              >
                Emerald
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 justify-center space-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-purple-200 hover:text-amber-400 transition-colors duration-200 font-medium tracking-wide uppercase text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side icons and mobile menu button */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button
                onClick={() => dispatch(toggleSearch())}
                className="p-2 text-purple-300 hover:text-amber-400 transition-colors duration-200"
              >
                <Search className="h-6 w-6" />
              </button>

              {/* User Account */}
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 text-purple-300 hover:text-amber-400"
                    >
                      <User className="h-6 w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 bg-purple-900 text-purple-100 border-purple-800"
                  >
                    <DropdownMenuItem asChild>
                      <Link href="/account">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist">Wishlist</Link>
                    </DropdownMenuItem>
                    {session.user?.role === "ADMIN" && (
                      <>
                        <DropdownMenuSeparator className="bg-purple-700" />
                        <DropdownMenuItem asChild>
                          <Link href="/admin">Admin Dashboard</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator className="bg-purple-700" />
                    <DropdownMenuItem onClick={() => signOut()}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href="/auth/signin"
                  className="p-2 text-purple-300 hover:text-amber-400 transition-colors duration-200"
                >
                  <User className="h-6 w-6" />
                </Link>
              )}

              {/* Shopping Cart */}
              <button
                onClick={() => dispatch(toggleCart())}
                className="relative p-2 text-purple-300 hover:text-amber-400 transition-colors duration-200"
              >
                <ShoppingBag className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-purple-950 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => dispatch(toggleMenu())}
                className="md:hidden p-2 text-purple-300 hover:text-amber-400 transition-colors duration-200 z-50"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 transform transition-transform duration-300 rotate-90" />
                ) : (
                  <Menu className="h-6 w-6 transform transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-white hover:text-purple-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && <SearchOverlay />}

      {/* Cart Slideout */}
      <CartSlideout />
    </>
  );
}
