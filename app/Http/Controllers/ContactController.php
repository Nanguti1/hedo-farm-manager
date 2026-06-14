<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;
use App\Services\ContactService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function __construct(
        private ContactService $contactService,
    ) {}

    public function index(): Response
    {
        $this->authorize('viewAny', Contact::class);

        $farmId = auth()->user()->farm_id;
        $contacts = $this->contactService->getContactsByFarm($farmId);

        return Inertia::render('Contacts/Index', [
            'contacts' => $contacts,
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Contact::class);

        return Inertia::render('Contacts/Create');
    }

    public function store(StoreContactRequest $request): RedirectResponse
    {
        $this->authorize('create', Contact::class);

        $farmId = auth()->user()->farm_id;
        $contact = $this->contactService->createContact($farmId, $request->validated());

        return redirect()
            ->route('contacts.show', $contact->id)
            ->with('success', 'Contact created successfully');
    }

    public function show(Contact $contact): Response
    {
        $this->authorize('view', $contact);

        $contact = $this->contactService->getContactById($contact->id);

        return Inertia::render('Contacts/Show', [
            'contact' => $contact,
        ]);
    }

    public function edit(Contact $contact): Response
    {
        $this->authorize('update', $contact);

        $contact = $this->contactService->getContactById($contact->id);

        return Inertia::render('Contacts/Edit', [
            'contact' => $contact,
        ]);
    }

    public function update(UpdateContactRequest $request, Contact $contact): RedirectResponse
    {
        $this->authorize('update', $contact);

        $this->contactService->updateContact($contact, $request->validated());

        return redirect()
            ->route('contacts.show', $contact->id)
            ->with('success', 'Contact updated successfully');
    }

    public function destroy(Contact $contact): RedirectResponse
    {
        $this->authorize('delete', $contact);

        $this->contactService->deleteContact($contact);

        return redirect()
            ->route('contacts.index')
            ->with('success', 'Contact deleted successfully');
    }
}
