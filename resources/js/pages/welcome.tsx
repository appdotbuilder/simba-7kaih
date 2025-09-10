import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="SIMBA - SMAN 1 Bintan Pesisir">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=poppins:400,500,600,700&family=nunito:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">S</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">SIMBA</h1>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">SMAN 1 Bintan Pesisir</p>
                                </div>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg transform hover:scale-105"
                                        >
                                            Daftar Sekarang
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center">
                            <div className="mb-8">
                                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4 dark:bg-blue-900 dark:text-blue-200">
                                    🏫 Sistem Informasi Pendidikan
                                </span>
                                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                                    <span className="block">SIMBA</span>
                                    <span className="block text-3xl md:text-4xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                        7 Kebiasaan Anak Indonesia Hebat
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                    Sistem monitoring dan pencatatan harian untuk mengembangkan 7 kebiasaan baik siswa 
                                    SMAN 1 Bintan Pesisir berdasarkan pedoman resmi 7KAIH
                                </p>
                            </div>
                            
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-lg font-semibold rounded-xl transition-all duration-200 shadow-xl transform hover:scale-105"
                                    >
                                        📚 Mulai Jurnal Harian
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 text-lg font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-500 transition-all duration-200 shadow-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:border-blue-400"
                                    >
                                        👤 Masuk ke Akun
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-green-300/20 rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-300/20 to-blue-300/20 rounded-full filter blur-3xl"></div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white/50 dark:bg-gray-900/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                ✨ Fitur Utama SIMBA
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Platform lengkap untuk monitoring perkembangan siswa dengan 4 role berbeda
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Student Features */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">👨‍🎓</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Siswa</h3>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>• Isi jurnal harian 7KAIH</li>
                                    <li>• Upload foto kegiatan</li>
                                    <li>• Lihat riwayat progress</li>
                                    <li>• Notifikasi reminder</li>
                                </ul>
                            </div>

                            {/* Teacher Features */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">👩‍🏫</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Guru</h3>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>• Monitor progress kelas</li>
                                    <li>• Tambah catatan siswa</li>
                                    <li>• Export laporan PDF</li>
                                    <li>• Revisi skor dengan audit</li>
                                </ul>
                            </div>

                            {/* Parent Features */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">👪</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Orang Tua</h3>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>• Lihat progress anak</li>
                                    <li>• Baca catatan guru</li>
                                    <li>• Download laporan PDF</li>
                                    <li>• Rekap mingguan</li>
                                </ul>
                            </div>

                            {/* Admin Features */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">⚙️</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Admin</h3>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>• Kelola user & kelas</li>
                                    <li>• Monitor global</li>
                                    <li>• Konfigurasi bobot skor</li>
                                    <li>• Audit trail sistem</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7KAIH Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                🌟 7 Kebiasaan Anak Indonesia Hebat
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Kebiasaan baik yang dipantau dan dinilai setiap hari
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                                <div className="text-3xl mb-3">🌅</div>
                                <h3 className="font-bold text-gray-900 dark:text-white">Bangun Pagi</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Bangun sebelum jam 6 pagi</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                                <div className="text-3xl mb-3">🙏</div>
                                <h3 className="font-bold text-gray-900 dark:text-white">Beribadah</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Sholat 5 waktu & tilawah</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                                <div className="text-3xl mb-3">🏃</div>
                                <h3 className="font-bold text-gray-900 dark:text-white">Berolahraga</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Minimal 30 menit per hari</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-green-50 to-lime-50 dark:from-green-900/20 dark:to-lime-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                                <div className="text-3xl mb-3">🍎</div>
                                <h3 className="font-bold text-gray-900 dark:text-white">Makan Bergizi</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">4 sehat 5 sempurna</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                                <div className="text-3xl mb-3">📚</div>
                                <h3 className="font-bold text-gray-900 dark:text-white">Gemar Belajar</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Minimal 1 jam belajar</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                                <div className="text-3xl mb-3">🤝</div>
                                <h3 className="font-bold text-gray-900 dark:text-white">Bermasyarakat</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Kegiatan sosial & gotong royong</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
                                <div className="text-3xl mb-3">🌙</div>
                                <h3 className="font-bold text-gray-900 dark:text-white">Tidur Cepat</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Tidur sebelum jam 22:30</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                                <div className="text-3xl mb-3">📊</div>
                                <h3 className="font-bold text-gray-900 dark:text-white">Skor Otomatis</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Penilaian 0-100 per hari</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            🚀 Siap Memulai Perjalanan 7KAIH?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Bergabunglah dengan SMAN 1 Bintan Pesisir dalam mengembangkan kebiasaan baik generasi Indonesia hebat
                        </p>
                        
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 text-lg font-semibold rounded-xl transition-all duration-200 shadow-xl transform hover:scale-105"
                                >
                                    📝 Daftar Sebagai Siswa
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-white/10 text-white text-lg font-semibold rounded-xl border-2 border-white/30 hover:border-white transition-all duration-200"
                                >
                                    👨‍🏫 Login Guru/Orang Tua
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold">S</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">SIMBA</h3>
                                        <p className="text-sm text-gray-400">SMAN 1 Bintan Pesisir</p>
                                    </div>
                                </div>
                                <p className="text-gray-400">
                                    Sistem Informasi Perkembangan Murid Berbasis 7 Kebiasaan Baik untuk menciptakan generasi Indonesia yang hebat.
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Kontak</h4>
                                <div className="space-y-2 text-gray-400">
                                    <p>📍 SMAN 1 Bintan Pesisir</p>
                                    <p>📧 info@sman1bintanpesisir.sch.id</p>
                                    <p>📱 (0771) 123-4567</p>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Tentang 7KAIH</h4>
                                <p className="text-gray-400">
                                    7 Kebiasaan Anak Indonesia Hebat adalah program pembentukan karakter berdasarkan 
                                    pedoman resmi Kementerian Pendidikan dan Kebudayaan RI.
                                </p>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 SIMBA - SMAN 1 Bintan Pesisir. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}