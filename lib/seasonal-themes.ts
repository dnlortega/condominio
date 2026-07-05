export type SeasonalThemeId =
    | 'natal'
    | 'ano-novo'
    | 'carnaval'
    | 'pascoa'
    | 'junina'
    | 'independencia';

export type SeasonalTheme = {
    id: SeasonalThemeId;
    label: string;
    emoji: string;
    message: string;
    /** Variáveis CSS (oklch) que substituem a paleta padrão só nas páginas públicas. */
    cssVars: {
        '--primary': string;
        '--primary-foreground': string;
        '--ring': string;
    };
};

export const SEASONAL_THEMES: Record<SeasonalThemeId, SeasonalTheme> = {
    natal: {
        id: 'natal',
        label: 'Natal',
        emoji: '🎄',
        message: 'Feliz Natal!',
        cssVars: {
            '--primary': 'oklch(0.5 0.18 25)',
            '--primary-foreground': 'oklch(0.98 0.02 25)',
            '--ring': 'oklch(0.5 0.18 25)',
        },
    },
    'ano-novo': {
        id: 'ano-novo',
        label: 'Ano Novo',
        emoji: '🎆',
        message: 'Feliz Ano Novo!',
        cssVars: {
            '--primary': 'oklch(0.75 0.14 85)',
            '--primary-foreground': 'oklch(0.2 0.04 85)',
            '--ring': 'oklch(0.75 0.14 85)',
        },
    },
    carnaval: {
        id: 'carnaval',
        label: 'Carnaval',
        emoji: '🎭',
        message: 'Bom Carnaval!',
        cssVars: {
            '--primary': 'oklch(0.55 0.22 335)',
            '--primary-foreground': 'oklch(0.98 0.02 335)',
            '--ring': 'oklch(0.55 0.22 335)',
        },
    },
    pascoa: {
        id: 'pascoa',
        label: 'Páscoa',
        emoji: '🐣',
        message: 'Feliz Páscoa!',
        cssVars: {
            '--primary': 'oklch(0.62 0.13 305)',
            '--primary-foreground': 'oklch(0.98 0.01 305)',
            '--ring': 'oklch(0.62 0.13 305)',
        },
    },
    junina: {
        id: 'junina',
        label: 'Festa Junina',
        emoji: '🌽',
        message: 'Arraiá do Recanto!',
        cssVars: {
            '--primary': 'oklch(0.58 0.17 45)',
            '--primary-foreground': 'oklch(0.98 0.02 45)',
            '--ring': 'oklch(0.58 0.17 45)',
        },
    },
    independencia: {
        id: 'independencia',
        label: 'Independência',
        emoji: '🇧🇷',
        message: '7 de Setembro',
        cssVars: {
            '--primary': 'oklch(0.52 0.15 142)',
            '--primary-foreground': 'oklch(0.98 0.02 142)',
            '--ring': 'oklch(0.52 0.15 142)',
        },
    },
};

/** Dia de ano simples (dias desde uma época fixa), só para comparar datas de calendário sem fuso horário. */
function toOrdinal(year: number, month: number, day: number): number {
    return Math.floor(Date.UTC(year, month - 1, day) / 86400000);
}

/** Domingo de Páscoa (algoritmo Gregoriano de Meeus/Jones/Butcher). */
export function computeEaster(year: number): { year: number; month: number; day: number } {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return { year, month, day };
}

/** Retorna o tema sazonal ativo para uma data (padrão: hoje), ou null fora de temporada. */
export function getThemeForDate(input?: { year: number; month: number; day: number }): SeasonalTheme | null {
    const { year, month, day } = input ?? todayInBrazil();
    const today = toOrdinal(year, month, day);

    // Datas fixas
    if (month === 12 && day >= 1 && day <= 25) return SEASONAL_THEMES.natal;
    if ((month === 12 && day >= 26) || (month === 1 && day === 1)) return SEASONAL_THEMES['ano-novo'];
    if (month === 6) return SEASONAL_THEMES.junina;
    if (month === 9 && day >= 1 && day <= 7) return SEASONAL_THEMES.independencia;

    // Datas móveis (baseadas na Páscoa do ano corrente)
    const easter = computeEaster(year);
    const easterOrdinal = toOrdinal(easter.year, easter.month, easter.day);

    // Carnaval: sábado a terça, terminando na terça (Páscoa - 47 dias)
    const carnivalStart = easterOrdinal - 50;
    const carnivalEnd = easterOrdinal - 47;
    if (today >= carnivalStart && today <= carnivalEnd) return SEASONAL_THEMES.carnaval;

    // Páscoa: semana santa (segunda antes) até o domingo de Páscoa
    const easterWeekStart = easterOrdinal - 6;
    if (today >= easterWeekStart && today <= easterOrdinal) return SEASONAL_THEMES.pascoa;

    return null;
}

export function todayInBrazil(): { year: number; month: number; day: number } {
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(new Date());

    const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    return { year: Number(map.year), month: Number(map.month), day: Number(map.day) };
}
