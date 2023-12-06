"use server";

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const reqBody = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;
  const url = "https://api.openai.com/v1/chat/completions";

  const body = JSON.stringify({
    messages: [{ role: "user", content: reqBody.message }],
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    stream: false,
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body,
    });
    const data = await response.json();
    console.log("Usage: ", data.usage);
    return NextResponse.json(data["choices"][0]["message"]["content"]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
