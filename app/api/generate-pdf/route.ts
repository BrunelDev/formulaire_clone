import chromium from "@sparticuz/chromium";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

const allowedOrigins = [
  "http://localhost:5173",
  "https://formulaire.mesplansdepermis.fr",
  "https://eurekaingenierie.com",
  "https://www.eurekaingenierie.com",
];

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  if (allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
  return new NextResponse(null, { status: 403 });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  try {
    const { htmlContent, filename = "devis.pdf" } = await request.json();

    const isDev = process.env.NODE_ENV === "development";
    let browser;

    if (isDev) {
      const puppeteerFull = await import("puppeteer");
      browser = await puppeteerFull.default.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    } else {
      const executablePath = await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar"
      );

      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: null,
        executablePath,
        headless: true,
      });
    }

    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        ...(isAllowedOrigin ? { "Access-Control-Allow-Origin": origin } : {}),
      },
    });
  } catch (error) {
    console.error("Erreur génération PDF:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Erreur inconnue",
        stack: error instanceof Error ? error.stack : undefined,
      },
      {
        status: 500,
        headers: isAllowedOrigin
          ? { "Access-Control-Allow-Origin": origin }
          : {},
      }
    );
  }
}

export const maxDuration = 60;
