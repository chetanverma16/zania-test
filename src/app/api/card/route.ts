import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Card } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const cardData = (await req.json()) as Card;
    const newCard = await prisma.card.create({
      data: cardData,
    });
    return NextResponse.json(newCard);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create card" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = (await req.json()) as { id: number };
    await prisma.card.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Card deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete card" },
      { status: 500 }
    );
  }
}
