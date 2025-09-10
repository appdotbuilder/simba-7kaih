import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Journal {
    id: number;
    date: string;
    score: number;
    mood: string;
    hasTeacherNotes: boolean;
}

interface WeeklyStats {
    totalPrayers: number;
    totalLearningMinutes: number;
    totalExerciseMinutes: number;
    journalDays: number;
}

interface Props {
    todayJournal: Journal | null;
    hasJournalToday: boolean;
    recentJournals: Journal[];
    weeklyStats: WeeklyStats;
    [key: string]: unknown;
}

export default function StudentDashboard({ 
    todayJournal, 
    hasJournalToday, 
    recentJournals, 
    weeklyStats 
}: Props) {
    return (
        <>
            <Head title="Dashboard Siswa - SIMBA" />
            <AppShell>
                <div className="p-6">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            👨‍🎓 Dashboard Siswa
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Selamat datang! Isi jurnal harian 7KAIH untuk mengembangkan kebiasaan baik
                        </p>
                    </div>

                    {/* Today's Journal Status */}
                    <div className="mb-8">
                        {hasJournalToday ? (
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                                            <span className="text-3xl">{todayJournal?.mood || '✅'}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
                                                Jurnal Hari Ini Sudah Terisi! 🎉
                                            </h3>
                                            <p className="text-green-600 dark:text-green-300">
                                                Skor: {todayJournal?.score} | {todayJournal?.date}
                                            </p>
                                            {todayJournal?.hasTeacherNotes && (
                                                <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                                                    💬 Ada catatan dari guru
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Link
                                        href="#"
                                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                                    >
                                        Lihat Detail
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                                            <span className="text-3xl">📝</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">
                                                Isi Jurnal Hari Ini
                                            </h3>
                                            <p className="text-blue-600 dark:text-blue-300">
                                                Catat kegiatan 7KAIH kamu hari ini dan dapatkan skor!
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        href="#"
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        Isi Jurnal
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Weekly Statistics */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📊 Statistik Minggu Ini
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="text-2xl mb-2">🙏</div>
                                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        {weeklyStats.totalPrayers}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Sholat</p>
                                </div>
                                
                                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <div className="text-2xl mb-2">📚</div>
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                        {Math.round(weeklyStats.totalLearningMinutes / 60)}h
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Jam Belajar</p>
                                </div>
                                
                                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                    <div className="text-2xl mb-2">🏃</div>
                                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                                        {weeklyStats.totalExerciseMinutes}m
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Menit Olahraga</p>
                                </div>
                                
                                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <div className="text-2xl mb-2">📋</div>
                                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                        {weeklyStats.journalDays}/7
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Jurnal Terisi</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Journals */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📅 Riwayat Jurnal
                            </h3>
                            <div className="space-y-3">
                                {recentJournals.length > 0 ? (
                                    recentJournals.map((journal) => (
                                        <div key={journal.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="text-2xl">{journal.mood}</div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {journal.date}
                                                    </p>
                                                    {journal.hasTeacherNotes && (
                                                        <p className="text-xs text-blue-600 dark:text-blue-400">
                                                            💬 Ada catatan guru
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                    journal.score >= 85 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                    journal.score >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                }`}>
                                                    {journal.score}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                        Belum ada jurnal. Mulai isi jurnal pertama kamu! 🌟
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 7KAIH Guide */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            🌟 7 Kebiasaan Anak Indonesia Hebat
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                            {[
                                { emoji: '🌅', title: 'Bangun Pagi', desc: 'Sebelum 06:00' },
                                { emoji: '🙏', title: 'Beribadah', desc: 'Sholat & Tilawah' },
                                { emoji: '🏃', title: 'Olahraga', desc: 'Min 30 menit' },
                                { emoji: '🍎', title: 'Makan Bergizi', desc: '4 sehat 5 sempurna' },
                                { emoji: '📚', title: 'Belajar', desc: 'Min 1 jam' },
                                { emoji: '🤝', title: 'Bermasyarakat', desc: 'Kegiatan sosial' },
                                { emoji: '🌙', title: 'Tidur Cepat', desc: 'Sebelum 22:30' },
                            ].map((habit, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-md border border-gray-200 dark:border-gray-700">
                                    <div className="text-2xl mb-2">{habit.emoji}</div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{habit.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{habit.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </AppShell>
        </>
    );
}