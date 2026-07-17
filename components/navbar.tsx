"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookMarked, Compass, Home, LogOut, Stamp, User } from "lucide-react";

import { cn } from "@/lib/utils";

const authedLinks = [
  { href: "/passport", label: "Passport", icon: BookMarked },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/profile", label: "Profile", icon: User },
];

export function Navbar({ isAuthed }: { isAuthed: boolean }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href={isAuthed ? "/passport" : "/"}
            className="flex items-center gap-2 font-serif text-lg font-700 text-secondary"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-secondary-foreground">
              <Stamp className="h-5 w-5" />
            </span>
            <span className="font-semibold tracking-tight">
              UBRA <span className="text-accent">Passport</span>
            </span>
          </Link>

          {isAuthed ? (
            <div className="flex items-center gap-1">
              <div className="hidden items-center gap-1 sm:flex">
                {authedLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive(href)
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                ))}
              </div>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-muted"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent"
              >
                Start Journey
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Mobile bottom nav (authed only) */}
      {isAuthed && (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur sm:hidden">
          <div className="mx-auto flex max-w-md items-stretch justify-around">
            {authedLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors",
                  isActive(href)
                    ? "text-secondary"
                    : "text-muted-foreground hover:text-secondary"
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            ))}
            <form action="/auth/signout" method="post" className="flex-1">
              <button
                type="submit"
                className="flex w-full flex-col items-center gap-1 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-secondary"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </form>
          </div>
        </nav>
      )}
    </>
  );
}
