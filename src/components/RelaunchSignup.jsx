import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Check, Mail } from "lucide-react";
import { RELAUNCH, NOTIFY_FORM_NAME, SIGNUP_ANCHOR } from "../content/relaunch";

/**
 * November relaunch announcement and email capture.
 *
 * Lives at the bottom of the Subscriptions page, and is the target of every
 * CTA that used to point at Shopify checkout while sales are paused (the hero
 * button and the plan cards).
 *
 * Delivery is Netlify Forms, the same mechanism as the contact form: the form is
 * registered statically in index.html (hidden) so Netlify detects it at deploy
 * time, and this component POSTs to "/" with a matching `form-name`. See
 * docs/contact-form-setup.md.
 */
export default function RelaunchSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focused, setFocused] = useState(false);
  const done = status === "success";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending" || done) return;
    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": NOTIFY_FORM_NAME,
          email,
        }).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id={SIGNUP_ANCHOR} className="w-full bg-pet-pattern py-14 md:py-20 px-5 md:px-6">
      <motion.div
        className="max-w-3xl mx-auto rounded-3xl bg-white overflow-hidden"
        style={{ boxShadow: "0 24px 70px rgba(0,0,0,0.22)" }}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Brand accent bar */}
        <div className="flex h-2">
          <div className="flex-1" style={{ background: "#00A9D6" }} />
          <div className="flex-1" style={{ background: "#FFCD10" }} />
          <div className="flex-1" style={{ background: "#FF4633" }} />
        </div>

        <div className="px-6 md:px-12 py-10 md:py-12 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
            style={{ background: "rgba(0,169,214,0.12)" }}
          >
            <Bell className="w-4 h-4" style={{ color: "#00A9D6" }} />
            <span
              className="text-xs font-extrabold uppercase tracking-[0.18em]"
              style={{ fontFamily: "'Poppins', sans-serif", color: "#00A9D6" }}
            >
              {RELAUNCH.kicker}
            </span>
          </div>

          <h2
            className="font-extrabold text-[#1a1a2e] leading-tight mb-5"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 5vw, 2.9rem)" }}
          >
            {RELAUNCH.headline}
          </h2>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-9">
            {RELAUNCH.body}
          </p>

          {done ? (
            <motion.div
              className="flex flex-col items-center gap-3 py-4"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "#00A9D6" }}
              >
                <Check className="w-7 h-7 text-white" />
              </div>
              <p
                className="font-extrabold text-[#1a1a2e] text-lg"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {RELAUNCH.success}
              </p>
            </motion.div>
          ) : (
            <>
              <p
                className="text-xs font-extrabold uppercase tracking-[0.16em] text-gray-400 mb-3"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {RELAUNCH.formLabel}
              </p>

              <form
                name={NOTIFY_FORM_NAME}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
              >
                {/* Netlify honeypot */}
                <p className="hidden">
                  <label>
                    Don&apos;t fill this out:{" "}
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <label htmlFor="notify-email" className="sr-only">
                  Email address
                </label>
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    id="notify-email"
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={RELAUNCH.placeholder}
                    className="w-full pl-11 pr-4 py-4 rounded-full border-2 bg-gray-50 text-gray-700 text-sm font-bold placeholder-gray-300 focus:outline-none focus:bg-white transition-all duration-300"
                    style={
                      focused
                        ? { borderColor: "#00A9D6", background: "#fff", boxShadow: "0 0 0 4px rgba(0,169,214,0.12)" }
                        : { borderColor: "#f0f0f0" }
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-yellow btn-press text-[#1a1a2e] font-bold uppercase text-sm px-9 py-4 rounded-full whitespace-nowrap disabled:opacity-70"
                  style={{ boxShadow: "0 8px 28px rgba(255,205,16,0.45)" }}
                >
                  {status === "sending" ? RELAUNCH.ctaSending : RELAUNCH.cta}
                </button>
              </form>

              <p className="text-xs text-gray-400 mt-4">{RELAUNCH.formHint}</p>

              <p aria-live="polite" className="sr-only">
                {status === "sending" ? RELAUNCH.ctaSending : ""}
              </p>

              {status === "error" && (
                <p className="text-sm font-bold mt-4" style={{ color: "#FF4633" }}>
                  {RELAUNCH.error}
                </p>
              )}
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
