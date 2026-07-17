import { Stamp } from "lucide-react";

import { UBRA_BASE_URL, UBRA_LINKS, UBRA_TAGLINE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30 pb-20 sm:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto]">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Stamp className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-bold text-secondary">
                UBRA Digital Passport
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A cultural discovery companion to{" "}
              <a
                href={UBRA_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                UBRA
              </a>
              , preserving Filipino artisan heritage through digital innovation.
            </p>
          </div>

          {/* UBRA links */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Explore UBRA
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-1.5 text-sm">
              {UBRA_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p className="font-serif italic">{UBRA_TAGLINE}</p>
          <p className="mt-1">
            © {new Date().getFullYear()} UBRA Digital Passport
          </p>
        </div>
      </div>
    </footer>
  );
}
