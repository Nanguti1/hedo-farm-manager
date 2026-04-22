<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;

class InvalidCropCycleTransitionException extends Exception
{
    protected $message = 'Invalid crop cycle status transition.';

    public function render(Request $request)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'message' => $this->getMessage(),
            ], 422);
        }

        return back()
            ->withInput()
            ->with('error', $this->getMessage());
    }
}
