<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('habit_weights', function (Blueprint $table) {
            $table->id();
            $table->string('habit_key')->unique()->comment('Habit identifier key');
            $table->string('habit_name')->comment('Display name for the habit');
            $table->integer('weight')->comment('Weight points for scoring (0-100)');
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index('habit_key');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habit_weights');
    }
};