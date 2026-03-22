"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convexClient = convexUrl
  ? new ConvexReactClient(convexUrl)
  : null;

export default function Providers({ children }: { children: ReactNode }) {
  if (!convexClient) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6 text-center text-sm text-slate-600">
        Missing `NEXT_PUBLIC_CONVEX_URL`. Add it to your environment to connect
        WishDrop to Convex.
      </div>
    );
  }

  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}
