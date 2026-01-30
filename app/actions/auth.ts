
'use server';

import { login, logout } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function handleLogin(formData: FormData) {
    const success = await login(formData);
    return success;
}

export async function handleLogout() {
    await logout();
    redirect('/login');
}
