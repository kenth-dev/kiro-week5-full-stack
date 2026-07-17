"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookMarked, Compass, LogOut, Stamp, User } from "lucide-react";

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
      {/* Desktop + tablet top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md backdrop-saturate-150">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href={isAuthed ? "/passport" : "/"}
            className="flex items-center gap-2.5"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Stamp className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold tracking-tight text-secondary">
              UBRA <span className="text-accent">Passport</span>
            </span>
          </Link>

          {isAuthed ? (
            <div className="flex items-center gap-0.5">
              {/* Desktop nav items */}
              <div className="hidden items-center gap-0.5 sm:flex">
                {authedLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                      isActive(href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-secondary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                    {isActive(href) && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary" />
                    )}
                  </Link>
                ))}
              </div>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-secondary"
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
                className="rounded-lg px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-muted"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="press-effect rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md"
              >
                Start journey
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Mobile bottom nav (authed only) — iOS-safe */}
      {isAuthed && (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-lg safe-bottom sm:hidden">
          <div className="mx-auto grid max-w-md grid-cols-4">
            {authedLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
                  isActive(href)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive(href) && "scale-110")} />
                {label}
              </Link>
            ))}
            <form action="/auth/signout" method="post" className="contents">
              <button
                type="submit"
                className="flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium text-muted-foreground transition-colors"
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
