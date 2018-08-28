<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    const STATUS_AWAITING = 0;
    const STATUS_DENIED = 1;
    const STATUS_ACCEPTED = 2;
    const STATUS_DEPOSITED = 3;
    const STATUS_COMPLETED = 4;

    protected $table = 'bookings';

    protected $fillable = [
        'guestName',
        'guestPhone',
        'deposit',
        'quantity',
        'adults',
        'kids',
        'checkin',
        'checkout',
        'status',
    ];

    public function rooms() {
        return $this->belongsToMany('App\Room', 'room_booking', 'booking_id', 'room_id');
    }

}
