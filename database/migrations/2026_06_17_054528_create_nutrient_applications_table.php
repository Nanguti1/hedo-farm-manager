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
        Schema::create('nutrient_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farm_id')->constrained()->onDelete('cascade');
            $table->foreignId('grow_location_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('planting_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('fertilizer_type');
            $table->boolean('is_organic')->default(false);
            $table->decimal('quantity', 10, 2);
            $table->string('unit');
            $table->string('application_method')->nullable();
            $table->date('application_date');
            $table->decimal('cost', 10, 2)->nullable();
            $table->string('applicator')->nullable();
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
        Schema::dropIfExists('nutrient_applications');
    }
};
