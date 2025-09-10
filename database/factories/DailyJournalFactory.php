<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DailyJournal>
 */
class DailyJournalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $prayers = [];
        $prayerTimes = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];
        
        foreach ($prayerTimes as $prayer) {
            if (fake()->boolean(80)) {
                $prayers[] = [
                    'name' => $prayer,
                    'time' => fake()->time(),
                    'place' => fake()->randomElement(['Rumah', 'Masjid', 'Sekolah', 'Mushola']),
                    'completed' => true,
                ];
            }
        }

        $healthyEating = [
            'staple' => fake()->boolean(90),
            'protein' => fake()->boolean(85),
            'vegetables' => fake()->boolean(70),
            'fruits' => fake()->boolean(60),
            'milk' => fake()->boolean(50),
            'water' => fake()->boolean(95),
            'ggl_limit' => fake()->boolean(40),
        ];

        return [
            'student_id' => User::factory(),
            'journal_date' => fake()->dateTimeBetween('-30 days', 'now')->format('Y-m-d'),
            'wake_up_time' => fake()->time('H:i', '06:30'),
            'prayers' => $prayers,
            'tilawah_surah' => fake()->randomElement(['Al-Fatihah', 'Al-Baqarah', 'Al-Imran', 'An-Nisa']),
            'tilawah_ayah' => fake()->numberBetween(1, 10) . '-' . fake()->numberBetween(11, 20),
            'tilawah_reflection' => fake()->paragraph(),
            'exercise_duration' => fake()->numberBetween(0, 120),
            'healthy_eating' => $healthyEating,
            'learning_minutes' => fake()->numberBetween(0, 180),
            'learning_topic' => fake()->randomElement(['Matematika', 'Fisika', 'Bahasa Indonesia', 'Sejarah']),
            'learning_reflection' => fake()->sentence(),
            'social_activities' => fake()->sentence(),
            'bedtime' => fake()->time('H:i', '23:00'),
            'mood' => fake()->randomElement(['😊', '😐', '😔', '😄', '😴']),
            'personal_notes' => fake()->optional()->paragraph(),
            'activity_photos' => fake()->optional()->randomElements(
                ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'], 
                fake()->numberBetween(0, 3)
            ),
            'daily_score' => fake()->randomFloat(2, 60, 100),
            'teacher_notes' => fake()->optional()->sentence(),
            'teacher_adjustment' => fake()->randomFloat(2, -10, 10),
        ];
    }

    /**
     * Create a journal with high score.
     */
    public function highScore(): static
    {
        return $this->state(fn (array $attributes) => [
            'daily_score' => fake()->randomFloat(2, 85, 100),
            'wake_up_time' => fake()->time('H:i', '05:30'),
            'exercise_duration' => fake()->numberBetween(30, 90),
            'learning_minutes' => fake()->numberBetween(60, 180),
            'bedtime' => fake()->time('H:i', '22:00'),
        ]);
    }
}