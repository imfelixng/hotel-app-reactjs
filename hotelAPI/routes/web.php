<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::group(['prefix' => 'api'], function() {
    Route::get('/users', 'UserController@index')->name('user.index');
    Route::post('/users/create', 'UserController@store')->name('user.store');
    Route::get('/users/{id}', 'UserController@show')->name('user.show');
    Route::put('/users/{id}', 'UserController@update')->name('user.update');
    Route::delete('/users/{id}', 'UserController@delete')->name('user.delete');

    Route::get('/rooms', 'RoomController@index')->name('room.index');
    Route::post('/rooms/create', 'RoomController@store')->name('room.store');
    Route::get('/rooms/{id}', 'RoomController@show')->name('room.show');
    Route::put('/rooms/{id}', 'RoomController@update')->name('room.update');
    Route::delete('/rooms/{id}', 'RoomController@delete')->name('room.delete');

    Route::get('/bookings', 'BookingController@index')->name('booking.index');
    Route::get('/bookings/create', 'BookingController@create')->name('booking.create');
    Route::post('/bookings/create', 'BookingController@store')->name('booking.store');
    Route::get('/bookings/{id}', 'BookingController@show')->name('booking.show');
    Route::put('/bookings/{id}', 'BookingController@update')->name('booking.update');
    Route::delete('/bookings/{id}', 'BookingController@delete')->name('booking.delete');
});