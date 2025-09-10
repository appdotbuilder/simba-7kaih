<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property int|null $role_id
 * @property string|null $nis
 * @property string|null $nip
 * @property string|null $phone
 * @property \Illuminate\Support\Carbon|null $birth_date
 * @property string|null $gender
 * @property string|null $address
 * @property string|null $avatar_url
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $last_login_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Role|null $role
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\DailyJournal> $dailyJournals
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StudentClass> $studentClasses
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $students
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $parents
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User active()
 * @method static \Illuminate\Database\Eloquent\Builder|User byRole($role)
 * @method static \Illuminate\Database\Eloquent\Builder|User students()
 * @method static \Illuminate\Database\Eloquent\Builder|User teachers()
 * @method static \Illuminate\Database\Eloquent\Builder|User parents()
 * @method static \Illuminate\Database\Eloquent\Builder|User admins()
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'nis',
        'nip',
        'phone',
        'birth_date',
        'gender',
        'address',
        'avatar_url',
        'is_active',
        'last_login_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'birth_date' => 'date',
            'is_active' => 'boolean',
            'last_login_at' => 'datetime',
        ];
    }

    /**
     * Get the role that owns the user.
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Get the daily journals for the student.
     */
    public function dailyJournals(): HasMany
    {
        return $this->hasMany(DailyJournal::class, 'student_id');
    }

    /**
     * Get the student classes for this user (if student).
     */
    public function studentClasses(): HasMany
    {
        return $this->hasMany(StudentClass::class, 'student_id');
    }

    /**
     * Get the students for this user (if parent).
     */
    public function students(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'student_parents', 'parent_id', 'student_id')
                    ->withPivot('relationship', 'is_primary')
                    ->withTimestamps();
    }

    /**
     * Get the parents for this user (if student).
     */
    public function parents(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'student_parents', 'student_id', 'parent_id')
                    ->withPivot('relationship', 'is_primary')
                    ->withTimestamps();
    }

    /**
     * Scope a query to only include active users.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to filter users by role.
     */
    public function scopeByRole($query, $role)
    {
        return $query->whereHas('role', function ($q) use ($role) {
            $q->where('name', $role);
        });
    }

    /**
     * Scope a query to only include students.
     */
    public function scopeStudents($query)
    {
        return $query->byRole('student');
    }

    /**
     * Scope a query to only include teachers.
     */
    public function scopeTeachers($query)
    {
        return $query->byRole('teacher');
    }

    /**
     * Scope a query to only include parents.
     */
    public function scopeParents($query)
    {
        return $query->byRole('parent');
    }

    /**
     * Scope a query to only include admins.
     */
    public function scopeAdmins($query)
    {
        return $query->byRole('admin');
    }

    /**
     * Check if user has specific role.
     */
    public function hasRole(string $role): bool
    {
        return $this->role && $this->role->name === $role;
    }

    /**
     * Check if user is admin.
     */
    public function isAdmin(): bool
    {
        return $this->hasRole('admin');
    }

    /**
     * Check if user is teacher.
     */
    public function isTeacher(): bool
    {
        return $this->hasRole('teacher');
    }

    /**
     * Check if user is parent.
     */
    public function isParent(): bool
    {
        return $this->hasRole('parent');
    }

    /**
     * Check if user is student.
     */
    public function isStudent(): bool
    {
        return $this->hasRole('student');
    }
}