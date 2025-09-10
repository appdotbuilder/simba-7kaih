import React, { useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { SharedData } from '@/types';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        // Redirect to role-specific dashboard
        if (auth.user && auth.user.role) {
            router.visit(route('dashboard'));
        }
    }, [auth]);

    return (
        <>
            <Head title="Dashboard" />
            <AppShell>
                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-center justify-center min-h-[400px]">
                            <div className="text-center">
                                <div className="text-6xl mb-4">⏳</div>
                                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                                    Memuat Dashboard...
                                </h1>
                                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                                    Mengarahkan ke dashboard sesuai role Anda
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </AppShell>
        </>
    );
}