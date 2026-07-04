
'use server';

import { login, logout, loginResident, logoutResident } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function handleLogin(formData: FormData) {
    const success = await login(formData);
    return success;
}

export async function handleLogout() {
    await logout();
    redirect('/login');
}

export async function handleResidentLogin(formData: FormData) {
    const success = await loginResident(formData);
    return success;
}

export async function handleResidentLogout() {
    await logoutResident();
    redirect('/portal/login');
}
