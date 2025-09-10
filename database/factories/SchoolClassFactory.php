<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SchoolClass>
 */
class SchoolClassFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $grade = fake()->randomElement(['X', 'XI', 'XII']);
        $major = fake()->randomElement(['IPA', 'IPS', 'BAHASA']);
        $classNumber = fake()->numberBetween(1, 4);
        
        return [
            'name' => "{$grade} {$major} {$classNumber}",
            'grade' => $grade,
            'major' => $major,
            'class_number' => $classNumber,
            'academic_year' => '2024/2025',
            'is_active' => fake()->boolean(90),
        ];
    }

    /**
     * Indicate that the class is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }
}