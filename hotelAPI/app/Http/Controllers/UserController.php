<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::orderBy('id', 'desc');
        if ($search = $request->input('search')) {
            $users->where('name', 'like', "%$search%");
        }
        $users = $users->paginate(10);
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($valid->passes()) {
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password')),
            ]);
            return response()->json([
                'message' => "Tạo User $user->name ($user->email) thành công",
                'user' => $user->toArray()
            ]);
        } else {
            $errors = $valid->errors();
            $data = [];
            !$errors->has('name') ?: $data['name'] = $errors->first('name');
            !$errors->has('email') ?: $data['email'] = $errors->first('email');
            !$errors->has('password') ?: $data['password'] = $errors->first('password');
            return response()->json([
                'errors' => $data
            ]);
        }
    }

    public function show($id) {
        if ($user = User::find($id)) {
            return response()->json($user);
        }
        return response()->json([
            'error' => 'Xảy ra lỗi trong lúc tìm'
        ]);
    }

    public function update(Request $request, $id)
    {
        $valid = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'string|min:6|confirmed',
        ]);

        if ($valid->passes()) {
            $user = User::find($id);
            if ($user != null) {
                $user->name = $request->input('name');
                $user->email = $request->input('email');
                if ($request->input('password')) {
                    $user->password = bcrypt($request->input('password'));
                }
                $user->save();
                return response()->json([
                    'message' => "Cập nhật User $user->name ($user->email) thành công",
                    'user' => $user->toArray()
                ]);
            } else {
                return response()->json([
                    'error' => 'Xảy ra lỗi trong lúc cập nhật'
                ]);
            }
        } else {
            $errors = $valid->errors();
            $data = [];
            !$errors->has('name') ?: $data['name'] = $errors->first('name');
            !$errors->has('email') ?: $data['email'] = $errors->first('email');
            !$errors->has('password') ?: $data['password'] = $errors->first('password');
            return response()->json([
                'errors' => $data
            ]);
        }
    }


    public function delete(Request $request, $id)
    {
        if ($user = User::find($id)) {
            $user->delete();
            return response()->json([
                'message' => "Đã xóa thành công User $user->name"
            ]);
        }
        return response()->json([
            'error' => 'Xảy ra lỗi trong lúc xóa'
        ]);
    }
}
