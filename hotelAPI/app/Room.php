<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = [
        'number',
        'type',
        'min',
        'max',
        'hasWifi',
        'price',
    ];
    public function bookings() {
        return $this->belongsToMany('App\Booking', 'room_booking', 'room_id', 'booking_id');
    }
}
