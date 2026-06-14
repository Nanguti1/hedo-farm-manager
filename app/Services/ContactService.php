<?php

namespace App\Services;

use App\Actions\CreateContact;
use App\Actions\UpdateContact;
use App\Models\Contact;
use Illuminate\Pagination\LengthAwarePaginator;

class ContactService
{
    public function __construct(
        private CreateContact $createContact,
        private UpdateContact $updateContact,
    ) {}

    public function getContactsByFarm(int $farmId, ?int $perPage = 15): LengthAwarePaginator
    {
        return Contact::query()
            ->where('farm_id', $farmId)
            ->orderBy('name')
            ->paginate($perPage);
    }

    public function getContactById(int $id): Contact
    {
        return Contact::query()
            ->with(['farm'])
            ->findOrFail($id);
    }

    public function createContact(int $farmId, array $data): Contact
    {
        return $this->createContact->execute($farmId, $data);
    }

    public function updateContact(Contact $contact, array $data): Contact
    {
        return $this->updateContact->execute($contact, $data);
    }

    public function deleteContact(Contact $contact): bool
    {
        return $contact->delete();
    }
}
