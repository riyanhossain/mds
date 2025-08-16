import type { ContactSection } from "@/types/sanity";
import { useState, useRef } from "react";
type Props = ContactSection;
export default function ContactSection({ sectionId, heading, address }: Props) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
        setSuccess(true);
        setError(false);
        form.reset();
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(true);
        setSuccess(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setError(false), 5000);
      }
    } catch (err) {
      setError(true);
      setSuccess(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setError(false), 5000);
    }
  }
  return (
    <section id={sectionId} className="bg-background">
      <div className="py-[70px] md:py-[120px] main-container">
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
              Senden
            </button>
            {success && (
              <div className="mt-4 text-green-600 text-center font-semibold">
                Nachricht gesendet!
              </div>
            )}
            {error && (
              <div className="mt-4 text-red-600 text-center font-semibold">
                Fehler beim Senden.
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
