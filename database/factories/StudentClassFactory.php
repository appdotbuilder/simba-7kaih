<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\SchoolClass;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentClass>
 */
class StudentClassFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => User::factory(),
            'class_id' => SchoolClass::factory(),
            'homeroom_teacher_id' => User::factory(),
            'academic_year' => '2024/2025',
            'is_active' => fake()->boolean(90),
        ];
    }

    /**
     * Indicate that the student class is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }
}