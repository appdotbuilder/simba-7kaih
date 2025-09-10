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
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Class name like "X IPA 1", "XI IPS 2"');
            $table->string('grade')->comment('Grade level: X, XI, XII');
            $table->string('major')->comment('Major: IPA, IPS, BAHASA');
            $table->integer('class_number')->comment('Class number: 1, 2, 3');
            $table->string('academic_year')->comment('Academic year like "2024/2025"');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index(['grade', 'major', 'class_number']);
            $table->index('academic_year');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};