import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, Users, FileText, LogOut, ExternalLink } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/content", label: "Content", icon: FileText },
];

export default function AdminLayout() {
  const { isAdmin, logout } = useAdmin();

  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex bg-[#F5F1E8]">
      <aside className="w-56 shrink-0 bg-charcoal text-white flex flex-col hidden sm:flex" aria-label="Admin navigation">
        <div className="px-5 py-5 font-display text-lg font-semibold border-b border-white/10">VENYALAY Admin</div>
        <nav className="flex-1 py-4">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 text-sm font-semibold ${isActive ? "bg-white/10 text-amber" : "text-[#c9c2b6]"}`
              }
            >
              <item.icon size={16} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <a href="/" className="flex items-center gap-2 text-xs text-[#c9c2b6]"><ExternalLink size={13} /> View storefront</a>
          <button onClick={logout} className="flex items-center gap-2 text-xs text-[#c9c2b6]"><LogOut size={13} /> Log out</button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sm:hidden fixed top-0 left-0 right-0 z-40 bg-charcoal text-white flex items-center justify-between px-4 py-3">
        <span className="font-display font-semibold">VENYALAY Admin</span>
        <button onClick={logout} className="text-xs text-[#c9c2b6]">Log out</button>
      </div>

      <div className="flex-1 min-w-0">
        <nav className="sm:hidden flex overflow-x-auto no-scrollbar gap-1 px-3 pt-14 pb-2 bg-white border-b border-line" aria-label="Admin navigation">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold shrink-0 ${isActive ? "bg-maroon text-white" : "bg-cream-deep text-charcoal"}`
              }
            >
              <item.icon size={12} /> {item.label}
            </NavLink>
          ))}
        </nav>
        <main className="p-5 sm:p-8 max-w-5xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
