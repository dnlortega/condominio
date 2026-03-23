"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ContactSettingsType = {
  administration: string;
  customerSupport: string;
  locationLink: string;
};

export async function getContactSettings(): Promise<ContactSettingsType> {
  const settings = await prisma.contactSetting.findFirst({
    where: { id: "contact" },
  });

  if (!settings) {
    const defaultSettings = await prisma.contactSetting.create({
      data: {
        id: "contact",
        administration: "(14) 99769-6946",
        customerSupport: "contato@recantodospassaros.com.br",
        locationLink: "https://maps.app.goo.gl/X6dXRkss6QoJXis68",
      },
    });
    return defaultSettings;
  }

  return settings;
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
