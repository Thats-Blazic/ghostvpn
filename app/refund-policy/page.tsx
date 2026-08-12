import { LegalPage } from "@/components/legal/legal-page";

export default function RefundPolicyPage() {
  return (
    <LegalPage
      file="refund-policy.txt"
      eyebrow="$ cat refund-policy.txt"
      title={<>REFUND <span className="text-gradient">POLICY</span></>}
      updated="August 1, 2026"
      sections={[
        {
          heading: "30-day money-back guarantee",
          body: (
            <p>
              Every plan — Normal, Premium, and Ghost — is covered by a full 30-day money-back guarantee. If Ghost
              VPN isn&apos;t right for you, request a full refund within 30 days of your original purchase, no
              questions asked.
            </p>
          ),
        },
        {
          heading: "Eligibility",
          body: (
            <>
              <p>You&apos;re eligible for a full refund if:</p>
              <ul className="list-none space-y-1.5 pl-1">
                <li><span className="text-[#39ff88]">[OK]</span> Your request is made within 30 days of the original charge.</li>
                <li><span className="text-[#39ff88]">[OK]</span> The subscription was purchased directly through ghostvpn.com.</li>
                <li><span className="text-[#39ff88]">[OK]</span> The account has not violated our Terms of Service.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "How to request a refund",
          body: (
            <p>
              From your dashboard, go to <span className="text-[#a855f7]">billing → cancel subscription</span> and
              select &quot;request refund,&quot; or email{" "}
              <span className="text-[#a855f7]">billing@ghostvpn.com</span> with your account email and order date.
              Refunds are processed back to the original payment method.
            </p>
          ),
        },
        {
          heading: "Processing time",
          body: (
            <p>
              Card refunds are issued within 5–10 business days, depending on your bank. Cryptocurrency payments are
              refunded in the equivalent USD value at the time of the refund, sent to a wallet address you provide,
              typically within 48 hours.
            </p>
          ),
        },
        {
          heading: "Renewals",
          body: (
            <p>
              Subscription renewals after the initial 30-day window are non-refundable, but you can cancel anytime to
              stop future billing — your access continues until the end of the current billing period.
            </p>
          ),
        },
        {
          heading: "Exceptions",
          body: (
            <p>
              Dedicated IP add-ons and one-time setup services are non-refundable once provisioned. Accounts
              terminated for violating our Acceptable Use Policy are not eligible for a refund.
            </p>
          ),
        },
      ]}
    />
  );
}
