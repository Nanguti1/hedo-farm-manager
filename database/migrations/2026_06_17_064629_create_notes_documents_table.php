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
        Schema::create('notes_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farm_id')->constrained()->onDelete('cascade');
            $table->morphs('notable'); // Linked to Crop, GrowLocation, Planting, etc.
            $table->string('title')->nullable();
            $table->text('content')->nullable();
            $table->string('file_path')->nullable();
            $table->string('file_type')->nullable(); // image, pdf, etc.
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Who created the note
            $table->timestamps();

            $table->index('farm_id');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes_documents');
    }
};
