import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Address, Order, RewardLevel, RitualLog } from "../types";

interface UserContextValue {
  orders: Order[];
  addOrder: (order: Order) => void;
  ritualLogs: RitualLog[];
  logRitual: (ritual: RitualLog["ritual"]) => void;
  todayLogged: (ritual: RitualLog["ritual"]) => boolean;
  streak: number;
  points: number;
  rewardLevel: RewardLevel;
  addPoints: (amount: number) => void;
  savedArticles: string[];
  toggleSavedArticle: (id: string) => void;
  addresses: Address[];
  addAddress: (address: Address) => void;
  name: string;
  setName: (name: string) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

const KEYS = {
  orders: "venyalay_orders_v1",
  ritual: "venyalay_ritual_logs_v1",
  points: "venyalay_points_v1",
  saved: "venyalay_saved_articles_v1",
  addresses: "venyalay_addresses_v1",
  name: "venyalay_name_v1",
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

function levelForPoints(points: number): RewardLevel {
  if (points >= 1500) return "VENYALAYON";
  if (points >= 700) return "Honey Guardian";
  if (points >= 250) return "Ritual Member";
  return "Explorer";
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => safeLoad(KEYS.orders, []));
  const [ritualLogs, setRitualLogs] = useState<RitualLog[]>(() => safeLoad(KEYS.ritual, []));
  const [points, setPoints] = useState<number>(() => safeLoad(KEYS.points, 40));
  const [savedArticles, setSavedArticles] = useState<string[]>(() => safeLoad(KEYS.saved, []));
  const [addresses, setAddresses] = useState<Address[]>(() => safeLoad(KEYS.addresses, []));
  const [name, setName] = useState<string>(() => safeLoad(KEYS.name, "Guest VENYALAYON"));

  useEffect(() => { try { localStorage.setItem(KEYS.orders, JSON.stringify(orders)); } catch {} }, [orders]);
  useEffect(() => { try { localStorage.setItem(KEYS.ritual, JSON.stringify(ritualLogs)); } catch {} }, [ritualLogs]);
  useEffect(() => { try { localStorage.setItem(KEYS.points, JSON.stringify(points)); } catch {} }, [points]);
  useEffect(() => { try { localStorage.setItem(KEYS.saved, JSON.stringify(savedArticles)); } catch {} }, [savedArticles]);
  useEffect(() => { try { localStorage.setItem(KEYS.addresses, JSON.stringify(addresses)); } catch {} }, [addresses]);
  useEffect(() => { try { localStorage.setItem(KEYS.name, JSON.stringify(name)); } catch {} }, [name]);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setPoints((p) => p + Math.round(order.total / 10));
  };

  const addPoints = (amount: number) => setPoints((p) => p + amount);

  const todayKey = () => new Date().toISOString().slice(0, 10);

  const logRitual = (ritual: RitualLog["ritual"]) => {
    const date = todayKey();
    setRitualLogs((prev) => {
      if (prev.some((l) => l.date === date && l.ritual === ritual)) return prev;
      return [...prev, { date, ritual }];
    });
    setPoints((p) => p + 5);
  };

  const todayLogged = (ritual: RitualLog["ritual"]) => ritualLogs.some((l) => l.date === todayKey() && l.ritual === ritual);

  const toggleSavedArticle = (id: string) =>
    setSavedArticles((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const addAddress = (address: Address) => setAddresses((prev) => [...prev, address]);

  const streak = useMemo(() => {
    const days = Array.from(new Set(ritualLogs.map((l) => l.date))).sort().reverse();
    let count = 0;
    let cursor = new Date();
    for (const day of days) {
      const cursorKey = cursor.toISOString().slice(0, 10);
      if (day === cursorKey) {
        count += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
    return count;
  }, [ritualLogs]);

  const rewardLevel = levelForPoints(points);

  const value: UserContextValue = {
    orders, addOrder, ritualLogs, logRitual, todayLogged, streak,
    points, rewardLevel, addPoints, savedArticles, toggleSavedArticle,
    addresses, addAddress, name, setName,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
