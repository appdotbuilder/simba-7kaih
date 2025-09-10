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
        Schema::create('score_audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('daily_journal_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('action')->comment('Action performed: score_change, note_added, etc.');
            $table->decimal('old_score', 5, 2)->nullable();
            $table->decimal('new_score', 5, 2)->nullable();
            $table->text('old_notes')->nullable();
            $table->text('new_notes')->nullable();
            $table->text('reason')->nullable()->comment('Reason for the change');
            $table->timestamps();
            
            $table->index('daily_journal_id');
            $table->index('user_id');
            $table->index(['daily_journal_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('score_audit_logs');
    }
};