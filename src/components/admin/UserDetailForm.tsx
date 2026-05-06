"use client";

import { useState } from "react";
import { useRouter } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { User, Mail, ShieldOff, ShieldCheck, Pause, Play, PlusCircle, MinusCircle, Save, BadgeCheck, BadgeX } from "lucide-react";
import type { Profile } from "@/types/db";

type Tracking = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  referrer: string | null;
  landing_page_url: string | null;
  created_at: string;
};

type Props = {
  profile: Profile;
  isBlocked: boolean;
  bannedUntil: string | null;
  lastSignInAt: string | null;
  tracking: Tracking | null;
};

// Admin user-management form. Calls /api/admin/users/[id] PATCH for every
// action; shows inline status messages. Designed to be incrementally
// expanded — refund history, payment events, etc. later.
export function UserDetailForm({ profile, isBlocked, lastSignInAt, tracking }: Props) {
  const router = useRouter();
  const [fullName, setFullName] = useState(profile.full_name ?? "");
  const [email, setEmail] = useState(profile.email);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  async function call(action: string, payload: Record<string, unknown> = {}) {
    setBusy(action);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/users/${profile.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...payload }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "request-failed");
      setMsg({ kind: "ok", text: "Saved" });
      router.refresh();
    } catch (err) {
      setMsg({ kind: "err", text: (err as Error).message });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6">
      {/* Main column */}
      <div className="space-y-5">
        {/* Profile info */}
        <div className="card space-y-4">
          <h2 className="font-display text-xl text-plum-900">Profile</h2>

          <div>
            <label className="label">Full name</label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-plum-400" />
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input pl-10"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              disabled={busy === "set_name"}
              onClick={() => call("set_name", { full_name: fullName.trim() })}
            >
              <Save className="h-4 w-4" /> Save name
            </Button>
          </div>

          <div>
            <label className="label">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-plum-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              disabled={busy === "set_email"}
              onClick={() => call("set_email", { email: email.trim() })}
            >
              <Save className="h-4 w-4" /> Change email
            </Button>
          </div>
        </div>

        {/* Subscription actions */}
        <div className="card space-y-4">
          <h2 className="font-display text-xl text-plum-900">Subscription</h2>
          <div className="text-sm text-plum-700">
            Status: <strong className="capitalize">{profile.subscription_status}</strong>
            {" · "}Weeks consumed: <strong>{profile.weeks_consumed}</strong>
            {profile.subscription_id?.startsWith("manual:") && (
              <span className="ml-2 inline-flex items-center gap-1 text-xs font-bold text-teal-700">
                <BadgeCheck className="h-3.5 w-3.5" /> Marked as subscriber (manual)
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={busy === "grant_week"}
              onClick={() => call("grant_week")}
            >
              <PlusCircle className="h-4 w-4" /> Add week
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={busy === "revoke_week" || profile.weeks_consumed <= 0}
              onClick={() => call("revoke_week")}
            >
              <MinusCircle className="h-4 w-4" /> Remove week
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={busy === "mark_subscribed"}
              onClick={() => call("mark_subscribed")}
            >
              <Play className="h-4 w-4" /> Activate
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={busy === "set_status_paused"}
              onClick={() => call("set_status", { status: "paused" })}
            >
              <Pause className="h-4 w-4" /> Pause
            </Button>
            {profile.subscription_id?.startsWith("manual:") && (
              <Button
                variant="ghost"
                size="sm"
                disabled={busy === "unmark_subscribed"}
                onClick={() => {
                  if (confirm("Remove manual subscription? The user will see the upgrade prompt in their dashboard again.")) {
                    call("unmark_subscribed");
                  }
                }}
                className="!text-coral-700"
              >
                <BadgeX className="h-4 w-4" /> Remove subscription
              </Button>
            )}
          </div>
        </div>

        {/* Block / unblock */}
        <div className="card space-y-3">
          <h2 className="font-display text-xl text-plum-900">Account access</h2>
          {isBlocked ? (
            <>
              <p className="text-sm text-coral-700 font-bold">⚠ Account is blocked.</p>
              <Button
                variant="ghost"
                size="sm"
                disabled={busy === "unblock"}
                onClick={() => call("unblock")}
              >
                <ShieldCheck className="h-4 w-4" /> Unblock
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="!text-coral-700"
              disabled={busy === "block"}
              onClick={() => {
                if (confirm("Block this account? The user will not be able to sign in or register with this email.")) {
                  call("block");
                }
              }}
            >
              <ShieldOff className="h-4 w-4" /> Block account
            </Button>
          )}
        </div>

        {msg && (
          <p className={
            msg.kind === "ok"
              ? "text-sm text-teal-700 font-bold"
              : "text-sm text-coral-700 bg-coral-100 rounded-xl px-3 py-2"
          }>
            {msg.text}
          </p>
        )}
      </div>

      {/* Side info */}
      <aside className="space-y-4">
        <div className="card space-y-3 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wide text-plum-500 font-bold">User ID</p>
            <p className="font-mono text-xs text-plum-800 break-all">{profile.id}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-plum-500 font-bold">Role</p>
            <p className="font-bold text-plum-900 capitalize">{profile.role}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-plum-500 font-bold">Subscribed since</p>
            <p className="text-plum-800">
              {profile.subscription_started_at
                ? new Date(profile.subscription_started_at).toLocaleString("en-US")
                : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-plum-500 font-bold">Last sign-in</p>
            <p className="text-plum-800">
              {lastSignInAt ? new Date(lastSignInAt).toLocaleString("en-US") : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-plum-500 font-bold">Payment method</p>
            <p className="text-plum-800 capitalize">{profile.subscription_provider ?? "—"}</p>
          </div>
        </div>

        <div className="card space-y-3 text-sm">
          <h3 className="font-display text-base text-plum-900">Source (UTM)</h3>
          {tracking ? (
            <>
              <TrackRow label="Source" value={tracking.utm_source} />
              <TrackRow label="Medium" value={tracking.utm_medium} />
              <TrackRow label="Campaign" value={tracking.utm_campaign} />
              <TrackRow label="Term" value={tracking.utm_term} />
              <TrackRow label="Content" value={tracking.utm_content} />
              <TrackRow label="Referrer" value={tracking.referrer} mono />
              <TrackRow label="Landing" value={tracking.landing_page_url} mono />
              <div>
                <p className="text-xs uppercase tracking-wide text-plum-500 font-bold">Recorded</p>
                <p className="text-plum-800 text-xs">
                  {new Date(tracking.created_at).toLocaleString("en-US")}
                </p>
              </div>
            </>
          ) : (
            <p className="text-xs text-plum-500 italic">
              No attribution data — user likely arrived directly (no UTM).
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

function TrackRow({ label, value, mono = false }: { label: string; value: string | null; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-plum-500 font-bold">{label}</p>
      <p className={mono ? "font-mono text-xs text-plum-800 break-all" : "text-plum-800"}>
        {value || "—"}
      </p>
    </div>
  );
}
