<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;

class InsufficientStockException extends Exception
{
    protected $message = 'Insufficient stock for this operation.';

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
