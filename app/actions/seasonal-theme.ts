'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { SEASONAL_THEMES, SeasonalTheme, getThemeForDate } from '@/lib/seasonal-themes'

export type SeasonalThemeSettingType = {
    enabled: boolean
    forcedThemeId: string | null
}

export async function getSeasonalThemeSetting(): Promise<SeasonalThemeSettingType> {
    // upsert é atômico no banco — evita condição de corrida quando várias páginas
    // são renderizadas em paralelo (ex: build) e tentam criar a linha ao mesmo tempo.
    return await prisma.seasonalThemeSetting.upsert({
        where: { id: 'seasonal' },
        update: {},
        create: { id: 'seasonal', enabled: true, forcedThemeId: null },
    })
}

export async function updateSeasonalThemeSetting(data: Partial<SeasonalThemeSettingType>) {
    const result = await prisma.seasonalThemeSetting.upsert({
        where: { id: 'seasonal' },
        update: data,
        create: {
            id: 'seasonal',
            enabled: data.enabled ?? true,
            forcedThemeId: data.forcedThemeId ?? null,
        },
    })

    revalidatePath('/')
    revalidatePath('/admin/temporada')
    return result
}

/** Combina a configuração salva com a data de hoje para decidir o tema ativo. */
export async function getActiveSeasonalTheme(): Promise<SeasonalTheme | null> {
    const setting = await getSeasonalThemeSetting()
    if (!setting.enabled) return null

    if (setting.forcedThemeId === 'none') return null
    if (setting.forcedThemeId) {
        return SEASONAL_THEMES[setting.forcedThemeId as keyof typeof SEASONAL_THEMES] ?? null
    }

    return getThemeForDate()
}
