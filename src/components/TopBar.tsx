import { HouseTitleIcon } from "@/assets/icons";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900";

const mobileNavLinkClass =
  "block rounded-md px-3 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-100";

function TopBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:items-end sm:justify-start sm:gap-1 sm:px-6 sm:pb-1">
        <Link
          to="/dashboard"
          className="flex shrink-0 self-center items-center py-1 sm:mr-2 sm:self-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 rounded-md"
          aria-label="首頁"
        >
          <HouseTitleIcon className="h-8 w-auto max-w-[200px]" />
        </Link>

        <nav className="hidden flex-1 items-end gap-0.5 sm:flex sm:gap-1">
          <Link to="/member" className={navLinkClass}>
            會員資料
          </Link>
          <Link to="/posts" className={navLinkClass}>
            貼文資料
          </Link>
        </nav>

        <div className="hidden shrink-0 self-end sm:flex">
          <Link to="/login" className={mobileNavLinkClass}>
            登出
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 rounded-md p-2 text-zinc-700 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 sm:hidden"
          aria-expanded={menuOpen}
          aria-controls="topbar-mobile-menu"
          aria-label={menuOpen ? "關閉選單" : "開啟選單"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="topbar-mobile-menu"
          className="border-t border-zinc-200 bg-white px-4 py-3 sm:hidden"
        >
          <nav className="flex flex-col gap-0.5">
            <Link
              to="/member"
              className={mobileNavLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              會員資料
            </Link>
            <Link
              to="/posts"
              className={mobileNavLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              貼文資料
            </Link>
          </nav>
          <Link
            to="/login"
            className={mobileNavLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            登出
          </Link>
        </div>
      )}
    </header>
  );
}

export default TopBar;
