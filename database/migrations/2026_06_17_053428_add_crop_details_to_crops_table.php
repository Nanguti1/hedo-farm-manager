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
        Schema::table('crops', function (Blueprint $table) {
            $table->string('scientific_name')->nullable()->after('name');
            $table->string('variety')->nullable()->after('scientific_name');
            $table->integer('days_to_germination')->nullable();
            $table->integer('days_to_maturity')->nullable();
            $table->string('frost_timing')->nullable(); // e.g., 'hardy', 'tender'
            $table->string('planting_depth')->nullable();
            $table->string('spacing')->nullable();
            $table->string('row_spacing')->nullable();
            $table->string('light_needs')->nullable();
            $table->string('water_needs')->nullable();
            $table->string('expected_yield')->nullable(); // e.g., '2kg per plant'
            $table->decimal('germination_rate', 5, 2)->nullable();
            $table->string('seed_supplier')->nullable();
            $table->string('seed_lot_number')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('crops', function (Blueprint $table) {
            $table->dropColumn([
                'scientific_name',
                'variety',
                'days_to_germination',
                'days_to_maturity',
                'frost_timing',
                'planting_depth',
                'spacing',
                'row_spacing',
                'light_needs',
                'water_needs',
                'expected_yield',
                'germination_rate',
                'seed_supplier',
                'seed_lot_number',
            ]);
        });
    }
};
