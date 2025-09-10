<?php

namespace Database\Factories;

use App\Models\DailyJournal;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ScoreAuditLog>
 */
class ScoreAuditLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'daily_journal_id' => DailyJournal::factory(),
            'user_id' => User::factory(),
            'action' => fake()->randomElement(['score_change', 'note_added', 'score_adjusted']),
            'old_score' => fake()->optional()->randomFloat(2, 0, 100),
            'new_score' => fake()->optional()->randomFloat(2, 0, 100),
            'old_notes' => fake()->optional()->sentence(),
            'new_notes' => fake()->optional()->sentence(),
            'reason' => fake()->optional()->sentence(),
        ];
    }
}