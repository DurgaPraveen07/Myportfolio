"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { personalInfo } from "@/data/portfolio";

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    captchaAnswer: "",
  });
  const [captchaChallenge, setCaptchaChallenge] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    generateCaptcha();
    return () => observer.disconnect();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 8) + 2;
    const num2 = Math.floor(Math.random() * 8) + 2;
    setCaptchaChallenge(`${num1} + ${num2}`);
    setForm((prev) => ({ ...prev, captchaAnswer: "" }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!form.name.trim()) {
      errors.name = "Full name is required";
    } else if (form.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    if (form.phone.trim()) {
      if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone.trim())) {
        errors.phone = "Please enter a valid phone number";
      }
    }

    if (!form.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (form.subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters";
    }

    if (!form.message.trim()) {
      errors.message = "Message content is required";
    } else if (form.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    if (!form.captchaAnswer.trim()) {
      errors.captchaAnswer = "Spam check solution is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validate()) return;

    setStatus("sending");

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          captchaChallenge,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to deliver message.");
      }

      setStatus("sent");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        captchaAnswer: "",
      });
      generateCaptcha();
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred.");
      generateCaptcha();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const contactItems = [
    {
      icon: "✉️",
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/chennuboyina-durga-praveen",
      href: personalInfo.linkedin,
    },
    {
      icon: "📸",
      label: "Instagram",
      value: "instagram.com/irisarc.studio",
      href: personalInfo.instagram,
    },
    { icon: "📍", label: "Location", value: personalInfo.location, href: null },
  ];

  const inputStyle = (hasError: boolean) => ({
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255, 255, 255, 0.02)",
    border: hasError
      ? "1px solid rgba(239, 68, 68, 0.5)"
      : "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    color: "#e4e1e9",
    fontSize: 15,
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxSizing: "border-box" as const,
  });

  return (
    <section
      ref={ref}
      id="contact"
      className="section bg-grid"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Glow Blobs */}
      <div
        className="blob"
        style={{
          width: 500,
          height: 500,
          background: "rgba(108,99,255,0.06)",
          bottom: "-100px",
          left: "-100px",
        }}
      />
      <div
        className="blob"
        style={{
          width: 400,
          height: 400,
          background: "rgba(0,212,255,0.05)",
          top: "10%",
          right: "-50px",
        }}
      />

      <div className="container">
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 80,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            Get in touch
          </div>
          <h2 className="section-title">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Have an idea or project? Let&apos;s build something amazing together.
            Your message will be sent instantly to my inbox and WhatsApp.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: 48,
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left Column — Contact Info */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.7s ease 0.1s",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* Availability Widget */}
            <div
              className="glass-card"
              style={{
                padding: 24,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div className="status-dot" />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 15, color: "#e4e1e9" }}>
                  Available for Projects
                </p>
                <p style={{ color: "#4ade80", fontSize: 13, marginTop: 2 }}>
                  Open to exciting new opportunities
                </p>
              </div>
            </div>

            {/* Quick Contacts */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="glass-card"
                  style={{ padding: "20px 24px" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "rgba(108,99,255,0.08)",
                        border: "1px solid rgba(108,99,255,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 11,
                          fontFamily: "'JetBrains Mono', monospace",
                          color: "#918fa1",
                          marginBottom: 3,
                          letterSpacing: "0.08em",
                        }}
                      >
                        {item.label.toUpperCase()}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#c4c0ff",
                            fontSize: 14,
                            fontWeight: 500,
                            textDecoration: "none",
                            transition: "color 0.3s",
                          }}
                          onMouseEnter={(e) =>
                            ((e.target as HTMLAnchorElement).style.color =
                              "#00D4FF")
                          }
                          onMouseLeave={(e) =>
                            ((e.target as HTMLAnchorElement).style.color =
                              "#c4c0ff")
                          }
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span style={{ color: "#c7c4d8", fontSize: 14 }}>
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Contact Form */}
          <div
            className="glass-card"
            style={{
              padding: 40,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.7s ease 0.2s",
              position: "relative",
            }}
          >
            {status === "sent" ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 24px",
                }}
              >
                <div
                  style={{
                    fontSize: 64,
                    marginBottom: 20,
                    animation: "scaleIn 0.5s ease forwards",
                  }}
                >
                  🚀
                </div>
                <h4
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    marginBottom: 10,
                    color: "#00D4FF",
                  }}
                >
                  Message Delivered!
                </h4>
                <p style={{ color: "#c7c4d8", fontSize: 15, lineHeight: 1.6 }}>
                  Thank you! The message was transmitted to my email and
                  WhatsApp. I will get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-outline"
                  style={{ marginTop: 28 }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    marginBottom: 24,
                    color: "#e4e1e9",
                  }}
                >
                  Send Message
                </h3>

                {status === "error" && (
                  <div
                    style={{
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.25)",
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 24,
                      color: "#f87171",
                      fontSize: 14,
                    }}
                  >
                    ⚠️ {errorMessage}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  {/* Name and Email side-by-side */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                    className="contact-grid"
                  >
                    <div>
                      <label
                        style={{
                          fontSize: 11,
                          color: "#918fa1",
                          fontFamily: "'JetBrains Mono', monospace",
                          letterSpacing: "0.08em",
                          display: "block",
                          marginBottom: 8,
                        }}
                      >
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        style={inputStyle(!!fieldErrors.name)}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderColor =
                            "rgba(108,99,255,0.6)";
                          (e.target as HTMLInputElement).style.boxShadow =
                            "0 0 20px rgba(108,99,255,0.15)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderColor =
                            fieldErrors.name
                              ? "rgba(239,68,68,0.5)"
                              : "rgba(255,255,255,0.08)";
                          (e.target as HTMLInputElement).style.boxShadow =
                            "none";
                        }}
                      />
                      {fieldErrors.name && (
                        <p
                          style={{
                            color: "#ef4444",
                            fontSize: 12,
                            marginTop: 6,
                          }}
                        >
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        style={{
                          fontSize: 11,
                          color: "#918fa1",
                          fontFamily: "'JetBrains Mono', monospace",
                          letterSpacing: "0.08em",
                          display: "block",
                          marginBottom: 8,
                        }}
                      >
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="text"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        style={inputStyle(!!fieldErrors.email)}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderColor =
                            "rgba(108,99,255,0.6)";
                          (e.target as HTMLInputElement).style.boxShadow =
                            "0 0 20px rgba(108,99,255,0.15)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderColor =
                            fieldErrors.email
                              ? "rgba(239,68,68,0.5)"
                              : "rgba(255,255,255,0.08)";
                          (e.target as HTMLInputElement).style.boxShadow =
                            "none";
                        }}
                      />
                      {fieldErrors.email && (
                        <p
                          style={{
                            color: "#ef4444",
                            fontSize: 12,
                            marginTop: 6,
                          }}
                        >
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone (Optional) and Subject */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                    className="contact-grid"
                  >
                    <div>
                      <label
                        style={{
                          fontSize: 11,
                          color: "#918fa1",
                          fontFamily: "'JetBrains Mono', monospace",
                          letterSpacing: "0.08em",
                          display: "block",
                          marginBottom: 8,
                        }}
                      >
                        PHONE NUMBER (OPTIONAL)
                      </label>
                      <input
                        type="text"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        style={inputStyle(!!fieldErrors.phone)}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderColor =
                            "rgba(108,99,255,0.6)";
                          (e.target as HTMLInputElement).style.boxShadow =
                            "0 0 20px rgba(108,99,255,0.15)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderColor =
                            fieldErrors.phone
                              ? "rgba(239,68,68,0.5)"
                              : "rgba(255,255,255,0.08)";
                          (e.target as HTMLInputElement).style.boxShadow =
                            "none";
                        }}
                      />
                      {fieldErrors.phone && (
                        <p
                          style={{
                            color: "#ef4444",
                            fontSize: 12,
                            marginTop: 6,
                          }}
                        >
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        style={{
                          fontSize: 11,
                          color: "#918fa1",
                          fontFamily: "'JetBrains Mono', monospace",
                          letterSpacing: "0.08em",
                          display: "block",
                          marginBottom: 8,
                        }}
                      >
                        SUBJECT *
                      </label>
                      <input
                        type="text"
                        placeholder="Project Inquiry"
                        value={form.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        style={inputStyle(!!fieldErrors.subject)}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderColor =
                            "rgba(108,99,255,0.6)";
                          (e.target as HTMLInputElement).style.boxShadow =
                            "0 0 20px rgba(108,99,255,0.15)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderColor =
                            fieldErrors.subject
                              ? "rgba(239,68,68,0.5)"
                              : "rgba(255,255,255,0.08)";
                          (e.target as HTMLInputElement).style.boxShadow =
                            "none";
                        }}
                      />
                      {fieldErrors.subject && (
                        <p
                          style={{
                            color: "#ef4444",
                            fontSize: 12,
                            marginTop: 6,
                          }}
                        >
                          {fieldErrors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      style={{
                        fontSize: 11,
                        color: "#918fa1",
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: "0.08em",
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      MESSAGE *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project, timing, and requirements..."
                      value={form.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      style={{
                        ...inputStyle(!!fieldErrors.message),
                        resize: "vertical",
                        minHeight: 120,
                      }}
                      onFocus={(e) => {
                        (e.target as HTMLTextAreaElement).style.borderColor =
                          "rgba(108,99,255,0.6)";
                        (e.target as HTMLTextAreaElement).style.boxShadow =
                          "0 0 20px rgba(108,99,255,0.15)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLTextAreaElement).style.borderColor =
                          fieldErrors.message
                            ? "rgba(239,68,68,0.5)"
                            : "rgba(255,255,255,0.08)";
                        (e.target as HTMLTextAreaElement).style.boxShadow =
                          "none";
                      }}
                    />
                    {fieldErrors.message && (
                      <p
                        style={{ color: "#ef4444", fontSize: 12, marginTop: 6 }}
                      >
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Anti-spam math captcha */}
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.01)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      borderRadius: 12,
                      padding: 16,
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: "#918fa1",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        SPAM PROTECTION: Solve this equation *
                      </span>
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#8B5CF6",
                          cursor: "pointer",
                          fontSize: 12,
                        }}
                        title="Refresh Captcha"
                      >
                        🔄 Refresh
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                      }}
                    >
                      <div
                        style={{
                          background: "rgba(108,99,255,0.1)",
                          border: "1px solid rgba(108,99,255,0.25)",
                          borderRadius: 8,
                          padding: "10px 16px",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "#00D4FF",
                          letterSpacing: 2,
                          minWidth: 100,
                          textAlign: "center",
                        }}
                      >
                        {captchaChallenge} = ?
                      </div>
                      <div style={{ flex: 1 }}>
                        <input
                          type="text"
                          placeholder="Your answer"
                          value={form.captchaAnswer}
                          onChange={(e) =>
                            handleInputChange("captchaAnswer", e.target.value)
                          }
                          style={inputStyle(!!fieldErrors.captchaAnswer)}
                        />
                      </div>
                    </div>
                    {fieldErrors.captchaAnswer && (
                      <p style={{ color: "#ef4444", fontSize: 12 }}>
                        {fieldErrors.captchaAnswer}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      opacity: status === "sending" ? 0.7 : 1,
                      cursor: status === "sending" ? "not-allowed" : "pointer",
                      padding: "16px 32px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <span>
                      {status === "sending" ? "TRANSMITTING..." : "SEND MESSAGE"}
                    </span>
                    <span style={{ position: "relative", zIndex: 1 }}>
                      {status === "sending" ? "⏳" : "→"}
                    </span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
