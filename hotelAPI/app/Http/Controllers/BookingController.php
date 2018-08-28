<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Booking;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = Booking::orderBy('id', 'desc');
        if ($search = $request->input('search')) {
            $bookings->where('guestName', 'like', "%$search%");
        }
        $bookings = $bookings->paginate(10);
        return response()->json($bookings);
    }

    public function store(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'guestName' => 'required|string|max:255',
            'guestPhone' => 'required',
            'deposit' => 'required|numeric|min:0',
            'adults' => 'required|numeric|min:1',
            'kids' => 'required|numeric|min:0',
            'checkin' => 'required|numeric|min:0',
            'checkout' => 'required|numeric|min:0',
            'status' => 'required|numeric|in:0,1,2,3',
            'rooms.0' => 'required'
        ], [
            'rooms.0.required' => 'The rooms field is required as least one value.'
        ]);

        if ($valid->passes()) {
            $booking = Booking::create([
                'guestName' => $request->input('guestName'),
                'guestPhone' => $request->input('guestPhone'),
                'deposit' => $request->input('deposit'),
                'adults' => $request->input('adults'),
                'kids' => $request->input('kids'),
                'checkin' => $request->input('checkin'),
                'checkout' => $request->input('checkout'),
                'status' => $request->input('status'),
            ]);
            $booking->rooms()->sync($request->input('rooms'));
            return response()->json([
                'message' => "Tạo Booking $booking->id ($booking->guestName - $booking->guestPhone) thành công",
                'booking' => $booking->toArray()
            ]);
        } else {
            $errors = $valid->errors();
            $data = [];
            !$errors->has('guestName') ?: $data['guestName'] = $errors->first('guestName');
            !$errors->has('guestPhone') ?: $data['guestPhone'] = $errors->first('guestPhone');
            !$errors->has('deposit') ?: $data['deposit'] = $errors->first('deposit');
            !$errors->has('quantity') ?: $data['quantity'] = $errors->first('quantity');
            !$errors->has('adults') ?: $data['adults'] = $errors->first('adults');
            !$errors->has('kids') ?: $data['kids'] = $errors->first('kids');
            !$errors->has('checkin') ?: $data['checkin'] = $errors->first('checkin');
            !$errors->has('checkout') ?: $data['checkout'] = $errors->first('checkout');
            !$errors->has('status') ?: $data['status'] = $errors->first('status');
            !$errors->has('rooms.0') ?: $data['rooms'] = $errors->first('rooms.0');
            return response()->json([
                'errors' => $data
            ]);
        }
    }

    public function show($id)
    {
        if ($booking = Booking::find($id)) {
            $booking->rooms;
            return response()->json($booking);
        }
        return response()->json([
            'error' => 'Xảy ra lỗi trong lúc tìm'
        ]);
    }

    public function update(Request $request, $id)
    {
        $valid = Validator::make($request->all(), [
            'guestName' => 'required|string|max:255',
            'guestPhone' => 'required',
            'deposit' => 'required|numeric|min:0',
            'adults' => 'required|numeric|min:1',
            'kids' => 'required|numeric|min:0',
            'checkin' => 'required|numeric|min:0',
            'checkout' => 'required|numeric|min:0',
            'status' => 'required|numeric|in:0,1,2,3,4',
            'rooms.0' => 'required'
        ], [
            'rooms.0.required' => 'The rooms field is required as least one value.'
        ]);

        if ($valid->passes()) {
            $booking = Booking::find($id);
            if ($booking != null) {
                $booking->guestName = $request->input('guestName');
                $booking->guestPhone = $request->input('guestPhone');
                $booking->deposit = $request->input('deposit');
                $booking->adults = $request->input('adults');
                $booking->kids = $request->input('kids');
                $booking->checkin = $request->input('checkin');
                $booking->checkout = $request->input('checkout');
                $booking->status = $request->input('status');
                $booking->save();
                $booking->rooms()->sync($request->input('rooms'));
                return response()->json([
                    'message' => "Cập nhật Booking $booking->id ($booking->guestName - $booking->guestPhone) thành công",
                    'booking' => $booking->toArray()
                ]);
            } else {
                return response()->json([
                    'error' => 'Xảy ra lỗi trong lúc cập nhật'
                ]);
            }
        } else {
            $errors = $valid->errors();
            $data = [];
            !$errors->has('guestName') ?: $data['guestName'] = $errors->first('guestName');
            !$errors->has('guestPhone') ?: $data['guestPhone'] = $errors->first('guestPhone');
            !$errors->has('deposit') ?: $data['deposit'] = $errors->first('deposit');
            !$errors->has('adults') ?: $data['adults'] = $errors->first('adults');
            !$errors->has('kids') ?: $data['kids'] = $errors->first('kids');
            !$errors->has('checkin') ?: $data['checkin'] = $errors->first('checkin');
            !$errors->has('checkout') ?: $data['checkout'] = $errors->first('checkout');
            !$errors->has('status') ?: $data['status'] = $errors->first('status');
            !$errors->has('rooms.0') ?: $data['rooms'] = $errors->first('rooms.0');
            return response()->json([
                'errors' => $data
            ]);
        }
    }


    public function delete(Request $request, $id)
    {
        if ($booking = Booking::find($id)) {
            $booking->delete();
            return response()->json([
                'message' => "Đã xóa thành công Booking $booking->id ($booking->guestName - $booking->guestPhone)"
            ]);
        }
        return response()->json([
            'error' => 'Xảy ra lỗi trong lúc xóa'
        ]);
    }
}
