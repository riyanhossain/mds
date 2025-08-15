import type { APIRoute } from "astro";
import Airtable from "airtable";

const base = new Airtable({ apiKey: import.meta.env.AIRTABLE_TOKEN! }).base(
  "appEKkIEy7F3GxUhg"
);

async function sendContactToAirtable({
  name,
  telefon,
  email,
  nachricht,
}: {
  name: string;
  telefon?: string;
  email: string;
  nachricht: string;
}) {
  return new Promise((resolve, reject) => {
    base("Kontaktanfragen").create(
      [
        {
          fields: {
            Name: name,
            Telefon: telefon || "",
            "E-Mail": email,
            Nachricht: nachricht,
          },
        },
      ],
      function (err: any, records: any) {
        if (err) {
          reject(err);
          return;
        }
        resolve(records);
      }
    );
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, telefon, nachricht } = await request.json();
    await sendContactToAirtable({ name, email, telefon, nachricht });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { status: 500 }
    );
  }
};
