import type { ContactSection } from "sanity.types";
type Props = {
  contactSection: ContactSection;
};
export default function ContactSection({ contactSection }: Props) {
  return (
    <section id={contactSection.sectionId} className="bg-background">
      <div className="py-[70px] md:py-[120px] main-container">
        <form className="max-w-[818px] mx-auto rounded-[20px] overflow-hidden bg-placeholder py-[60px] px-6 md:px-16 lg:px-20">
          <div className="flex items-center flex-col sm:flex-row justify-center text-center sm:text-left sm:justify-between gap-2.5">
            <h1 className="text-h2-m md:text-h2 text-primary">
              {contactSection.heading}
            </h1>
            <div className="flex items-center gap-2.5">
              <img
                src="/icons/location.svg"
                alt="location icon"
                className="w-3 h-auto object-contain"
              />
              <span className="text-middle-m md:text-middle">
                {contactSection.address}
              </span>
            </div>
          </div>
          <div className="md:mt-7 md:mb-10 mt-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <input
              name="vorname"
              type="text"
              placeholder="Vorname"
              className="input-field"
              required
            />
            <input
              name="nachname"
              type="text"
              placeholder="Nachname"
              className="input-field"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="E-Mail"
              className="input-field sm:col-span-full"
              required
            />
            <textarea
              name="nachricht"
              placeholder="Nachricht"
              className="input-field resize-none h-[146px] sm:col-span-full"
              required
            ></textarea>
          </div>
          <button type="submit" className="primary-button">
            Senden
          </button>
        </form>
      </div>
    </section>
  );
}
