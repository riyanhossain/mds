import type { ContactSection } from "@/types/sanity";
import React, { useState } from "react";
type Props = ContactSection;
export default function ContactSection({ sectionId, heading, address }: Props) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submittedData, setSubmittedData] = useState<null | {
    name: string;
    email: string;
    telefon: string;
    nachricht: string;
  }>(null);

  // Load from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("contactFormData");
    if (saved) {
      setSubmittedData(JSON.parse(saved));
      setSuccess(true);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const telefon = formData.get("telefon") as string;
    const nachricht = formData.get("nachricht") as string;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, telefon, nachricht }),
      });
      if (res.ok) {
        const data = { name, email, telefon, nachricht };
        setSubmittedData(data);
        localStorage.setItem("contactFormData", JSON.stringify(data));
        setSuccess(true);
        setError(false);
        setIsSending(false);
      } else {
        setError(true);
        setSuccess(false);
        setIsSending(false);
      }
    } catch (err) {
      setError(true);
      setSuccess(false);
      setIsSending(false);
    }
  }
  return (
    <section id={sectionId} className="bg-background">
      <div className="py-[70px] md:py-[120px] main-container">
        {success && submittedData ? (
          <div className="max-w-[818px] mx-auto rounded-[20px] overflow-hidden bg-placeholder py-[60px] px-6 md:px-16 lg:px-20 flex flex-col items-center">
            <h1 className="text-h2-m md:text-h2 text-primary mb-4">
              {heading}
            </h1>
            <div className="text-green-600 text-center font-semibold text-xl mb-4">
              Ihre Nachricht wurde erfolgreich gesendet!
            </div>
            <div className="w-full max-w-md bg-white/90 text-black rounded-xl shadow-lg p-8 mb-2 border border-gray-100">
              <h2 className="text-lg font-bold mb-4 text-green-700 flex items-center gap-2">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                    fill="#22C55E"
                  />
                </svg>
                Übermittelte Daten
              </h2>
              <div className="mb-2 flex items-center">
                <span className="font-semibold w-28">Name:</span>{" "}
                <span className="truncate">{submittedData.name}</span>
              </div>
              <div className="mb-2 flex items-center">
                <span className="font-semibold w-28">E-Mail:</span>{" "}
                <span className="truncate">{submittedData.email}</span>
              </div>
              {submittedData.telefon && (
                <div className="mb-2 flex items-center">
                  <span className="font-semibold w-28">Telefon:</span>{" "}
                  <span className="truncate">{submittedData.telefon}</span>
                </div>
              )}
              <div className="mb-2 flex items-start">
                <span className="font-semibold w-28">Nachricht:</span>{" "}
                <span className="whitespace-pre-line">
                  {submittedData.nachricht}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-[818px] mx-auto rounded-[20px] overflow-hidden bg-placeholder py-[60px] px-6 md:px-16 lg:px-20"
          >
            <div className="flex items-center flex-col sm:flex-row justify-center text-center sm:text-left sm:justify-between gap-2.5">
              <h1 className="text-h2-m md:text-h2 text-primary">{heading}</h1>
              <div className="flex items-center gap-2.5">
                <img
                  src="/icons/location.svg"
                  alt="location icon"
                  className="w-3 h-auto object-contain"
                />
                <span className="text-middle-m md:text-middle">{address}</span>
              </div>
            </div>
            <div className="md:mt-7 md:mb-10 mt-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="input-field sm:col-span-full"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="E-Mail"
                className="input-field"
                required
              />
              <input
                name="telefon"
                type="tel"
                placeholder="Telefon"
                className="input-field"
              />
              <textarea
                name="nachricht"
                placeholder="Nachricht"
                className="input-field resize-none h-[146px] sm:col-span-full"
                required
              ></textarea>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <button type="submit" className="primary-button">
                {isSending ? "Senden..." : "Senden"}
              </button>
              {error && (
                <div className="text-red-600 text-center font-semibold">
                  Fehler beim Senden.
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
