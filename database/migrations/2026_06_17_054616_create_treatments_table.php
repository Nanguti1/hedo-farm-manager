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
        Schema::create('treatments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farm_id')->constrained()->onDelete('cascade');
            $table->foreignId('grow_location_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('planting_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('treatment_type'); // e.g., herbicide, fungicide, insecticide
            $table->string('product_used');
            $table->string('active_ingredient')->nullable();
            $table->string('dosage')->nullable();
            $table->string('application_method')->nullable();
            $table->date('application_date');
            $table->string('reentry_interval')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index('farm_id');
            $table->index('grow_location_id');
            $table->index('planting_id');
            $table->index('application_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('treatments');
    }
};
