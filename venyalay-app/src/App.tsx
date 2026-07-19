import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Rituals from "./pages/Rituals";
import Explore from "./pages/Explore";
import Campaign from "./pages/Campaign";
import DidYouKnow from "./pages/DidYouKnow";
import Faq from "./pages/Faq";
import BeeAndMe from "./pages/BeeAndMe";
import Quiz from "./pages/Quiz";
import TraceHoney from "./pages/TraceHoney";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import Wishlist from "./pages/Wishlist";
import Rewards from "./pages/Rewards";
import RitualTracker from "./pages/RitualTracker";
import Addresses from "./pages/Addresses";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import Shipping from "./pages/legal/Shipping";
import Returns from "./pages/legal/Returns";
import Cancellation from "./pages/legal/Cancellation";
import Disclaimer from "./pages/legal/Disclaimer";

import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminCustomers from "./admin/AdminCustomers";
import AdminContent from "./admin/AdminContent";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/rituals" element={<Rituals />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/campaign" element={<Campaign />} />
        <Route path="/explore/did-you-know" element={<DidYouKnow />} />
        <Route path="/explore/faq" element={<Faq />} />
        <Route path="/explore/bee-and-me" element={<BeeAndMe />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/trace" element={<TraceHoney />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/orders" element={<OrderHistory />} />
        <Route path="/profile/ritual-tracker" element={<RitualTracker />} />
        <Route path="/profile/addresses" element={<Addresses />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/legal/privacy" element={<Privacy />} />
        <Route path="/legal/terms" element={<Terms />} />
        <Route path="/legal/shipping" element={<Shipping />} />
        <Route path="/legal/returns" element={<Returns />} />
        <Route path="/legal/cancellation" element={<Cancellation />} />
        <Route path="/legal/disclaimer" element={<Disclaimer />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="content" element={<AdminContent />} />
      </Route>

      <Route path="*" element={<Layout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
