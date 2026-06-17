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
        Schema::create('plantings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farm_id')->constrained()->onDelete('cascade');
            $table->foreignId('crop_id')->constrained()->onDelete('cascade');
            $table->foreignId('grow_location_id')->constrained()->onDelete('cascade');
            $table->string('variety')->nullable();
            $table->string('season');
            $table->enum('status', ['planned', 'seeded', 'transplanted', 'growing', 'harvested', 'failed'])->default('planned');
            $table->date('seed_start_date')->nullable();
            $table->date('transplant_date')->nullable();
            $table->date('direct_seed_date')->nullable();
            $table->date('expected_harvest_date')->nullable();
            $table->date('actual_harvest_date')->nullable();
            $table->integer('number_of_plants')->nullable();
            $table->integer('number_of_rows')->nullable();
            $table->decimal('area_occupied', 10, 2)->nullable();
            $table->string('area_unit')->nullable();
            $table->integer('succession_number')->default(1);
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index('farm_id');
            $table->index('crop_id');
            $table->index('grow_location_id');
            $table->index('season');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plantings');
    }
};
