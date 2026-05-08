"use client";

import type { Currency } from "@/types/db";
import { ShieldCheck, Lock } from "lucide-react";
import { formatMoney } from "@/lib/utils/money";
import { StripeInline } from "./StripeInline";
// import { StripeMock } from "./StripeMock";  // Mock with fake card; activated StripeInline once Stripe is configured.
// import { DodoInline } from "./DodoInline";  // Dodo Payments — temporarily disabled.

type Mode = "subscription" | "onetime";

type Props = {
  mode: Mode;
  packId: string | null;
  locale: string;
  // Order summary card (price + product) — kept because the Stripe Payment
  // Element doesn't show what's being paid for; transparency is on us.
  summary?: { title: string; amountCents: number; currency: Currency };
  // From session (registration). Stripe requires billing_details once we
  // suppress fields with fields.billingDetails="never".
  billing: { name: string; email: string };
};

// Inline Stripe checkout — minimal design, just the card form. Name and email
// are collected at registration; Stripe handles whatever is required by rules
// (postal code for US/UK cards, 3D Secure, etc.).
export function CheckoutClient({ mode, packId, locale, summary, billing }: Props) {
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
              {formatMoney(summary.amountCents, summary.currency)}
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

        <StripeInline mode={mode} packId={packId} locale={locale} billing={billing} />
        {/* <StripeMock mode={mode} /> */}

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
