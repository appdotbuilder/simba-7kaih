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
        Schema::create('student_parents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('parent_id')->constrained('users')->onDelete('cascade');
            $table->enum('relationship', ['father', 'mother', 'guardian'])->comment('Parent relationship to student');
            $table->boolean('is_primary')->default(false)->comment('Primary contact parent');
            $table->timestamps();
            
            $table->unique(['student_id', 'parent_id']);
            $table->index('parent_id');
            $table->index(['student_id', 'is_primary']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_parents');
    }
};