"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Heart,
  LogOut,
  MapPin,
  Menu,
  Package,
  Search,
  ShoppingCart,
  User,
  UserCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  searchProducts,
  type SearchProduct,
} from "@/services/product-search.service";

export default function MainNavbar() {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);

  const { user, loading, logout } = useAuth();

  const query = keyword.trim();
  const showDropdown = query.length >= 2;

  const handleSearch = () => {
    if (!query) return;

    setKeyword("");
    router.push(`/products?keyword=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    router.push("/");
  };

  return (
    <div className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:py-5">
        <div className="flex w-full items-center justify-between lg:w-auto">
          <div
            onClick={() => router.push("/")}
            className="flex cursor-pointer items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1220] text-white">
              <ShoppingCart size={20} />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Shop<span className="text-amber-500">Next</span>
            </h1>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 lg:hidden">
            <Menu size={22} />
          </button>
        </div>

        <div className="flex w-full items-center gap-2 lg:max-w-2xl">
          <div className="relative flex flex-1 items-center overflow-visible">
            <div className="flex w-full items-center overflow-hidden rounded-xl border border-zinc-200 bg-white">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 sm:text-base"
              />

              <button
                onClick={handleSearch}
                className="bg-[#0B1220] px-4 py-3 text-white transition hover:bg-black sm:px-5"
              >
                <Search size={18} />
              </button>
            </div>

            {showDropdown && (
              <div className="absolute left-0 top-14 z-50 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl">
                <SearchDropdown
                  keyword={query}
                  onSelect={() => setKeyword("")}
                />
              </div>
            )}
          </div>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Heart size={22} className="text-zinc-700" />

          <button className="relative text-zinc-700">
            <ShoppingCart size={24} />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-medium text-black">
              0
            </span>
          </button>

          {loading ? (
            <div className="h-10 w-32 animate-pulse rounded-xl bg-zinc-200" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setAccountOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-zinc-100"
              >
                <User size={22} />

                <div className="text-left">
                  <p className="text-xs text-zinc-500">
                    Hello, {user.name?.split(" ")[0] ?? "User"}
                  </p>

                  <p className="flex items-center gap-1 text-sm font-semibold text-zinc-900">
                    Account
                    <ChevronDown size={14} />
                  </p>
                </div>
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-14 z-50 w-72 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl">
                  <div className="border-b border-zinc-100 p-4">
                    <p className="text-sm text-zinc-500">Signed in as</p>
                    <p className="truncate font-semibold text-zinc-900">
                      {user.name}
                    </p>
                    <p className="truncate text-sm text-zinc-500">
                      {user.email}
                    </p>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => {
                        setAccountOpen(false);
                        router.push("/profile");
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-zinc-800 hover:bg-zinc-100"
                    >
                      <UserCircle size={18} />
                      Profile
                    </button>

                    <button
                      onClick={() => {
                        setAccountOpen(false);
                        router.push("/orders");
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-zinc-800 hover:bg-zinc-100"
                    >
                      <Package size={18} />
                      Orders
                    </button>

                    <button
                      onClick={() => {
                        setAccountOpen(false);
                        router.push("/address");
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-zinc-800 hover:bg-zinc-100"
                    >
                      <MapPin size={18} />
                      Addresses
                    </button>

                    <button
                      onClick={() => {
                        setAccountOpen(false);
                        router.push("/profile?edit=true");
                      }}
                      className="mt-2 flex w-full items-center justify-center rounded-xl bg-amber-500 px-3 py-3 text-sm font-semibold text-black hover:bg-amber-400"
                    >
                      Update Profile
                    </button>
                  </div>

                  <div className="border-t border-zinc-100 p-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/login")}
                className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/register")}
                className="rounded-xl bg-[#0B1220] px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchDropdown({
  keyword,
  onSelect,
}: {
  keyword: string;
  onSelect: () => void;
}) {
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = keyword.trim();

    if (query.length < 2) {
      setProducts([]);
      setLoading(false);
      return;
    }

    let ignore = false;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const result = await searchProducts(query);

        if (!ignore) {
          setProducts(Array.isArray(result) ? result : []);
        }
      } catch {
        if (!ignore) setProducts([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }, 400);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [keyword]);

  if (loading) return <SearchSkeleton />;

  if (products.length === 0) {
    return <p className="p-4 text-sm text-zinc-500">No products found</p>;
  }

  return (
    <div className="max-h-[360px] overflow-y-auto p-2">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.slug ?? product.id}`}
          onClick={onSelect}
          className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-zinc-100"
        >
          <div className="h-12 w-12 overflow-hidden rounded-xl bg-zinc-100">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-zinc-200" />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-900">
              {product.name}
            </p>
            <p className="text-xs text-zinc-500">₹{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex animate-pulse items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-zinc-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 rounded bg-zinc-200" />
            <div className="h-3 w-1/3 rounded bg-zinc-200" />
          </div>
        </div>
      ))}
    </div>
  );
}