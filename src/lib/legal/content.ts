// Legal content for ScreenFree — US-jurisdiction, English only.
// Hardcoded here rather than in i18n message files because:
//   1. These are formal legal documents — they should be one obvious source
//      of truth, version-controlled in the repo, not buried in translation
//      JSON.
//   2. Stripe and US regulators expect English text.
//
// Update LAST_UPDATED whenever you materially change any document; the date
// is shown at the top of every page.
//
// IMPORTANT: this is reasonable boilerplate adapted from common SaaS legal
// patterns. It is NOT a substitute for review by a US-licensed attorney
// before public launch. Recommended services: Termly, iubenda, or a real
// lawyer for the launch version.

export const COMPANY = {
  legalName: "Prime Vector Solutions LLC",
  addressLine1: "30 N Gould St Ste R",
  city: "Sheridan",
  region: "Wyoming",
  postalCode: "82801",
  country: "USA",
  county: "Sheridan County, Wyoming",
  supportEmail: "support@getscreenfree.com",
  privacyEmail: "support@getscreenfree.com",
  refundEmail: "support@getscreenfree.com",
  domain: "getscreenfree.com",
} as const;

export const LAST_UPDATED = "2026-05-04";

export type LegalSection = { heading: string; body: string };
export type LegalDocument = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

// ---------------------------------------------------------------------------
// TERMS OF SERVICE
// ---------------------------------------------------------------------------
export const TERMS: LegalDocument = {
  title: "Terms of Service",
  intro: `These Terms of Service ("Terms") govern your use of ScreenFree, a digital subscription platform operated by ${COMPANY.legalName}, ${COMPANY.addressLine1}, ${COMPANY.city}, ${COMPANY.region} ${COMPANY.postalCode}, ${COMPANY.country} ("we", "us", "our"). By creating an account, subscribing, or making any purchase, you accept these Terms in full.`,
  sections: [
    {
      heading: "1. The Service",
      body: "ScreenFree provides downloadable PDF activity packs designed for parents of children ages 2–4. All content is delivered exclusively in digital form (PDF download) — no physical goods are shipped.",
    },
    {
      heading: "2. Subscription, Pricing, and Billing",
      body: "• Subscriptions renew automatically on a weekly cycle at the price displayed at checkout (currently $2.99/week; we may adjust pricing with 30 days' notice to active subscribers).\n• Payments are processed by Stripe, Inc. We do not store card details on our servers.\n• Each successful weekly invoice unlocks one new pack, in sequence.\n• All amounts are stated in U.S. dollars. Applicable U.S. state sales tax is added at checkout where required.\n• You may cancel at any time from your account dashboard. Cancellation stops future billing immediately; previously paid packs remain in your library.",
    },
    {
      heading: "3. Instant Digital Delivery — Acknowledgment",
      body: "All content is digital and made available immediately upon payment. By completing a purchase, you expressly request immediate delivery and acknowledge that you are receiving access to digital content in lieu of any cooling-off or return period that might otherwise apply to non-digital goods. This acknowledgment applies once any pack has been made available for download.",
    },
    {
      heading: "4. License and Permitted Use",
      body: "We grant you a limited, non-transferable, non-exclusive, revocable license to use the PDF content for personal and household purposes only. You may NOT: redistribute, resell, sublicense, share via file-sharing platforms, post publicly, train AI models on, or otherwise use the content commercially without our prior written consent. Each PDF may carry a watermark and may be tracked for compliance.",
    },
    {
      heading: "5. Account Responsibility",
      body: `You must be at least 18 years old to create an account. ScreenFree is intended for parents and legal guardians, not children. You are responsible for all activity under your account and for keeping your credentials confidential. Notify us immediately at ${COMPANY.supportEmail} of any unauthorized access.`,
    },
    {
      heading: "6. Acceptable Use, Suspension and Termination",
      body: "We may suspend or terminate accounts (without refund) in case of: content piracy, fraudulent chargebacks, attempts to compromise platform security, or other material breach of these Terms.",
    },
    {
      heading: "7. Disclaimer of Warranties — Child Safety",
      body: "Activities described in our packs are educational suggestions only. THE PARENT OR LEGAL GUARDIAN IS SOLELY RESPONSIBLE FOR THE SAFETY OF THE CHILD DURING ANY ACTIVITY, including supervision around small objects, food items, water, and any household materials referenced. Always assess age-appropriateness for your specific child. To the maximum extent permitted by law, the service is provided \"AS IS\" without warranties of any kind, whether express or implied, including merchantability, fitness for a particular purpose, or non-infringement.",
    },
    {
      heading: "8. Limitation of Liability",
      body: "To the maximum extent permitted by law, our total aggregate liability arising out of or relating to the service shall not exceed the greater of (a) the amount you paid us in the 12 months preceding the claim, or (b) USD 50. We are not liable for indirect, incidental, consequential, or punitive damages.",
    },
    {
      heading: "9. Changes to These Terms",
      body: "We may update these Terms periodically. Material changes will be communicated to active users by email at least 14 days before they take effect. Continued use after the effective date constitutes acceptance.",
    },
    {
      heading: "10. Governing Law and Disputes",
      body: `These Terms are governed by the laws of the State of Wyoming, USA, without regard to conflict-of-law principles. Disputes shall be resolved exclusively in the state or federal courts located in ${COMPANY.county}. You agree to waive participation in any class action or class-wide arbitration to the extent permitted by applicable law.`,
    },
    {
      heading: "11. Contact",
      body: `${COMPANY.supportEmail}\n${COMPANY.legalName}\n${COMPANY.addressLine1}\n${COMPANY.city}, ${COMPANY.region} ${COMPANY.postalCode}, ${COMPANY.country}`,
    },
  ],
};

