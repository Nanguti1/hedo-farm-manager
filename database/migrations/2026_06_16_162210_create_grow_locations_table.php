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
        Schema::create('grow_locations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farm_id')->constrained()->onDelete('cascade');
            $table->foreignId('parent_id')->nullable()->constrained('grow_locations')->onDelete('cascade');
            $table->string('name');
            $table->enum('type', ['field', 'greenhouse', 'nursery', 'orchard', 'container', 'bed', 'row']);
            $table->decimal('area_size', 10, 2)->nullable();
            $table->string('area_unit')->nullable();
            $table->string('gps_coordinates')->nullable();
            $table->json('polygon')->nullable();
            $table->enum('status', ['active', 'inactive', 'maintenance'])->default('active');
            $table->text('description')->nullable();
            $table->timestamps();
            
            $table->index('farm_id');
            $table->index('parent_id');
            $table->index('type');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grow_locations');
    }
};
