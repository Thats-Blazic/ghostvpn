import { LegalPage } from "@/components/legal/legal-page";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      file="privacy-policy.txt"
      eyebrow="$ cat privacy-policy.txt"
      title={<>PRIVACY <span className="text-gradient">POLICY</span></>}
      updated="August 1, 2026"
      sections={[
        {
          heading: "No-logs, by design",
          body: (
            <p>
              Ghost VPN does not record your browsing history, connection timestamps, session duration, IP address,
              DNS queries, or bandwidth usage tied to your identity. Our servers run entirely in RAM and are wiped on
              every reboot — there is nothing to hand over, subpoena, or leak, because nothing is written to disk in
              the first place. Our no-logs policy is independently audited every year and the reports are published
              in full.
            </p>
          ),
        },
        {
          heading: "What we do collect",
          body: (
            <>
              <p>To operate and bill for the service, we collect a minimal set of account data:</p>
              <ul className="list-none space-y-1.5 pl-1">
                <li><span className="text-[#a855f7]">→</span> Email address, used for login and account recovery.</li>
                <li><span className="text-[#a855f7]">→</span> Billing information, processed by our payment partners — we never store full card numbers on our servers.</li>
                <li><span className="text-[#a855f7]">→</span> Aggregate, anonymized server load metrics (never tied to an individual user) used to keep the network fast.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Data retention",
          body: (
            <p>
              Account data is retained for as long as your account is active. If you delete your account, associated
              billing and email data is permanently removed from our systems within 30 days, except where we are
              legally required to retain limited records (e.g. tax law).
            </p>
          ),
        },
        {
          heading: "Third-party sharing",
          body: (
            <p>
              We do not sell, rent, or share your personal data with advertisers or data brokers. Limited data is
              shared with payment processors solely to complete transactions, and with infrastructure providers
              solely to operate the VPN network — none of them have access to your browsing activity.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              Depending on your jurisdiction (including GDPR and CCPA), you may request access to, correction of, or
              deletion of your personal data at any time from your account dashboard, or by contacting
              {" "}<span className="text-[#a855f7]">privacy@ghostvpn.com</span>.
            </p>
          ),
        },
        {
          heading: "Changes to this policy",
          body: (
            <p>
              We&apos;ll post any material changes to this page and update the &quot;last updated&quot; date above. Continued
              use of Ghost VPN after changes take effect constitutes acceptance of the revised policy.
            </p>
          ),
        },
      ]}
    />
  );
}
