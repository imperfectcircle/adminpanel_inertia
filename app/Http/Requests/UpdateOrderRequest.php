<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
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
            'first_name' => 'required|string|min:3',
            'last_name' => 'required|string|min:3',
            'order_items' => 'required',
            'email' => 'required|email',
            'amount' => 'required',
            'state' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'first_name.required' => 'Il campo Nome Cliente è richiesto.',
            'first_name.string' => 'Il campo Nome Cliente deve essere di tipo testo.',
            'first_name.min' => 'Il campo Nome Cliente deve contenere almeno 3 caratteri.',
            'last_name.required' => 'Il campo Cognome Cliente è richiesto.',
            'last_name.string' => 'Il campo Cognome Cliente deve essere di tipo testo.',
            'last_name.min' => 'Il campo Cognome Cliente deve contenere almeno 3 caratteri.',
            'order_items.required' => 'Il campo Ordine è richiesto',
            'email.required' => 'Il campo Email di Contatto è richiesto.',
            'email.email' => 'Inserisci un indirizzo email valido.',
            'amount.required' => 'Il campo Totale è richiesto.',
            'state.required' => 'Il campo Stato è richiesto.'
        ];
    }
}
