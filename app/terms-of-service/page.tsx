import { LegalPage } from "@/components/legal/legal-page";

export default function TermsOfServicePage() {
  return (
    <LegalPage
      file="terms-of-service.txt"
      eyebrow="$ cat terms-of-service.txt"
      title={<>TERMS OF <span className="text-gradient">SERVICE</span></>}
      updated="August 1, 2026"
      sections={[
        {
          heading: "Acceptance of terms",
          body: (
            <p>
              By creating an account, installing the app, or adding the browser extension, you agree to be bound by
              these Terms of Service and our Privacy Policy. If you do not agree, do not use Ghost VPN.
            </p>
          ),
        },
        {
          heading: "The service",
          body: (
            <p>
              Ghost VPN provides encrypted VPN access, DNS leak protection, an ad and tracker blocker, and a browser
              extension. Server availability, feature access, and device limits vary by plan (Normal, Premium, or
              Ghost) as described on our pricing page at the time of purchase.
            </p>
          ),
        },
        {
          heading: "Acceptable use",
          body: (
            <>
              <p>You may not use Ghost VPN to:</p>
              <ul className="list-none space-y-1.5 pl-1">
                <li><span className="text-[#a855f7]">→</span> Engage in illegal activity, fraud, or distribution of malware.</li>
                <li><span className="text-[#a855f7]">→</span> Attack, disrupt, or gain unauthorized access to any network or system.</li>
                <li><span className="text-[#a855f7]">→</span> Send spam or unsolicited bulk communications.</li>
                <li><span className="text-[#a855f7]">→</span> Resell or sublicense the service without written permission.</li>
              </ul>
              <p>Violation of this policy may result in immediate suspension without refund.</p>
            </>
          ),
        },
        {
          heading: "Account responsibilities",
          body: (
            <p>
              You are responsible for maintaining the confidentiality of your login credentials and for all activity
              under your account. Notify us immediately at <span className="text-[#a855f7]">security@ghostvpn.com</span>{" "}
              if you suspect unauthorized access.
            </p>
          ),
        },
        {
          heading: "Service availability",
          body: (
            <p>
              We target 99.9% network uptime but do not guarantee uninterrupted, error-free service. Scheduled
              maintenance, force majeure events, and upstream provider outages are outside our control and are not
              grounds for a service-level refund beyond our standard{" "}
              <span className="text-[#a855f7]">30-day money-back guarantee</span>.
            </p>
          ),
        },
        {
          heading: "Limitation of liability",
          body: (
            <p>
              Ghost VPN is provided &quot;as is.&quot; To the maximum extent permitted by law, we are not liable for
              indirect, incidental, or consequential damages arising from your use of, or inability to use, the
              service.
            </p>
          ),
        },
        {
          heading: "Termination",
          body: (
            <p>
              You may cancel your subscription at any time from your dashboard. We may suspend or terminate accounts
              that violate these terms, with or without notice, at our discretion.
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of the Netherlands, without regard to conflict-of-law principles,
              unless otherwise required by your local consumer protection law.
            </p>
          ),
        },
      ]}
    />
  );
}
