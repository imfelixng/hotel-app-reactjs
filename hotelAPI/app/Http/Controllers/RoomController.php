<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Room;
use Illuminate\Support\Facades\Validator;

class RoomController extends Controller
{
    public function index(Request $request)
    {
        $rooms = Room::orderBy('number', 'asc');
        if ($search = $request->input('search')) {
            $rooms->where('number', 'like', "%$search%");
        }

        if ($request->input('all') == true) {
            $rooms = $rooms->get();
        } else {
            $rooms = $rooms->paginate(10);
        }

        return response()->json($rooms);
    }

    public function store(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'number' => 'required|numeric|unique:rooms,number',
            'type' => 'required|string|in:"single","double","triple"',
            'min' => 'required|numeric|min:1',
            'max' => 'required|numeric',
            'hasWifi' => 'required|numeric|in:0,1',
            'price' => 'required|numeric|min:0'
        ]);

        if ($valid->passes()) {
            $room = Room::create([
                'number' => $request->input('number'),
                'type' => $request->input('type'),
                'min' => $request->input('min'),
                'max' => $request->input('max'),
                'hasWifi' => $request->input('hasWifi'),
                'price' => $request->input('price'),
            ]);
            return response()->json([
                'message' => "Tạo Room $room->number ($room->type) thành công",
                'room' => $room->toArray()
            ]);
        } else {
            $errors = $valid->errors();
            $data = [];
            !$errors->has('number') ?: $data['number'] = $errors->first('number');
            !$errors->has('type') ?: $data['type'] = $errors->first('type');
            !$errors->has('min') ?: $data['min'] = $errors->first('min');
            !$errors->has('max') ?: $data['max'] = $errors->first('max');
            !$errors->has('hasWifi') ?: $data['hasWifi'] = $errors->first('hasWifi');
            !$errors->has('price') ?: $data['price'] = $errors->first('price');
            return response()->json([
                'errors' => $data
            ]);
        }
    }

    public function show($id)
    {
        if ($room = Room::find($id)) {
            return response()->json($room);
        }
        return response()->json([
            'error' => 'Xảy ra lỗi trong lúc tìm'
        ]);
    }

    public function update(Request $request, $id)
    {
        $valid = Validator::make($request->all(), [
            'number' => 'required|numeric|unique:rooms,number,' . $id,
            'type' => 'required|string|in:"single","double","triple"',
            'min' => 'required|numeric|min:1',
            'max' => 'required|numeric',
            'hasWifi' => 'required|numeric|in:0,1',
            'price' => 'required|numeric|min:0'
        ]);

        if ($valid->passes()) {
            $room = Room::find($id);
            if ($room != null) {
                $room->number = $request->input('number');
                $room->type = $request->input('type');
                $room->min = $request->input('min');
                $room->max = $request->input('max');
                $room->hasWifi = $request->input('hasWifi');
                $room->price = $request->input('price');
                $room->save();
                return response()->json([
                    'message' => "Cập nhật Room $room->number ($room->type) thành công",
                    'room' => $room->toArray()
                ]);
            } else {
                return response()->json([
                    'error' => 'Xảy ra lỗi trong lúc cập nhật'
                ]);
            }
        } else {
            $errors = $valid->errors();
            $data = [];
            !$errors->has('number') ?: $data['number'] = $errors->first('number');
            !$errors->has('type') ?: $data['type'] = $errors->first('type');
            !$errors->has('min') ?: $data['min'] = $errors->first('min');
            !$errors->has('max') ?: $data['max'] = $errors->first('max');
            !$errors->has('hasWifi') ?: $data['hasWifi'] = $errors->first('hasWifi');
            !$errors->has('price') ?: $data['price'] = $errors->first('price');
            return response()->json([
                'errors' => $data
            ]);
        }
    }


    public function delete(Request $request, $id)
    {
        if ($room = Room::find($id)) {
            $room->delete();
            return response()->json([
                'message' => "Đã xóa thành công Room $room->number"
            ]);
        }
        return response()->json([
            'error' => 'Xảy ra lỗi trong lúc xóa'
        ]);
    }
}
