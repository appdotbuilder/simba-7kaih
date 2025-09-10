<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Full system access and management capabilities'
            ],
            [
                'name' => 'teacher',
                'display_name' => 'Teacher',
                'description' => 'Can view student progress, add notes, and manage classes'
            ],
            [
                'name' => 'parent',
                'display_name' => 'Parent/Guardian',
                'description' => 'Can view their children progress and reports'
            ],
            [
                'name' => 'student',
                'display_name' => 'Student',
                'description' => 'Can fill daily journals and view own progress'
            ],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}