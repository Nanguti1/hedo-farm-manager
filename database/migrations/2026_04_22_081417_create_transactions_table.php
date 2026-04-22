<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farm_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['income', 'expense']);
            $table->foreignId('expense_category_id')->nullable()->constrained('expense_categories')->onDelete('set null');
            $table->foreignId('income_category_id')->nullable()->constrained('income_categories')->onDelete('set null');
            $table->decimal('amount', 14, 2);
            $table->text('description')->nullable();
            $table->date('transaction_date');
            $table->string('reference')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('farm_id');
            $table->index('type');
            $table->index('expense_category_id');
            $table->index('income_category_id');
            $table->index('transaction_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
