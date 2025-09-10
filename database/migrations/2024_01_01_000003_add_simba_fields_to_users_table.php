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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable()->constrained()->onDelete('set null');
            $table->string('nis')->nullable()->unique()->comment('Student identification number');
            $table->string('nip')->nullable()->unique()->comment('Teacher identification number');
            $table->string('phone')->nullable();
            $table->date('birth_date')->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->text('address')->nullable();
            $table->string('avatar_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_login_at')->nullable();
            
            $table->index('nis');
            $table->index('nip');
            $table->index('role_id');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropIndex(['nis']);
            $table->dropIndex(['nip']);
            $table->dropIndex(['role_id']);
            $table->dropIndex(['is_active']);
            $table->dropColumn([
                'role_id', 'nis', 'nip', 'phone', 'birth_date', 
                'gender', 'address', 'avatar_url', 'is_active', 'last_login_at'
            ]);
        });
    }
};