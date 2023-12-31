<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:20|unique:users,name',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols()
            ]
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Il campo Nome Utente è richiesto.',
            'name.max' => 'Il Nome Utente può avere una lunghezza massima di 20 caratteri.',
            'name.unique' => 'Il Nome Utente inserito esiste già.',
            'email.required' => 'Il campo Email è richiesto.',
            'email.unique' => 'L\'indirizzo email inserito esiste già.',
            'password.required' => 'Il campo Password è richiesto.',
            'password.confirmed' => 'Le Password non corrispondono',
            'password.min' => 'La Password deve contenere almeno 8 caratteri.',
        ];
    }
}
