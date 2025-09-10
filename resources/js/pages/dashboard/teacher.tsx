import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Student {
    id: number;
    name: string;
    nis: string;
    todayScore: number | null;
    todayMood: string | null;
    hasJournal: boolean;
}

interface ClassData {
    id: number;
    name: string;
    studentCount: number;
    students: Student[];
}

interface Props {
    classes: ClassData[];
    [key: string]: unknown;
}

export default function TeacherDashboard({ classes }: Props) {
    return (
        <>
            <Head title="Dashboard Guru - SIMBA" />
            <AppShell>
                <div className="p-6">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            👩‍🏫 Dashboard Guru
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Monitor perkembangan siswa di kelas yang Anda ajar
                        </p>
                    </div>

                    {/* Classes Overview */}
                    {classes.length > 0 ? (
                        <div className="space-y-6">
                            {classes.map((classData) => {
                                const completedJournals = classData.students.filter(s => s.hasJournal).length;
                                const averageScore = classData.students
                                    .filter(s => s.todayScore !== null)
                                    .reduce((acc, s) => acc + (s.todayScore || 0), 0) / 
                                    (classData.students.filter(s => s.todayScore !== null).length || 1);

                                return (
                                    <div key={classData.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                                        {/* Class Header */}
                                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                                        🏫 Kelas {classData.name}
                                                    </h2>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        {classData.studentCount} siswa • {completedJournals} jurnal hari ini
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                        {averageScore.toFixed(1)}
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Rata-rata Skor</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Students Grid */}
                                        <div className="p-6">
                                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {classData.students.map((student) => (
                                                    <div key={student.id} className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                                                        student.hasJournal 
                                                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                                                            : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                                                    }`}>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center space-x-2">
                                                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                                        {student.name.charAt(0)}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                        {student.name}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {student.nis}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            {student.todayMood && (
                                                                <div className="text-lg">{student.todayMood}</div>
                                                            )}
                                                        </div>
                                                        
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-2">
                                                                {student.hasJournal ? (
                                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                                        ✅ Sudah isi
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                                        ⏳ Belum isi
                                                                    </span>
                                                                )}
                                                            </div>
                                                            
                                                            {student.todayScore !== null && (
                                                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                                    student.todayScore >= 85 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                                    student.todayScore >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                                                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                                }`}>
                                                                    Skor: {student.todayScore}
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        <button className="w-full mt-3 px-3 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300 text-xs font-medium rounded-lg transition-colors">
                                                            👁️ Lihat Detail
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🏫</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Belum Ada Kelas
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Anda belum ditugaskan sebagai wali kelas. Hubungi administrator untuk penugasan.
                            </p>
                        </div>
                    )}

                    {/* Quick Actions */}
                    {classes.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                ⚡ Aksi Cepat
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <button className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                                    <div className="text-2xl mb-2">📊</div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Export Laporan</p>
                                </button>
                                
                                <button className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                                    <div className="text-2xl mb-2">📝</div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Tambah Catatan</p>
                                </button>
                                
                                <button className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                                    <div className="text-2xl mb-2">⚖️</div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Revisi Skor</p>
                                </button>
                                
                                <button className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                                    <div className="text-2xl mb-2">🔔</div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Kirim Reminder</p>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </AppShell>
        </>
    );
}