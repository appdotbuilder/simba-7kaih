<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\DailyJournal;
use App\Models\SchoolClass;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        
        if (!$user || !$user->role) {
            return redirect()->route('home');
        }

        $roleName = $user->role->name;

        // Basic dashboard data based on role
        $dashboardData = $this->show($roleName);

        // Render the appropriate dashboard view
        return Inertia::render("dashboard/{$roleName}", $dashboardData);
    }

    /**
     * Get dashboard data based on role.
     */
    public function show(string $role = null): array
    {
        switch ($role) {
            case 'admin':
                return [
                    'stats' => [
                        'totalStudents' => User::students()->active()->count(),
                        'totalTeachers' => User::teachers()->active()->count(),
                        'totalParents' => User::parents()->active()->count(),
                        'totalClasses' => SchoolClass::active()->count(),
                    ],
                    'weeklyScores' => [],
                    'recentActivity' => [],
                ];
            case 'teacher':
                return ['classes' => []];
            case 'parent':
                return ['children' => []];
            case 'student':
                return [
                    'todayJournal' => null,
                    'hasJournalToday' => false,
                    'recentJournals' => [],
                    'weeklyStats' => [
                        'totalPrayers' => 0,
                        'totalLearningMinutes' => 0,
                        'totalExerciseMinutes' => 0,
                        'journalDays' => 0
                    ]
                ];
            default:
                return [];
        }
    }
}