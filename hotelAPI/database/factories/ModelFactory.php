<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Room::class, function (Faker\Generator $faker) {
    $number = $faker->unique()->numberBetween(100,300);
    $type = ['single', 'double', 'triple'];
    $type = $type[rand(0,2)];
    $min = 1;
    $max = rand(2,8);
    $hasWifi = rand(0,1);
    $price = rand(200,1000);
    return [
        'number' => $number,
        'type' => $type,
        'min' => $min,
        'max' => $max,
        'hasWifi' => $hasWifi,
        'price' => $price
    ];
});

$factory->define(App\Booking::class, function (Faker\Generator $faker) {
    $guestName = $faker->name;
    $guestPhone = $faker->phoneNumber;
    $deposit = rand(100,200);
    $adults = rand(1,10);
    $kids = rand(1,10);
    $time = time();
    $checkin = $time;
    $checkout = $time + rand(86400, 86400*7);
    $status = rand(0,3);
    return [
        'guestName' => $guestName,
        'guestPhone' => $guestPhone,
        'deposit' => $deposit,
        'adults' => $adults,
        'kids' => $kids,
        'checkin' => $checkin,
        'checkout' => $checkout,
        'status' => $status
    ];
});