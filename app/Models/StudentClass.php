<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\StudentClass
 *
 * @property int $id
 * @property int $student_id
 * @property int $class_id
 * @property int|null $homeroom_teacher_id
 * @property string $academic_year
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $student
 * @property-read \App\Models\SchoolClass $schoolClass
 * @property-read \App\Models\User|null $homeroomTeacher
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClass newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClass newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClass query()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClass active()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClass whereAcademicYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClass whereClassId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClass whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClass whereHomeroomTeacherId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClass whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClass whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClass whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClass whereUpdatedAt($value)
 * @method static \Database\Factories\StudentClassFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class StudentClass extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'student_classes';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'student_id',
        'class_id',
        'homeroom_teacher_id',
        'academic_year',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'student_id' => 'integer',
        'class_id' => 'integer',
        'homeroom_teacher_id' => 'integer',
    ];

    /**
     * Scope a query to only include active student classes.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the student that belongs to this class.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Get the school class.
     */
    public function schoolClass(): BelongsTo
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    /**
     * Get the homeroom teacher.
     */
    public function homeroomTeacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'homeroom_teacher_id');
    }
}