// ---------------------------------------------------------------------------
// PRIVACY POLICY
// ---------------------------------------------------------------------------
export const PRIVACY: LegalDocument = {
  title: "Privacy Policy",
  intro: `This Privacy Policy explains what data ScreenFree collects, why, and how we protect it. The service is operated by ${COMPANY.legalName} ("we", "us"). For privacy questions, contact ${COMPANY.privacyEmail}.`,
  sections: [
    {
      heading: "1. Data We Collect",
      body: "• Account: email, password (hashed via bcrypt), full name (optional).\n• Payment: handled directly by Stripe — we receive only customer ID, subscription status, and amount paid. NO card data is stored on our servers.\n• Usage: pages visited, content unlocked, basic device info, IP address (for fraud prevention).\n• Marketing attribution: UTM parameters and referrer (httpOnly cookie, 30 days).\n• Anonymized analytics: session recordings via Microsoft Clarity (IP and personal text fields are masked by default).",
    },
    {
      heading: "2. How We Use Data",
      body: "• To provide, maintain, and improve the service.\n• To process payments and prevent fraud (Stripe is our processor).\n• To communicate about your account (billing notices, security alerts).\n• To send marketing emails to subscribed users (you can unsubscribe anytime).\n• To comply with legal obligations including U.S. tax and accounting requirements.",
    },
    {
      heading: "3. Third-Party Processors",
      body: "We share data only with processors essential to the service:\n• Stripe, Inc. — payment processing (PCI-DSS Level 1)\n• Supabase — database hosting\n• Railway — application hosting\n• Brevo (Sendinblue) — transactional + marketing email\n• Microsoft Clarity — anonymized session analytics\nAll processors are bound by Data Processing Agreements (DPAs).",
    },
    {
      heading: "4. Sale of Personal Information",
      body: "We do NOT sell personal information as defined under the California Consumer Privacy Act (CCPA) or any equivalent state law. We do not engage in cross-context behavioral advertising that would qualify as a \"sale\" or \"share\" under the CCPA.",
    },
    {
      heading: "5. Your Rights (CCPA / U.S. State Privacy Laws)",
      body: `California residents and residents of states with comparable privacy laws (e.g., Virginia, Colorado, Connecticut, Utah) may: (a) request to know what personal information we hold; (b) request correction of inaccurate information; (c) request deletion of personal information (subject to legal retention requirements); (d) opt out of any sale of personal information (we do not sell). To exercise any right, email ${COMPANY.privacyEmail} from the email address on your account, or use your account dashboard. We respond within 45 days. We will not discriminate against you for exercising any right.`,
    },
    {
      heading: "6. Data Retention",
      body: "• Account data: kept while the account is active; deleted within 30 days of account closure (except records we must keep by law).\n• Billing records: 7 years (U.S. tax law).\n• Marketing consent records: 3 years after unsubscribe.\n• Anonymized analytics: indefinite.",
    },
    {
      heading: "7. Security",
      body: "TLS-encrypted in transit, encrypted at rest, role-restricted database access, periodic security audits, two-factor authentication for admin accounts. We will notify affected users without unreasonable delay following a confirmed data breach affecting their personal information, in accordance with applicable U.S. state notification laws.",
    },
    {
      heading: "8. Children's Privacy",
      body: "ScreenFree is intended for parents and legal guardians, not children. We do not knowingly collect personal information from children under 13 in compliance with the Children's Online Privacy Protection Act (COPPA). If you believe a child has provided personal information, contact us and we will delete it.",
    },
    {
      heading: "9. Cookies",
      body: "Essential cookies (session, language, UTM tracking) are set automatically — these are necessary for the service. Analytics cookies (Microsoft Clarity) are anonymized. We do NOT use third-party advertising cookies without explicit consent.",
    },
    {
      heading: "10. Contact",
      body: `${COMPANY.privacyEmail}\n${COMPANY.legalName}\n${COMPANY.addressLine1}\n${COMPANY.city}, ${COMPANY.region} ${COMPANY.postalCode}, ${COMPANY.country}`,
    },
  ],
};

