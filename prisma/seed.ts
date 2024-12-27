import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const data = [
    {
      type: "bank draft",
      title: "Bank Draft",
      position: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1543457625-e5d4636c0094?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      type: "bill-of-lading",
      title: "Bill of Lading",
      position: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1530679703238-74961c0d1639?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      type: "invoice",
      title: "Invoice",
      position: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1494389715136-ee2a925f8a0a?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      type: "bank-draft-2",
      title: "Bank Draft 2",
      position: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1594862565524-acad491f0958?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      type: "bill-of-lading-2",
      title: "Bill of Lading 2",
      position: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1512845296467-183ccf124347?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  for (const item of data) {
    await prisma.card.create({
      data: {
        type: item.type,
        title: item.title,
        position: item.position,
        imageUrl: item.imageUrl,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
