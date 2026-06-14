<?php

namespace App\Actions;

use App\Models\Contact;
use Illuminate\Support\Facades\Validator;

class CreateContact
{
    public function execute(int $farmId, array $data): Contact
    {
        Validator::make($data, [
            'name' => 'required|string|max:255',
            'type' => 'required|in:supplier,customer,vet,contractor,other',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'notes' => 'nullable|string',
        ])->validate();

        return Contact::create([
            'farm_id' => $farmId,
            'name' => $data['name'],
            'type' => $data['type'],
            'phone' => $data['phone'] ?? null,
            'email' => $data['email'] ?? null,
            'address' => $data['address'] ?? null,
            'notes' => $data['notes'] ?? null,
        ]);
    }
}
