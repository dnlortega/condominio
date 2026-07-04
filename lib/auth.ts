
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { encrypt, decrypt } from "@/lib/jwt";

const RESIDENT_COOKIE = "resident_session";

export async function login(formData: FormData) {
    const password = formData.get("password") as string;
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    // Simple hardcoded check
    if (password === adminPassword) {
        const user = { email: "admin@condominio.com", name: "Admin" };
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const session = await encrypt({ user, expires });

        (await cookies()).set("session", session, { expires, httpOnly: true });
        return true;
    }
    return false;
}

export async function logout() {
    (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSession() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;
    try {
        return await decrypt(session);
    } catch (error) {
        return null;
    }
}

// ------------------------------------
// SESSÃO DO MORADOR (Portal do Morador)
// ------------------------------------

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}

export async function loginResident(formData: FormData) {
    const email = (formData.get("email") as string || "").trim().toLowerCase();
    const password = formData.get("password") as string;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return false;

    const valid = await verifyPassword(password, user.password);
    if (!valid) return false;

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            apartment: user.apartment,
        },
        expires,
    });

    (await cookies()).set(RESIDENT_COOKIE, session, { expires, httpOnly: true });
    return true;
}

export async function logoutResident() {
    (await cookies()).set(RESIDENT_COOKIE, "", { expires: new Date(0) });
}

export async function getResidentSession() {
    const session = (await cookies()).get(RESIDENT_COOKIE)?.value;
    if (!session) return null;
    try {
        const payload = await decrypt(session);
        return payload.user as {
            id: string;
            name: string;
            email: string;
            role: "ADMIN" | "RESIDENT";
            apartment: string | null;
        };
    } catch (error) {
        return null;
    }
}
