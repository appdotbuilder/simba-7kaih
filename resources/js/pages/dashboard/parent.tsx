import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface WeekScore {
    date: string;
    score: number;
}

interface WeeklyStats {
    totalPrayers: number;
    totalLearningMinutes: number;
    totalExerciseMinutes: number;
}

interface Child {
    id: number;
    name: string;
    nis: string;
    weekScores: WeekScore[];
    weeklyStats: WeeklyStats;
    averageScore: number;
    todayScore: number | null;
    todayMood: string | null;
}

interface Props {
    children: Child[];
    [key: string]: unknown;
}

export default function ParentDashboard({ children }: Props) {
    return (
        <>
            <Head title="Dashboard Orang Tua - SIMBA" />
            <AppShell>
                <div className="p-6">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            👪 Dashboard Orang Tua
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Monitor perkembangan kebiasaan baik anak-anak Anda
                        </p>
                    </div>

                    {/* Children Overview */}
                    {children.length > 0 ? (
                        <div className="space-y-6">
                            {children.map((child) => (
                                <div key={child.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                                    {/* Child Header */}
                                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                                                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                        {child.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                                        {child.name}
                                                    </h2>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        NIS: {child.nis}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center space-x-4">
                                                {child.todayMood && (
                                                    <div className="text-center">
                                                        <div className="text-2xl">{child.todayMood}</div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Mood hari ini</p>
                                                    </div>
                                                )}
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                        {child.averageScore?.toFixed(1) || 0}
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Rata-rata</p>
                                                </div>
                                                {child.todayScore !== null && (
                                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                        child.todayScore >= 85 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                        child.todayScore >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    }`}>
                                                        Hari ini: {child.todayScore}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid lg:grid-cols-2 gap-6">
                                            {/* Weekly Progress Chart */}
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                                    📈 Progress Mingguan
                                                </h3>
                                                <div className="space-y-3">
                                                    {child.weekScores.map((item, index) => (
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

                                            {/* Weekly Statistics */}
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                                    📊 Rekap Mingguan
                                                </h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                        <div className="text-2xl mb-2">🙏</div>
                                                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                            {child.weeklyStats.totalPrayers}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Sholat</p>
                                                    </div>
                                                    
                                                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                        <div className="text-2xl mb-2">📚</div>
                                                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                            {Math.round(child.weeklyStats.totalLearningMinutes / 60)}h
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Jam Belajar</p>
                                                    </div>
                                                    
                                                    <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                                        <div className="text-2xl mb-2">🏃</div>
                                                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                                                            {child.weeklyStats.totalExerciseMinutes}m
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Menit Olahraga</p>
                                                    </div>
                                                    
                                                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                                        <div className="text-2xl mb-2">📋</div>
                                                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                                            {child.weekScores.length}/7
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Jurnal Terisi</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-6 flex space-x-3">
                                            <button className="flex-1 px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300 font-medium rounded-lg transition-colors">
                                                📋 Lihat Detail Jurnal
                                            </button>
                                            <button className="flex-1 px-4 py-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-600 dark:text-green-300 font-medium rounded-lg transition-colors">
                                                📄 Download Laporan PDF
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">👶</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Belum Ada Data Anak
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Akun Anda belum terhubung dengan data siswa. Hubungi pihak sekolah untuk verifikasi hubungan orang tua-siswa.
                            </p>
                        </div>
                    )}

                    {/* Tips for Parents */}
                    {children.length > 0 && (
                        <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 p-6">
                            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
                                💡 Tips untuk Orang Tua
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700 dark:text-yellow-300">
                                <div className="flex items-start space-x-2">
                                    <span className="text-lg">🌅</span>
                                    <p>Bantu anak bangun pagi dengan jadwal tidur yang konsisten</p>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="text-lg">🙏</span>
                                    <p>Ingatkan waktu sholat dan ajak tilawah bersama</p>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="text-lg">🏃</span>
                                    <p>Ajak anak olahraga atau bermain di luar rumah</p>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="text-lg">🍎</span>
                                    <p>Sediakan makanan bergizi dan batasi junk food</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </AppShell>
        </>
    );
}