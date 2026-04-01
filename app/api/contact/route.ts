import { NextResponse } from "next/server";

const FORMSPREE_ID = process.env.FORMSPREE_ID;

export async function POST(request: Request) {
  if (!FORMSPREE_ID) {
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 500 }
    );
  }

  const formData = await request.formData();

  // Reject if honeypot field is filled (bot submission)
  if (formData.get("_gotcha")) {
    return NextResponse.json({ ok: true });
  }

  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: res.status }
    );
  }

  return NextResponse.json({ ok: true });
}
