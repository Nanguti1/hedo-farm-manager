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
        Schema::create('animals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farm_id')->constrained()->onDelete('cascade');
            $table->string('tag_number')->unique();
            $table->string('name')->nullable();
            $table->foreignId('breed_id')->nullable()->constrained('animal_breeds')->onDelete('set null');
            $table->foreignId('category_id')->nullable()->constrained('animal_categories')->onDelete('set null');
            $table->enum('gender', ['male', 'female']);
            $table->date('birth_date');
            $table->date('purchase_date')->nullable();
            $table->enum('status', ['active', 'sold', 'dead'])->default('active');
            $table->decimal('weight', 8, 2)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index('farm_id');
            $table->index('tag_number');
            $table->index('breed_id');
            $table->index('category_id');
            $table->index('status');
            $table->index('birth_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
