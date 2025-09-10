<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            HabitWeightSeeder::class,
        ]);

        // Create admin user
        $adminRole = \App\Models\Role::where('name', 'admin')->first();
        \App\Models\User::factory()->create([
            'name' => 'SIMBA Administrator',
            'email' => 'admin@simba.sman1bintanpesisir.sch.id',
            'role_id' => $adminRole->id,
            'is_active' => true,
        ]);
    }
}
