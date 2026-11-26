"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

type NavLink = readonly [string, string];

export default function Header({ links }: { links: ReadonlyArray<NavLink> }) {
  const pathname = usePathname();
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const open = openForPath === pathname;
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenForPath(null);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-200 ${
          scrolled
            ? "border-b border-[#f4efe9]/14 bg-[#0d0d0d]/90 backdrop-blur-md"
            : "border-b border-[#f4efe9]/10 bg-[#0d0d0d]/95"
        }`}
      >
        <div className="nord-container flex min-h-[72px] items-center justify-between gap-4 py-3 md:min-h-[82px]">
          <Link
            href="/"
            aria-label="Nord Studios — Inicio"
            className="group relative inline-flex min-h-[44px] shrink-0 items-center focus-visible:outline-2 focus-visible:outline-[#f26a2e]"
          >
            <Image
              src="/brand/mark-orange.png"
              alt=""
              width={513}
              height={349}
              priority
              className="block h-[30px] w-auto min-[420px]:hidden"
            />
            <Image
              src="/brand/logo-light.png"
              alt="Nord Studios Creative Agency"
              width={711}
              height={149}
              priority
              className="hidden h-[38px] w-auto min-[420px]:block lg:h-[41px]"
            />
          </Link>

          <nav
            aria-label="Principal"
            className="hidden items-center gap-1 lg:flex xl:gap-2"
          >
            <ul className="m-0 flex list-none items-center gap-1 p-0 xl:gap-2">
              {links.map(([href, label]) => {
                const active = isActive(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative inline-flex min-h-[44px] items-center px-3 py-2 text-[12px] font-medium tracking-[0.14em] uppercase transition-colors duration-150 ${
                        active
                          ? "text-[#f26a2e]"
                          : "text-[#f4efe9]/82 hover:text-[#f4efe9]"
                      }`}
                    >
                      <span className="relative">
                        {label}
                        <span
                          aria-hidden="true"
                          className={`absolute -bottom-1 left-0 h-[1.5px] bg-[#f26a2e] transition-all duration-200 ${
                            active ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contacto"
              className="group hidden min-h-[44px] items-center gap-2 border border-[#f26a2e] bg-[#f26a2e] px-5 py-2.5 text-[12px] font-bold tracking-[0.1em] text-[#0d0d0d] uppercase transition-all duration-150 hover:bg-[#ff7c40] sm:inline-flex"
            >
              <span>Inicia tu proyecto</span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu-drawer"
              aria-label={open ? "Cerrar menú" : "Abrir menú de navegación"}
              onClick={() => setOpenForPath(open ? null : pathname)}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-[#f4efe9]/20 bg-transparent px-3 text-[#f4efe9] transition-colors hover:border-[#f26a2e] hover:text-[#f26a2e] lg:hidden"
            >
              {open ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }
            }
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[#0d0d0d] text-[#f4efe9] lg:hidden"
          >
            <div className="nord-container flex min-h-[72px] items-center justify-between border-b border-[#f4efe9]/14 py-3">
              <Link
                href="/"
                onClick={() => setOpenForPath(null)}
                aria-label="Nord Studios — Inicio"
                className="inline-flex min-h-[44px] items-center"
              >
                <Image
                  src="/brand/logo-light.png"
                  alt="Nord Studios Creative Agency"
                  width={711}
                  height={149}
                  className="h-[34px] w-auto"
                />
              </Link>

              <button
                ref={closeRef}
                type="button"
                aria-label="Cerrar menú"
                onClick={() => {
                  setOpenForPath(null);
                  toggleRef.current?.focus();
                }}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-[#f4efe9]/25 text-[#f4efe9] transition-colors hover:border-[#f26a2e] hover:text-[#f26a2e]"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <nav
              aria-label="Menú móvil"
              className="nord-container my-auto py-8"
            >
              <p className="mb-4 text-[11px] font-medium tracking-[0.2em] text-[#b5b0a8] uppercase">
                Navegación
              </p>
              <ul className="m-0 flex list-none flex-col divide-y divide-[#f4efe9]/12 border-y border-[#f4efe9]/12 p-0">
                {links.map(([href, label], index) => {
                  const active = isActive(href);
                  return (
                    <motion.li
                      key={href}
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, x: -16 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.24,
                        delay: prefersReducedMotion ? 0 : 0.04 * index,
                      }}
                    >
                      <Link
                        href={href}
                        onClick={() => setOpenForPath(null)}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-[60px] items-center justify-between py-4 transition-colors ${
                          active
                            ? "text-[#f26a2e]"
                            : "text-[#f4efe9] hover:text-[#f26a2e]"
                        }`}
                      >
                        <span className="font-display text-[clamp(1.25rem,5vw,1.875rem)] tracking-[-0.02em] uppercase">
                          {label}
                        </span>
                        <span className="text-xs font-medium tracking-[0.16em] text-[#b5b0a8]">
                          0{index + 1}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="nord-container border-t border-[#f4efe9]/14 py-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="m-0 text-xs tracking-[0.14em] text-[#b5b0a8] uppercase">
                  Trujillo, Perú · Dirección creativa &amp; branding
                </p>
                <Link
                  href="/contacto"
                  onClick={() => setOpenForPath(null)}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 bg-[#f26a2e] px-6 py-3 text-sm font-bold tracking-[0.08em] text-[#0d0d0d] uppercase"
                >
                  <span>Inicia tu proyecto</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
