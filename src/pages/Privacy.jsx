import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingObjects from "../components/FloatingObjects";
import BrandCloud from "../components/BrandCloud";
import {
  ChevronDown, Shield, RefreshCw, Database, User, Activity, Globe, Zap,
  Cookie, Share2, Link, Baby, Lock, CheckSquare, MessageSquare, MapPin, Mail, Phone
} from "lucide-react";

// ── Decorative SVGs ──────────────────────────────────────────────────────────
function Paw({ size = 32, color = "#00A9D6", opacity = 0.15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
      <ellipse cx="20" cy="12" rx="7" ry="9" fill={color} />
      <ellipse cx="44" cy="12" rx="7" ry="9" fill={color} />
      <ellipse cx="10" cy="28" rx="6" ry="8" fill={color} />
      <ellipse cx="54" cy="28" rx="6" ry="8" fill={color} />
      <path d="M32 20 C16 20 10 32 12 44 C14 54 22 58 32 58 C42 58 50 54 52 44 C54 32 48 20 32 20 Z" fill={color} />
    </svg>
  );
}

function Bone({ size = 40, color = "#FFCD10", opacity = 0.13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 32" fill="none" style={{ opacity }}>
      <circle cx="12" cy="10" r="8" fill={color} />
      <circle cx="12" cy="22" r="8" fill={color} />
      <circle cx="68" cy="10" r="8" fill={color} />
      <circle cx="68" cy="22" r="8" fill={color} />
      <rect x="16" y="8" width="48" height="16" rx="4" fill={color} />
    </svg>
  );
}

