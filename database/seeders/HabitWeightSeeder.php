<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HabitWeightSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $habits = [
            [
                'habit_key' => 'wake_up_early',
                'habit_name' => 'Bangun Pagi',
                'weight' => 10,
                'description' => 'Wake up between 04:00-06:00 for full points',
            ],
            [
                'habit_key' => 'worship',
                'habit_name' => 'Beribadah',
                'weight' => 20,
                'description' => '5 daily prayers (10 points) + Tilawah & reflection (10 points)',
            ],
            [
                'habit_key' => 'exercise',
                'habit_name' => 'Berolahraga',
                'weight' => 10,
                'description' => '≥30 minutes = full points, 15-29 minutes = half points',
            ],
            [
                'habit_key' => 'healthy_eating',
                'habit_name' => 'Makan Sehat & Bergizi',
                'weight' => 15,
                'description' => 'Points for staple food, protein, vegetables, fruits, milk/water',
            ],
            [
                'habit_key' => 'love_learning',
                'habit_name' => 'Gemar Belajar',
                'weight' => 15,
                'description' => '≥60 minutes = full points, 30-59 minutes = partial points',
            ],
            [
                'habit_key' => 'socializing',
                'habit_name' => 'Bermasyarakat',
                'weight' => 10,
                'description' => 'Participation in social activities',
            ],
            [
                'habit_key' => 'early_sleep',
                'habit_name' => 'Tidur Cepat',
                'weight' => 10,
                'description' => 'Sleep before 22:30 for full points',
            ],
            [
                'habit_key' => 'teacher_adjustment',
                'habit_name' => 'Penyesuaian Guru',
                'weight' => 10,
                'description' => 'Teacher can add/subtract points based on quality and mood',
            ],
        ];

        foreach ($habits as $habit) {
            DB::table('habit_weights')->insert(array_merge($habit, [
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}