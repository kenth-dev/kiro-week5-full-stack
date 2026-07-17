import { UBRA_BASE_URL, UBRA_LINKS, UBRA_TAGLINE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/40 pb-20 sm:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-lg font-semibold text-secondary">
              UBRA Digital Passport
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              A cultural discovery companion to{" "}
              <a
                href={UBRA_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline underline-offset-2"
              >
                UBRA
              </a>
              , preserving Filipino artisan heritage through digital innovation.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Explore UBRA
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {UBRA_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p className="italic">{UBRA_TAGLINE}</p>
          <p className="mt-1">
            © {new Date().getFullYear()} UBRA Digital Passport. A Week 5
            full-stack project.
          </p>
        </div>
      </div>
    </footer>
  );
}
