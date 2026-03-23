"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type AnimationSettingsType = {
  fadeAndSlide: boolean;
  cascadingText: boolean;
  hoverEffects: boolean;
  counters: boolean;
  progressBar: boolean;
  backgroundOrbs: boolean;
};

export async function getAnimationSettings(): Promise<AnimationSettingsType> {
  const settings = await prisma.animationSetting.findFirst({
    where: { id: "settings" },
  });

  if (!settings) {
    const defaultSettings = await prisma.animationSetting.create({
      data: {
        id: "settings",
        fadeAndSlide: true,
        cascadingText: true,
        hoverEffects: true,
        counters: true,
        progressBar: true,
        backgroundOrbs: true,
      },
    });
    return defaultSettings;
  }

  return settings;
}

export async function updateAnimationSettings(data: Partial<AnimationSettingsType>) {
  const result = await prisma.animationSetting.upsert({
    where: { id: "settings" },
    update: data,
    create: {
      id: "settings",
      fadeAndSlide: data.fadeAndSlide ?? true,
      cascadingText: data.cascadingText ?? true,
      hoverEffects: data.hoverEffects ?? true,
      counters: data.counters ?? true,
      progressBar: data.progressBar ?? true,
      backgroundOrbs: data.backgroundOrbs ?? true,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/animacoes");
  return result;
}
