<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ScoreAuditLog
 *
 * @property int $id
 * @property int $daily_journal_id
 * @property int $user_id
 * @property string $action
 * @property float|null $old_score
 * @property float|null $new_score
 * @property string|null $old_notes
 * @property string|null $new_notes
 * @property string|null $reason
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\DailyJournal $dailyJournal
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ScoreAuditLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ScoreAuditLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ScoreAuditLog query()
 * @method static \Illuminate\Database\Eloquent\Builder|ScoreAuditLog forJournal($journalId)
 * @method static \Database\Factories\ScoreAuditLogFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ScoreAuditLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'daily_journal_id',
        'user_id',
        'action',
        'old_score',
        'new_score',
        'old_notes',
        'new_notes',
        'reason',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'old_score' => 'decimal:2',
        'new_score' => 'decimal:2',
        'daily_journal_id' => 'integer',
        'user_id' => 'integer',
    ];

    /**
     * Scope a query for specific journal.
     */
    public function scopeForJournal($query, $journalId)
    {
        return $query->where('daily_journal_id', $journalId);
    }

    /**
     * Get the daily journal that owns the audit log.
     */
    public function dailyJournal(): BelongsTo
    {
        return $this->belongsTo(DailyJournal::class);
    }

    /**
     * Get the user that performed the action.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}