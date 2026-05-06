import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/lib/i18n/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Onboarding is a thin redirect: registration callback sends new users here,
// and we forward them to the right place based on subscription status. We
// don't render an interstitial page — that just adds friction.
export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect({ href: "/login", locale });

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", user!.id)
    .single();

  if (profile?.subscription_status === "active") {
    redirect({ href: "/dashboard", locale });
  }

  // Default: send freshly-registered users straight to pricing.
  redirect({ href: "/pricing", locale });
}
