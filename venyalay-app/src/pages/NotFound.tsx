import React from "react";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import EmptyState from "../components/EmptyState";

export default function NotFound() {
  return (
    <EmptyState
      icon={Compass}
      title="Page not found"
      description="The page you're looking for may have moved."
      action={<Link to="/" className="px-5 py-3 rounded-full text-sm font-bold bg-maroon text-white inline-block">Back to Home</Link>}
    />
  );
}
