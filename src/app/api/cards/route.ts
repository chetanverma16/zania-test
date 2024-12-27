import { NextRequest, NextResponse } from "next/server";
import { Card, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cards = await prisma.card.findMany();
    return NextResponse.json(cards);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch cards" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { cards } = (await req.json()) as { cards: Card[] };
    await prisma.$transaction(
      cards.map((card) =>
        prisma.card.upsert({
          where: { id: card.id },
          update: card,
          create: card,
        })
      )
    );
    return NextResponse.json({ message: "Cards saved successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to save cards" },
      { status: 500 }
    );
  }
}
