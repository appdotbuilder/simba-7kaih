import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Props {
    stats: {
        totalStudents: number;
        totalTeachers: number;
        totalParents: number;
        totalClasses: number;
    };
    weeklyScores: Array<{
        date: string;
        score: number;
    }>;
    recentActivity: Array<{
        id: number;
        student_name: string;
        date: string;
        score: number;
        created_at: string;
    }>;
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, weeklyScores, recentActivity }: Props) {
    return (
        <>
            <Head title="Dashboard Admin - SIMBA" />
            <AppShell>
                <div className="p-6">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            👨‍💼 Dashboard Administrator
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Selamat datang di SIMBA - Monitor keseluruhan sistem dan kelola data
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl">👨‍🎓</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Siswa</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalStudents}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl">👩‍🏫</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Guru</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTeachers}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl">👪</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orang Tua</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalParents}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl">🏫</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Kelas</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalClasses}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Weekly Progress Chart */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📈 Rata-rata Skor Mingguan
                            </h3>
                            <div className="space-y-3">
                                {weeklyScores.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{item.date}</span>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300"
                                                    style={{ width: `${item.score}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[3rem]">
                                                {item.score}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                🕒 Aktivitas Terkini
                            </h3>
                            <div className="space-y-3">
                                {recentActivity.length > 0 ? (
                                    recentActivity.map((activity) => (
                                        <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {activity.student_name}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {activity.date} • {activity.created_at}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                    activity.score >= 85 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                    activity.score >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                }`}>
                                                    {activity.score}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                        Belum ada aktivitas terbaru
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            ⚡ Aksi Cepat
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                                <div className="text-2xl mb-2">👥</div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Kelola Pengguna</p>
                            </button>
                            
                            <button className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                                <div className="text-2xl mb-2">🏫</div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Kelola Kelas</p>
                            </button>
                            
                            <button className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                                <div className="text-2xl mb-2">⚖️</div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Bobot Skor</p>
                            </button>
                            
                            <button className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                                <div className="text-2xl mb-2">📊</div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Laporan Global</p>
                            </button>
                        </div>
                    </div>
                </div>
            </AppShell>
        </>
    );
}