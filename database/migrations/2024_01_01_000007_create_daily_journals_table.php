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
        Schema::create('daily_journals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->date('journal_date')->comment('Date of the journal entry');
            
            // 1. Bangun Pagi (Wake Up Early)
            $table->time('wake_up_time')->nullable();
            
            // 2. Beribadah (Worship)
            $table->json('prayers')->nullable()->comment('5 daily prayers with times and places');
            $table->string('tilawah_surah')->nullable()->comment('Surah read during tilawah');
            $table->string('tilawah_ayah')->nullable()->comment('Ayah numbers read');
            $table->text('tilawah_reflection')->nullable();
            
            // 3. Berolahraga (Exercise)
            $table->integer('exercise_duration')->nullable()->comment('Exercise duration in minutes');
            
            // 4. Makan Sehat & Bergizi (Healthy & Nutritious Eating)
            $table->json('healthy_eating')->nullable()->comment('Portions of staple, protein, vegetables, fruits, milk, water, GGL limitation');
            
            // 5. Gemar Belajar (Love Learning)
            $table->integer('learning_minutes')->nullable()->comment('Total learning minutes');
            $table->string('learning_topic')->nullable();
            $table->text('learning_reflection')->nullable();
            
            // 6. Bermasyarakat (Socializing)
            $table->text('social_activities')->nullable();
            
            // 7. Tidur Cepat (Early Sleep)
            $table->time('bedtime')->nullable();
            
            // Additional fields
            $table->string('mood')->nullable()->comment('Daily mood emoji');
            $table->text('personal_notes')->nullable();
            $table->json('activity_photos')->nullable()->comment('Up to 3 photos per day');
            
            // Scoring
            $table->decimal('daily_score', 5, 2)->default(0)->comment('Calculated daily score (0-100)');
            $table->text('teacher_notes')->nullable();
            $table->decimal('teacher_adjustment', 5, 2)->default(0)->comment('Teacher score adjustment');
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('reviewed_at')->nullable();
            
            $table->timestamps();
            
            $table->unique(['student_id', 'journal_date']);
            $table->index('journal_date');
            $table->index('daily_score');
            $table->index(['student_id', 'journal_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_journals');
    }
};