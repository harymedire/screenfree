"use client";

import type { Currency } from "@/types/db";
import { ShieldCheck, Lock } from "lucide-react";
// Design preview — uses mock until Stripe API keys are configured.
// When they're ready, swap `StripeMock` for `StripeInline` in the JSX below.
import { StripeMock } from "./StripeMock";
// import { StripeInline } from "./StripeInline";
// import { DodoInline } from "./DodoInline";  // Dodo Payments — temporarily disabled.

type Mode = "subscription" | "onetime";

type Props = {
  mode: Mode;
  packId: string | null;
  locale: string;
  // Order summary card (price + product) — kept because the Stripe Payment
  // Element doesn't show what's being paid for; transparency is on us.
  summary?: { title: string; amountCents: number; currency: Currency };
};

function formatAmount(cents: number, currency: Currency): string {
  const major = (cents / 100).toFixed(2);
  if (currency === "USD") return `$${major}`;
  if (currency === "EUR") return `${major} €`;
  return `${major} ${currency}`;
}

// Inline Stripe checkout — minimal design, just the card form. Name and email
// are collected at registration; Stripe handles whatever is required by rules
// (postal code for US/UK cards, 3D Secure, etc.).
export function CheckoutClient({ mode, packId, locale, summary }: Props) {
  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* Order summary — title + price, short. Subscription: brand name;
          one-time: specific pack name. Renewal/cycle details live above the
          CTA and in marketing copy. */}
      {summary && (
        <div className="card bg-gradient-to-br from-plum-50 to-coral-50 border-plum-100">
          <div className="flex items-baseline justify-between gap-3">
            <div className="font-bold text-plum-900 truncate">
              {mode === "subscription" ? "Weekly system" : summary.title}
            </div>
            <div className="font-display text-xl text-plum-900 shrink-0">
              {formatAmount(summary.amountCents, summary.currency)}
            </div>
          </div>
        </div>
      )}

      {/* Stripe inline card form */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4 text-sm text-plum-700 font-bold">
          <Lock className="h-4 w-4" />
          Secure payment via Stripe
        </div>

        <StripeMock mode={mode} />
        {/* <StripeInline mode={mode} packId={packId} locale={locale} /> */}

        <div className="mt-4 pt-4 border-t border-plum-100 flex items-center gap-2 text-xs text-plum-500">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
          <span>
            Card details never reach our server. Processed by Stripe (PCI-DSS Level 1).
            {mode === "subscription" && " Cancel any time from your dashboard."}
          </span>
        </div>
      </div>
    </div>
  );
}
