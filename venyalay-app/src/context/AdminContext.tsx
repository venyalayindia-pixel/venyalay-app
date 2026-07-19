import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, FaqItem } from "../types";
import { PRODUCTS as SEED_PRODUCTS } from "../data/products";
import { FAQS as SEED_FAQS } from "../data/content";

export interface AdminProduct extends Product {
  stock: number;
  active: boolean;
}

interface AdminContextValue {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  products: AdminProduct[];
  updateProduct: (id: string, patch: Partial<AdminProduct>) => void;
  toggleActive: (id: string) => void;
  faqs: FaqItem[];
  addFaq: (faq: FaqItem) => void;
  removeFaq: (id: string) => void;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

const KEYS = {
  products: "venyalay_admin_products_v1",
  auth: "venyalay_admin_auth_v1",
  faqs: "venyalay_admin_faqs_v1",
};

function safeLoad<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function seedProducts(): AdminProduct[] {
  return SEED_PRODUCTS.map((p) => ({ ...p, stock: 40, active: true }));
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => safeLoad(KEYS.auth, false));
  const [products, setProducts] = useState<AdminProduct[]>(() => safeLoad(KEYS.products, seedProducts()));
  const [faqs, setFaqs] = useState<FaqItem[]>(() => safeLoad(KEYS.faqs, SEED_FAQS));

  useEffect(() => { try { localStorage.setItem(KEYS.products, JSON.stringify(products)); } catch {} }, [products]);
  useEffect(() => { try { localStorage.setItem(KEYS.auth, JSON.stringify(isAdmin)); } catch {} }, [isAdmin]);
  useEffect(() => { try { localStorage.setItem(KEYS.faqs, JSON.stringify(faqs)); } catch {} }, [faqs]);

  const login = (password: string) => {
    const ok = password === "venyalay-admin";
    if (ok) setIsAdmin(true);
    return ok;
  };
  const logout = () => setIsAdmin(false);

  const updateProduct = (id: string, patch: Partial<AdminProduct>) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const toggleActive = (id: string) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));

  const addFaq = (faq: FaqItem) => setFaqs((prev) => [...prev, faq]);
  const removeFaq = (id: string) => setFaqs((prev) => prev.filter((f) => f.id !== id));

  const value: AdminContextValue = { isAdmin, login, logout, products, updateProduct, toggleActive, faqs, addFaq, removeFaq };
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within an AdminProvider");
  return ctx;
}
