<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\DailyJournal
 *
 * @property int $id
 * @property int $student_id
 * @property \Illuminate\Support\Carbon $journal_date
 * @property string|null $wake_up_time
 * @property array|null $prayers
 * @property string|null $tilawah_surah
 * @property string|null $tilawah_ayah
 * @property string|null $tilawah_reflection
 * @property int|null $exercise_duration
 * @property array|null $healthy_eating
 * @property int|null $learning_minutes
 * @property string|null $learning_topic
 * @property string|null $learning_reflection
 * @property string|null $social_activities
 * @property string|null $bedtime
 * @property string|null $mood
 * @property string|null $personal_notes
 * @property array|null $activity_photos
 * @property float $daily_score
 * @property string|null $teacher_notes
 * @property float $teacher_adjustment
 * @property int|null $reviewed_by
 * @property \Illuminate\Support\Carbon|null $reviewed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $student
 * @property-read \App\Models\User|null $reviewer
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ScoreAuditLog> $auditLogs
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|DailyJournal newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DailyJournal newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DailyJournal query()
 * @method static \Illuminate\Database\Eloquent\Builder|DailyJournal forDate($date)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyJournal forStudent($studentId)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyJournal reviewed()
 * @method static \Database\Factories\DailyJournalFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class DailyJournal extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'student_id',
        'journal_date',
        'wake_up_time',
        'prayers',
        'tilawah_surah',
        'tilawah_ayah',
        'tilawah_reflection',
        'exercise_duration',
        'healthy_eating',
        'learning_minutes',
        'learning_topic',
        'learning_reflection',
        'social_activities',
        'bedtime',
        'mood',
        'personal_notes',
        'activity_photos',
        'daily_score',
        'teacher_notes',
        'teacher_adjustment',
        'reviewed_by',
        'reviewed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'journal_date' => 'date',
        'prayers' => 'array',
        'healthy_eating' => 'array',
        'activity_photos' => 'array',
        'daily_score' => 'decimal:2',
        'teacher_adjustment' => 'decimal:2',
        'exercise_duration' => 'integer',
        'learning_minutes' => 'integer',
        'student_id' => 'integer',
        'reviewed_by' => 'integer',
        'reviewed_at' => 'datetime',
    ];

    /**
     * Scope a query for specific date.
     */
    public function scopeForDate($query, $date)
    {
        return $query->where('journal_date', $date);
    }

    /**
     * Scope a query for specific student.
     */
    public function scopeForStudent($query, $studentId)
    {
        return $query->where('student_id', $studentId);
    }

    /**
     * Scope a query for reviewed journals.
     */
    public function scopeReviewed($query)
    {
        return $query->whereNotNull('reviewed_by');
    }

    /**
     * Get the student that owns the journal.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Get the reviewer (teacher) of the journal.
     */
    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    /**
     * Get the audit logs for this journal.
     */
    public function auditLogs(): HasMany
    {
        return $this->hasMany(ScoreAuditLog::class);
    }

    /**
     * Calculate and update the daily score based on habits.
     */
    public function calculateScore(): float
    {
        $score = 0;
        
        // Wake up early (10 points)
        if ($this->wake_up_time) {
            $wakeTime = \Carbon\Carbon::parse($this->wake_up_time);
            $fourAm = \Carbon\Carbon::createFromTime(4, 0);
            $sixAm = \Carbon\Carbon::createFromTime(6, 0);
            $sevenAm = \Carbon\Carbon::createFromTime(7, 0);
            
            if ($wakeTime->between($fourAm, $sixAm)) {
                $score += 10;
            } elseif ($wakeTime->lt($sevenAm)) {
                $score += 5;
            }
        }
        
        // Prayers (20 points total)
        if ($this->prayers) {
            $prayerCount = count($this->prayers);
            $score += min($prayerCount * 2, 10); // Max 10 for prayers
            
            if ($this->tilawah_surah && $this->tilawah_reflection) {
                $score += 10; // Tilawah + reflection
            }
        }
        
        // Exercise (10 points)
        if ($this->exercise_duration) {
            if ($this->exercise_duration >= 30) {
                $score += 10;
            } elseif ($this->exercise_duration >= 15) {
                $score += 5;
            }
        }
        
        // Healthy eating (15 points)
        if ($this->healthy_eating) {
            $eatingScore = 0;
            $portions = $this->healthy_eating;
            
            foreach (['staple', 'protein', 'vegetables', 'fruits', 'milk', 'water'] as $item) {
                if (isset($portions[$item]) && $portions[$item]) {
                    $eatingScore += 2.5;
                }
            }
            $score += min($eatingScore, 15);
        }
        
        // Learning (15 points)
        if ($this->learning_minutes) {
            if ($this->learning_minutes >= 60) {
                $score += 15;
            } elseif ($this->learning_minutes >= 30) {
                $score += 8;
            }
        }
        
        // Socializing (10 points)
        if ($this->social_activities) {
            $score += 10;
        }
        
        // Early sleep (10 points)
        if ($this->bedtime) {
            $bedtime = \Carbon\Carbon::parse($this->bedtime);
            $tenThirty = \Carbon\Carbon::createFromTime(22, 30);
            $elevenThirty = \Carbon\Carbon::createFromTime(23, 30);
            
            if ($bedtime->lt($tenThirty)) {
                $score += 10;
            } elseif ($bedtime->lt($elevenThirty)) {
                $score += 5;
            }
        }
        
        // Add teacher adjustment
        $score += $this->teacher_adjustment;
        
        return min(max($score, 0), 100); // Ensure score is between 0-100
    }
}