function FloatingDeco({ children, style, delay = 0 }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={style}
      animate={{ y: [0, -8, 0], rotate: [0, 4, -4, 0] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// ── Accordion item ────────────────────────────────────────────────────────────
function AccordionItem({ icon: Icon, iconColor, title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden border border-gray-100"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 bg-white hover:bg-gray-50 transition-colors text-left group"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${iconColor}18` }}
          >
            <Icon className="w-5 h-5" style={{ color: iconColor }} />
          </div>
          <span
            className="text-[#1a1a2e] font-extrabold text-base"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {title}
          </span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 pb-6 pt-2 bg-white text-gray-600 text-sm leading-relaxed space-y-3 border-t border-gray-50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Summary card ─────────────────────────────────────────────────────────────
function SummaryCard({ icon: Icon, color, bg, title, text }) {
  return (
    <motion.div
      className="flex items-start gap-4 rounded-2xl p-5"
      style={{ background: bg, border: `1.5px solid ${color}22` }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color }}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="font-extrabold text-[#1a1a2e] text-sm mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{title}</p>
        <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-pet-pattern relative overflow-hidden pb-0" style={{ minHeight: "300px" }}>
        {/* Floating decos */}
        <FloatingDeco style={{ left: "5%", top: "20%", zIndex: 1 }} delay={0}><Paw size={50} color="#ffffff" opacity={0.2} /></FloatingDeco>
        <FloatingDeco style={{ right: "7%", top: "25%", zIndex: 1 }} delay={1.2}><Bone size={52} color="#ffffff" opacity={0.16} /></FloatingDeco>
        <FloatingDeco style={{ left: "18%", bottom: "22%", zIndex: 1 }} delay={0.7}><Paw size={34} color="#FFCD10" opacity={0.22} /></FloatingDeco>
        <FloatingDeco style={{ right: "20%", bottom: "18%", zIndex: 1 }} delay={1.8}><Bone size={40} color="#FFCD10" opacity={0.18} /></FloatingDeco>

        {/* Brand clouds */}
        <BrandCloud index={1} duration={28} amplitude={9} opacity={0.65} style={{ left: "-20px", top: "8%", width: 160 }} />
        <BrandCloud index={4} duration={23} delay={2.5} amplitude={7} opacity={0.6} style={{ right: "3%", top: "5px", width: 140 }} />

        <div className="max-w-4xl mx-auto px-6 pt-16 pb-20 text-center relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Shield className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-extrabold uppercase tracking-widest" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Last updated: January 1, 2025
            </span>
          </motion.div>

          <motion.h1
            className="font-extrabold text-white leading-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 8vw, 5rem)",
              textShadow: "3px 4px 0px rgba(0,0,0,0.12)",
            }}
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            className="text-white/90 text-lg max-w-xl mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            How Pup O'Clock collects, uses, and protects your information
          </motion.p>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 64" className="w-full" style={{ display: "block" }} preserveAspectRatio="none">
            <path d="M0,45 Q60,10 120,38 Q200,65 280,38 Q360,10 440,38 Q520,65 600,38 Q680,10 760,38 Q840,65 920,38 Q1000,10 1080,38 Q1160,65 1240,38 Q1320,10 1380,38 Q1420,55 1440,42 L1440,64 L0,64 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="relative bg-white pt-4 pb-24 px-6" style={{ marginTop: "-2px" }}>
        {/* Soft background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,169,214,0.05) 0%, transparent 70%)", transform: "translate(-30%, -20%)" }} />
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,205,16,0.05) 0%, transparent 70%)", transform: "translateX(30%)" }} />
        <div className="absolute bottom-0 left-1/4 w-96 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,70,51,0.04) 0%, transparent 70%)", transform: "translateY(30%)" }} />

        {/* Interactive floating objects */}
        <FloatingObjects count={18} />

        <div className="max-w-4xl mx-auto relative z-10">

          {/* ── Intro text ── */}
          <motion.div
            className="mb-10 text-gray-500 text-sm leading-relaxed bg-gray-50 rounded-2xl p-6 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3">
              This Privacy Policy describes how Pup O'Clock (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from <strong>pupoclock.com</strong> or otherwise communicate with us regarding the Site (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.
            </p>
            <p>
              Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access any of the Services.
            </p>
          </motion.div>

          {/* ── Quick Summary ── */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-1 rounded-full bg-[#00A9D6]" />
              <h2 className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#00A9D6]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Quick Summary
              </h2>
            </div>
            <div
              className="rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 8px 40px rgba(0,169,214,0.10)", border: "1.5px solid rgba(0,169,214,0.12)" }}
            >
              <div className="h-1.5 bg-[#FF4633]" />
              <div className="bg-white p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SummaryCard icon={Database} color="#00A9D6" bg="#e8f9ff" title="What we collect" text="Contact, order, account, shopping, support, and usage information." />
                <SummaryCard icon={Zap} color="#FF4633" bg="#fff0f4" title="Why we use it" text="To process orders, improve services, provide support, prevent fraud, and communicate with you." />
                <SummaryCard icon={CheckSquare} color="#FFCD10" bg="#fffce8" title="Your choices" text="You may request access, correction, deletion, portability, or opt out of promotional emails depending on your location." />
                <SummaryCard icon={Mail} color="#00A9D6" bg="#e8f9ff" title="Questions?" text="Contact us at info@pupoclock.com and we'll be happy to help." />
              </div>
            </div>
          </motion.div>

          {/* ── Accordion sections ── */}
          <div className="space-y-3">

            <AccordionItem icon={RefreshCw} iconColor="#00A9D6" title="Changes to This Privacy Policy" defaultOpen={false}>
              <p>We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the "Last updated" date and take any other steps required by applicable law.</p>
            </AccordionItem>

            <AccordionItem icon={Database} iconColor="#00A9D6" title="How We Collect and Use Your Personal Information" defaultOpen={false}>
              <p>The types of personal information we obtain about you depends on how you interact with our Site and use our Services. When we use the term "personal information", we are referring to information that identifies, relates to, describes or can be associated with you. The following sections describe the categories and specific types of personal information we collect.</p>
            </AccordionItem>

            <AccordionItem icon={User} iconColor="#FF4633" title="Information We Collect Directly from You" defaultOpen={false}>
              <p className="mb-3">Information that you directly submit to us through our Services may include:</p>
              <ul className="space-y-2.5 list-none">
                {[
                  ["Contact details", "including your name, address, phone number, and email."],
                  ["Order information", "including your name, billing address, shipping address, payment confirmation, email address, and phone number."],
                  ["Account information", "including your username, password, security questions and other information used for account security purposes."],
                  ["Shopping information", "including the items you view, put in your cart, saved into your account like loyalty points, reviews, referrals or gift cards, or purchases."],
                  ["Customer support information", "including the information you choose to include in communications with us, for example, when sending a message through the Services."],
                ].map(([bold, rest]) => (
                  <li key={bold} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#FF4633] flex-shrink-0" />
                    <span><strong className="text-[#1a1a2e]">{bold}</strong>, {rest}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-gray-400 italic">Some features of the Services may require you to directly provide us with certain information. You may elect not to provide this information, but doing so may prevent you from using or accessing these features.</p>
            </AccordionItem>

            <AccordionItem icon={Activity} iconColor="#FFCD10" title="Information We Collect About Your Usage" defaultOpen={false}>
              <p>We may also automatically collect certain information about your interaction with the Services ("Usage Data"). To do this, we may use cookies, pixels and similar technologies ("Cookies"). Usage Data may include information about how you access and use our Site and your account, including device information, browser information, information about your network connection, your IP address and other information regarding your interaction with the Services.</p>
            </AccordionItem>

            <AccordionItem icon={Globe} iconColor="#00A9D6" title="Information We Obtain from Third Parties" defaultOpen={false}>
              <p className="mb-3">Finally, we may obtain information about you from third parties, including from vendors and service providers who may collect information on our behalf, such as:</p>
              <ul className="space-y-2.5">
                {[
                  "Companies who support our Site and Services, such as Shopify.",
                  "Our payment processors, who collect payment information (e.g., bank account, credit or debit card information, billing address) to process your payment in order to fulfill your orders and provide you with products or services you have requested.",
                  "When you visit our Site, open or click on emails we send you, or interact with our Services or advertisements, we, or third parties we work with, may automatically collect certain information using online tracking technologies such as pixels, web beacons, software developer kits, third-party libraries, and cookies.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 list-none">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#00A9D6] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">Any information we obtain from third parties will be treated in accordance with this Privacy Policy.</p>
            </AccordionItem>

            <AccordionItem icon={Zap} iconColor="#FF4633" title="How We Use Your Personal Information" defaultOpen={false}>
              {[
                {
                  title: "Providing Products and Services",
                  color: "#00A9D6",
                  bg: "#e8f9ff",
                  text: "We use your personal information to provide you with the Services in order to perform our contract with you, including to process your payments, fulfill your orders, send notifications related to your account, purchases, returns, and exchanges, create and maintain your account, arrange for shipping, and facilitate returns and exchanges."
                },
                {
                  title: "Marketing and Advertising",
                  color: "#FF4633",
                  bg: "#fff0f4",
                  text: "We may use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you advertisements for products or services."
                },
                {
                  title: "Security and Fraud Prevention",
                  color: "#FFCD10",
                  bg: "#fffce8",
                  text: "We use your personal information to detect, investigate or take action regarding possible fraudulent, illegal or malicious activity. If you believe your account has been compromised, please contact us immediately."
                },
                {
                  title: "Communicating with You & Service Improvement",
                  color: "#00A9D6",
                  bg: "#e8f9ff",
                  text: "We use your personal information to provide you with customer support and improve our Services. This is in our legitimate interests in order to be responsive to you and to maintain our business relationship with you."
                },
              ].map(({ title, color, bg, text }) => (
                <div key={title} className="rounded-xl p-4 mb-2" style={{ background: bg, border: `1px solid ${color}22` }}>
                  <p className="font-extrabold text-[#1a1a2e] text-sm mb-1" style={{ fontFamily: "'Poppins', sans-serif", color }}>{title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </AccordionItem>

            <AccordionItem icon={Cookie} iconColor="#FFCD10" title="Cookies" defaultOpen={false}>
              <p className="mb-3">Like many websites, we use Cookies on our Site. For specific information about the Cookies we use related to powering our store with Shopify, see <a href="https://www.shopify.com/legal/cookies" target="_blank" rel="noreferrer" className="text-[#00A9D6] underline">shopify.com/legal/cookies</a>. We use Cookies to power and improve our Site and Services, to run analytics, and to better understand user interaction with the Services.</p>
              <p className="mb-3">Most browsers automatically accept Cookies by default, but you can choose to set your browser to remove or reject Cookies through your browser controls. Please keep in mind that removing or blocking Cookies can negatively impact your user experience and may cause some of the Services to work incorrectly or no longer be available.</p>
              <p>Please note that while your browser may allow you to transmit a "do not track" signal, our Site is not designed to respond to such signals. To learn more, visit <a href="http://www.allaboutdnt.com/" target="_blank" rel="noreferrer" className="text-[#00A9D6] underline">allaboutdnt.com</a>.</p>
            </AccordionItem>

            <AccordionItem icon={Share2} iconColor="#00A9D6" title="How We Disclose Personal Information" defaultOpen={false}>
              <p className="mb-3">In certain circumstances, we may disclose your personal information to third parties, including:</p>
              <ul className="space-y-2.5">
                {[
                  "With vendors or other third parties who perform services on our behalf (e.g., IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).",
                  "With business and marketing partners to provide services and advertise to you. Our business and marketing partners will use your information in accordance with their own privacy notices.",
                  "When you direct, request us or otherwise consent to our disclosure of certain information to third parties.",
                  "With our affiliates or otherwise within our corporate group, in our legitimate interests to run a successful business.",
                  "In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations, to enforce any applicable terms of service, and to protect or defend the Services and the rights of our users.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 list-none">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#00A9D6] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-4 rounded-xl bg-[#e8f9ff] border border-[#00A9D6]/20 text-xs text-gray-500">
                <strong className="text-[#00A9D6]">Note:</strong> We do not use or disclose sensitive personal information without your consent or for the purposes of inferring characteristics about you.
              </div>
              <p className="mt-3 text-xs">Categories of information disclosed include: Identifiers, personal information, commercial information, internet/network activity, and geolocation data. Recipients include vendors, business & marketing partners, and affiliates.</p>
            </AccordionItem>

            <AccordionItem icon={Link} iconColor="#00A9D6" title="Third Party Websites and Links" defaultOpen={false}>
              <p>Our Site may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites.</p>
              <p className="mt-3">Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators, except as disclosed on the Services.</p>
            </AccordionItem>

            <AccordionItem icon={Baby} iconColor="#FF4633" title="Children's Data" defaultOpen={false}>
              <p className="mb-3">While the products we sell are engaged by children, the Services are not intended to be used by children, and we do not knowingly collect any personal information from children. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted.</p>
              <p>As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we "share" or "sell" (as those terms are defined in applicable law) personal information of individuals under 16 years of age.</p>
            </AccordionItem>

            <AccordionItem icon={Lock} iconColor="#00A9D6" title="Security and Retention of Your Information" defaultOpen={false}>
              <p className="mb-3">Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee "perfect security." In addition, any information you send to us may not be secure while in transit. We recommend that you do not use insecure channels to communicate sensitive or confidential information to us.</p>
              <p>How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide the Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.</p>
            </AccordionItem>

            <AccordionItem icon={CheckSquare} iconColor="#FFCD10" title="Your Rights" defaultOpen={false}>
              <p className="mb-4">Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. These rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  ["Right to Access / Know", "Request access to personal information we hold about you, including how we use and share it.", "#00A9D6", "#e8f9ff"],
                  ["Right to Delete", "Request that we delete personal information we maintain about you.", "#FF4633", "#fff0f4"],
                  ["Right to Correct", "Request that we correct inaccurate personal information we maintain about you.", "#FFCD10", "#fffce8"],
                  ["Right of Portability", "Receive a copy of your personal information and request transfer to a third party, in certain circumstances.", "#00A9D6", "#e8f9ff"],
                  ["Restriction of Processing", "Ask us to stop or restrict our processing of personal information.", "#00A9D6", "#e8f9ff"],
                  ["Withdrawal of Consent", "Where we rely on consent to process your personal information, you may withdraw this consent.", "#FF4633", "#fff0f4"],
                  ["Appeal", "Appeal our decision if we decline to process your request by replying directly to our denial.", "#FFCD10", "#fffce8"],
                  ["Managing Communication Preferences", "Opt out of promotional emails at any time using the unsubscribe option in our emails.", "#00A9D6", "#e8f9ff"],
                ].map(([title, desc, color, bg]) => (
                  <div key={title} className="rounded-xl p-3.5" style={{ background: bg, border: `1px solid ${color}20` }}>
                    <p className="font-extrabold text-xs mb-1" style={{ fontFamily: "'Poppins', sans-serif", color }}>{title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-gray-400">You may exercise any of these rights where indicated on our Site or by contacting us. We will not discriminate against you for exercising any of these rights.</p>
            </AccordionItem>

            <AccordionItem icon={MessageSquare} iconColor="#FF4633" title="Complaints" defaultOpen={false}>
              <p>If you have complaints about how we process your personal information, please contact us using the contact details provided below. If you are not satisfied with our response to your complaint, depending on where you live you may have the right to appeal our decision by contacting us, or lodge your complaint with your local data protection authority.</p>
            </AccordionItem>

            <AccordionItem icon={MapPin} iconColor="#00A9D6" title="International Users" defaultOpen={false}>
              <p className="mb-3">Please note that we may transfer, store and process your personal information outside the country you live in. Your personal information is also processed by staff and third-party service providers and partners in these countries.</p>
              <p>If we transfer your personal information out of Europe, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection.</p>
            </AccordionItem>

          </div>

          {/* ── Contact card ── */}
          <motion.div
            className="mt-14 rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 20px 60px rgba(0,169,214,0.12), 0 6px 20px rgba(0,0,0,0.07)", border: "1.5px solid rgba(0,169,214,0.14)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-1.5 bg-[#FF4633]" />
            <div className="bg-white p-8 md:p-10">
              <div className="flex items-center gap-3 mb-2">
                <Paw size={28} color="#00A9D6" opacity={0.6} />
                <h3 className="font-extrabold text-[#1a1a2e] text-xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Contact Us
                </h3>
              </div>
              <p className="text-gray-400 text-sm mb-7 leading-relaxed">
                Questions about your privacy? We're here to help. Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please reach out:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="mailto:info@pupoclock.com"
                  className="flex items-start gap-4 bg-[#e8f9ff] rounded-2xl p-5 border border-[#00A9D6]/20 hover:shadow-md transition-shadow group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#00A9D6] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-[#00A9D6] mb-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Email</p>
                    <p className="text-gray-700 text-sm font-semibold">info@pupoclock.com</p>
                  </div>
                </a>
                <div className="flex items-start gap-4 bg-[#fff0f4] rounded-2xl p-5 border border-[#FF4633]/20">
                  <div className="w-10 h-10 rounded-xl bg-[#FF4633] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-[#FF4633] mb-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>Address</p>
                    <p className="text-gray-700 text-sm font-semibold leading-snug">170 E Station Square Drive, Apt 477<br />Pittsburgh, PA 17033, US</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      <div className="w-full overflow-hidden bg-pet-pattern" style={{ marginBottom: "-2px", display: "block", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 64" className="w-full" style={{ display: "block", marginTop: "-2px" }} preserveAspectRatio="none">
          <path d="M0,0 L0,40 C240,64 480,64 720,36 C960,8 1200,8 1440,40 L1440,0 Z" fill="white" />
        </svg>
      </div>
      <Footer />
    </div>
  );
}