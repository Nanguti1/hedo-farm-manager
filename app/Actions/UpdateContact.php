                                                                                                                                                                                                                                                <?php

namespace App\Actions;

use App\Models\Contact;
use Illuminate\Support\Facades\Validator;

class UpdateContact
{
    public function execute(Contact $contact, array $data): Contact
    {
        Validator::make($data, [
            'name' => 'sometimes|string|max:255',
            'type' => 'sometimes|in:supplier,customer,vet,contractor,other',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'notes' => 'nullable|string',
        ])->validate();

        $contact->update($data);

        return $contact->fresh();
    }
}
