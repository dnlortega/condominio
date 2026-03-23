"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function sendMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const content = formData.get("content") as string;

  if (!name || !email || !content) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  const message = await prisma.message.create({
    data: {
      name,
      email,
      content,
    },
  });

  revalidatePath("/admin/mensagens");
  return message;
}

export async function getMessages() {
  return await prisma.message.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function markAsRead(id: string) {
  await prisma.message.update({
    where: { id },
    data: { isRead: true },
  });
  revalidatePath("/admin/mensagens");
}

export async function deleteMessage(id: string) {
  await prisma.message.delete({
    where: { id },
  });
  revalidatePath("/admin/mensagens");
}
