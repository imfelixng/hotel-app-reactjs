<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoomBookingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('room_booking', function (Blueprint $table) {
            $table->integer('room_id')->unsigned();
            $table->integer('booking_id')->unsigned();
            $table->integer('quantity')->unsigned()->default(1);
            $table->integer('price')->unsigned()->default(0);
            $table->foreign('room_id')->references('id')->on('rooms')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('booking_id')->references('id')->on('bookings')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('room_booking', function (Blueprint $table) {
            $table->dropForeign(['room_id']);
            $table->dropForeign(['booking_id']);
        });
        Schema::dropIfExists('room_booking');
    }
}
