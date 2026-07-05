"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ContactSettingsType = {
  administration: string;
  customerSupport: string;
  locationLink: string;
};

export async function getContactSettings(): Promise<ContactSettingsType> {
  // upsert é atômico no banco — evita condição de corrida quando várias páginas
  // são renderizadas em paralelo (ex: build) e tentam criar a linha ao mesmo tempo.
  return await prisma.contactSetting.upsert({
    where: { id: "contact" },
    update: {},
    create: {
      id: "contact",
      administration: "(14) 99769-6946",
      customerSupport: "contato@recantodospassaros.com.br",
      locationLink: "https://maps.app.goo.gl/X6dXRkss6QoJXis68",
    },
  });
}

export async function updateContactSettings(data: ContactSettingsType) {
  const result = await prisma.contactSetting.upsert({
    where: { id: "contact" },
    update: data,
    create: {
      id: "contact",
      ...data,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/contato");
  return result;
}
