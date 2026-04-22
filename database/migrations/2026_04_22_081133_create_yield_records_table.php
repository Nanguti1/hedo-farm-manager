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
        Schema::create('yield_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('crop_cycle_id')->constrained()->onDelete('cascade');
            $table->decimal('quantity', 12, 2);
            $table->string('unit');
            $table->date('harvest_date');
            $table->string('quality_grade')->nullable();
            $table->timestamps();
            $table->index('crop_cycle_id');
            $table->index('harvest_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('yield_records');
    }
};