// ---------------------------------------------------------------------------
// REFUND POLICY
// ---------------------------------------------------------------------------
export const REFUND: LegalDocument = {
  title: "Refund Policy",
  intro:
    "ScreenFree sells digital products that are delivered immediately upon payment. As a result, ALL SALES ARE FINAL. This policy explains the strict no-refund rule and the limited circumstances under which a refund may exceptionally be issued.",
  sections: [
    {
      heading: "1. No-Refund Policy for Digital Goods",
      body: "By completing a purchase you acknowledge and agree that:\n• The content is digital and made available to you immediately;\n• You have expressly requested immediate delivery;\n• You acknowledge that, because the digital content has been made available for download, the purchase is non-refundable.\n\nOnce a pack has been unlocked or made available for download, the corresponding payment is non-refundable.",
    },
    {
      heading: "2. Cancellation ≠ Refund",
      body: "Cancelling your subscription stops FUTURE billing immediately but does not refund prior payments. You can cancel anytime from your account dashboard — no email, justification, or follow-up call required. Already-unlocked packs remain in your library forever.",
    },
    {
      heading: "3. Limited Exceptions Where We Will Refund",
      body: "We will issue a refund only in the following narrowly defined cases:\n(a) Duplicate charge — the same pack billed twice in error.\n(b) Unauthorized transaction — confirmed by your bank or Stripe as fraudulent.\n(c) Technical failure on our side that prevents pack delivery, when our support team has been unable to resolve it within 7 calendar days of report.\n(d) Demonstrable error on our side (wrong price charged, wrong content delivered).\n\nRequests outside these exceptions will be declined.",
    },
    {
      heading: "4. How to Request a Refund",
      body: `Email ${COMPANY.refundEmail} with:\n• Your account email\n• Date and amount of the charge\n• The exception above that applies\n• Supporting documentation (bank statement, screenshot, etc.)\n\nWe respond within 3 business days. Approved refunds are processed back to the original payment method within 5–10 business days.`,
    },
    {
      heading: "5. Chargebacks",
      body: "We strongly prefer to resolve concerns directly. Initiating a chargeback (dispute) with your bank without first contacting us may result in immediate account suspension and forfeit of any access. We are happy to provide your bank with all transaction details, IP logs, and content-delivery proofs upon request.",
    },
    {
      heading: "6. Contact",
      body: `${COMPANY.refundEmail}\n${COMPANY.legalName}\n${COMPANY.addressLine1}\n${COMPANY.city}, ${COMPANY.region} ${COMPANY.postalCode}, ${COMPANY.country}`,
    },
  ],
};
