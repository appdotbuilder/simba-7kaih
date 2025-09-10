<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\SchoolClass
 *
 * @property int $id
 * @property string $name
 * @property string $grade
 * @property string $major
 * @property int $class_number
 * @property string $academic_year
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StudentClass> $studentClasses
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolClass newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolClass newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolClass query()
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolClass active()
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolClass whereAcademicYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolClass whereClassNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolClass whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolClass whereGrade($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolClass whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolClass whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolClass whereMajor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolClass whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SchoolClass whereUpdatedAt($value)
 * @method static \Database\Factories\SchoolClassFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class SchoolClass extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'classes';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'grade',
        'major',
        'class_number',
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
        'class_number' => 'integer',
    ];

    /**
     * Scope a query to only include active classes.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the student classes for this class.
     */
    public function studentClasses(): HasMany
    {
        return $this->hasMany(StudentClass::class, 'class_id');
    }
}