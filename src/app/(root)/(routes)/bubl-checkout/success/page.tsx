// app/(root)/(routes)/bubl-checkout/success/page.js

import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

// Force Next.js to treat this route as fully dynamic (no build‐time prerender).
export const dynamic = "force-dynamic";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="h-64 flex items-center justify-center">Loading…</div>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}
