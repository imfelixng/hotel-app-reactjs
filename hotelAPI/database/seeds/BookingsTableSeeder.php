<?php

use Illuminate\Database\Seeder;

class BookingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Booking::class, 100)->create()->each(function($booking) {
            $roomsId = [];
            $rooms = rand(1,4);
            for ($i = 0; $i < $rooms; $i++) {
                $rand = rand(1,100);
                if (!in_array($rand, $roomsId)) {
                    $roomsId[] = $rand;
                } else {
                    $i--;
                }
            }
            $booking->rooms()->sync($roomsId);
        });
    }
}
