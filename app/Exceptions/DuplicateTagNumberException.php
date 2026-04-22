<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;

class DuplicateTagNumberException extends Exception
{
    protected $message = 'An animal with this tag number already exists.';

    public function render(Request $request)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'message' => $this->message,
            ], 422);
        }

        return back()
            ->withInput()
            ->with('error', $this->message);
    }
}
