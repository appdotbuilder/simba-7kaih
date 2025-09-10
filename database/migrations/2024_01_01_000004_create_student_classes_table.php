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
        Schema::create('student_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('class_id')->constrained()->onDelete('cascade');
            $table->foreignId('homeroom_teacher_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('academic_year')->comment('Academic year like "2024/2025"');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->unique(['student_id', 'class_id', 'academic_year']);
            $table->index(['class_id', 'is_active']);
            $table->index('homeroom_teacher_id');
            $table->index('academic_year');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_classes');
    }
};