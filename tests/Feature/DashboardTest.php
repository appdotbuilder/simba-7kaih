<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users can visit the dashboard', function () {
    // Create roles first
    $studentRole = \App\Models\Role::create([
        'name' => 'student',
        'display_name' => 'Student',
        'description' => 'Student role for testing'
    ]);

    $user = User::factory()->create([
        'role_id' => $studentRole->id
    ]);

    $this->actingAs($user);

    $response = $this->get('/dashboard');
    $response->assertOk();
});
