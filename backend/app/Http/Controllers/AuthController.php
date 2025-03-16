<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
            
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => bcrypt($request->get('password')),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'Usuario creado correctamente',
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        // Validar los datos del request
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ]);

        // Si la validación falla, devolver errores
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Obtener las credenciales de login
        $credentials = $request->only(['email', 'password']);

        try {
            // Intentar autenticar al usuario
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Credenciales incorrectas'], 401);
            }

            // Obtener al usuario autenticado
            $user = auth()->user();

            // Devolver el token y los datos del usuario
            return response()->json([
                'token' => $token,
                'user' => $user  // Incluimos los datos del usuario en la respuesta
            ], 200);
        } catch (JWTException $e) {
            // Si ocurre un error al crear el token
            return response()->json(['error' => 'No se pudo crear el token, intente más tarde', 'exception' => $e->getMessage()], 500);
        }
    }


    public function getUser() {
        $user = Auth::user();
        return response()->json([
            'user_id' => $user->id,
            'email' => $user->email,
        ], 200);
    }

    public function logout() {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Cierre de sesión exitoso'], 200);
    }
}
