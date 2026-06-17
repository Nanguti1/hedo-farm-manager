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
        Schema::create('soil_samples', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farm_id')->constrained()->onDelete('cascade');
            $table->foreignId('grow_location_id')->constrained()->onDelete('cascade');
            $table->date('sample_date');
            $table->decimal('ph', 4, 2)->nullable();
            $table->decimal('nitrogen', 8, 2)->nullable();
            $table->decimal('phosphorus', 8, 2)->nullable();
            $table->decimal('potassium', 8, 2)->nullable();
            $table->decimal('organic_matter', 5, 2)->nullable();
            $table->decimal('moisture', 5, 2)->nullable();
            $table->string('lab_report_path')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index('farm_id');
            $table->index('grow_location_id');
            $table->index('sample_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('soil_samples');
    }
};
