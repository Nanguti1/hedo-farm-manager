// Farm Types
export interface FarmFormData {
    name: string;
    location: string;
    size: number;
    description: string;
    is_active: boolean;
}

export interface Farm {
    id: number;
    name: string;
    location: string;
    size: number;
    description: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    users_count?: number;
    animals_count?: number;
    fields_count?: number;
}

// Animal Types
export interface Animal {
    id: number;
    farm_id: number;
    tag_number: string;
    name: string | null;
    breed: AnimalBreed;
    category: AnimalCategory;
    gender: 'male' | 'female';
    birth_date: string;
    purchase_date: string | null;
    status: 'active' | 'sold' | 'dead';
    weight: number | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
    health_records?: HealthRecord[];
}

export interface AnimalBreed {
    id: number;
    name: string;
    description: string | null;
}

export interface AnimalCategory {
    id: number;
    name: string;
}

export interface HealthRecord {
    id: number;
    animal_id: number;
    farm_id: number;
    record_type: string;
    description: string;
    treatment_date: string;
    next_due_date: string | null;
    cost: number | null;
    created_at: string;
}

// Crop Types
export interface CropCycle {
    id: number;
    farm_id: number;
    field: Field;
    crop: Crop;
    planting_date: string;
    expected_harvest_date: string;
    status: 'planted' | 'growing' | 'harvested';
    created_at: string;
    updated_at: string;
    yield_records?: YieldRecord[];
    product_batches?: ProductBatch[];
}

export interface Field {
    id: number;
    farm_id: number;
    name: string;
    size: number;
    location_coordinates: string | null;
}

export interface Crop {
    id: number;
    farm_id: number;
    name: string;
    scientific_name: string | null;
    category: string;
    variety: string | null;
    days_to_germination: number | null;
    days_to_maturity: number | null;
    frost_timing: string | null;
    planting_depth: string | null;
    spacing: string | null;
    row_spacing: string | null;
    light_needs: string | null;
    water_needs: string | null;
    expected_yield: string | null;
    germination_rate: number | null;
    seed_supplier: string | null;
    seed_lot_number: string | null;
}

export interface GrowLocation {
    id: number;
    farm_id: number;
    parent_id: number | null;
    name: string;
    type: 'field' | 'greenhouse' | 'nursery' | 'orchard' | 'container' | 'bed' | 'row';
    area_size: number | null;
    area_unit: string | null;
    gps_coordinates: string | null;
    polygon: any | null;
    status: 'active' | 'inactive' | 'maintenance';
    description: string | null;
    created_at: string;
    updated_at: string;
    parent?: GrowLocation;
    children?: GrowLocation[];
}

export interface Planting {
    id: number;
    farm_id: number;
    crop_id: number;
    grow_location_id: number;
    variety: string | null;
    season: string;
    status: 'planned' | 'seeded' | 'transplanted' | 'growing' | 'harvested' | 'failed';
    seed_start_date: string | null;
    transplant_date: string | null;
    direct_seed_date: string | null;
    expected_harvest_date: string | null;
    actual_harvest_date: string | null;
    number_of_plants: number | null;
    number_of_rows: number | null;
    area_occupied: number | null;
    area_unit: string | null;
    succession_number: number;
    notes: string | null;
    created_at: string;
    updated_at: string;
    crop?: Crop;
    growLocation?: GrowLocation;
    harvests?: Harvest[];
    nutrient_applications?: NutrientApplication[];
    treatments?: Treatment[];
}

export interface Harvest {
    id: number;
    farm_id: number;
    planting_id: number;
    crop_id: number;
    quantity: number;
    unit: string;
    quality_grade: string | null;
    market_destination: string | null;
    harvest_date: string;
    notes: string | null;
    created_at: string;
}

export interface NutrientApplication {
    id: number;
    farm_id: number;
    grow_location_id: number | null;
    planting_id: number | null;
    fertilizer_type: string;
    is_organic: boolean;
    quantity: number;
    unit: string;
    application_method: string | null;
    application_date: string;
    cost: number | null;
    applicator: string | null;
    notes: string | null;
    created_at: string;
}

export interface Treatment {
    id: number;
    farm_id: number;
    grow_location_id: number | null;
    planting_id: number | null;
    treatment_type: string;
    product_used: string;
    active_ingredient: string | null;
    dosage: string | null;
    application_method: string | null;
    application_date: string;
    reentry_interval: string | null;
    notes: string | null;
    created_at: string;
}

export interface SoilSample {
    id: number;
    farm_id: number;
    grow_location_id: number;
    sample_date: string;
    ph: number | null;
    nitrogen: number | null;
    phosphorus: number | null;
    potassium: number | null;
    organic_matter: number | null;
    moisture: number | null;
    lab_report_path: string | null;
    notes: string | null;
    created_at: string;
}

export interface CustomField {
    id: number;
    farm_id: number;
    fieldable_id: number;
    fieldable_type: string;
    name: string;
    value: string | null;
    type: 'text' | 'number' | 'date' | 'boolean';
}

export interface NoteDocument {
    id: number;
    farm_id: number;
    notable_id: number;
    notable_type: string;
    title: string | null;
    content: string | null;
    file_path: string | null;
    file_type: string | null;
    user_id: number;
    created_at: string;
    user?: User;
}

export interface YieldRecord {
    id: number;
    crop_cycle_id: number;
    quantity: number;
    unit: string;
    harvest_date: string;
    quality_grade: string | null;
    created_at: string;
}

// Inventory Types
export interface InventoryItem {
    id: number;
    farm_id: number;
    category: InventoryCategory;
    name: string;
    unit: string;
    quantity: number;
    reorder_level: number;
    is_low_stock: boolean;
    created_at: string;
    updated_at: string;
    transactions?: InventoryTransaction[];
}

export interface InventoryCategory {
    id: number;
    name: string;
}

export interface InventoryTransaction {
    id: number;
    inventory_item_id: number;
    farm_id: number;
    type: 'in' | 'out' | 'adjustment';
    quantity: number;
    reference: string | null;
    created_at: string;
}

// Transaction Types
export interface Transaction {
    id: number;
    farm_id: number;
    type: 'income' | 'expense';
    expense_category: ExpenseCategory | null;
    income_category: IncomeCategory | null;
    amount: number;
    description: string;
    transaction_date: string;
    reference: string | null;
    created_at: string;
    updated_at: string;
}

export interface ExpenseCategory {
    id: number;
    name: string;
}

export interface IncomeCategory {
    id: number;
    name: string;
}

export interface FinancialSummary {
    total_income: number;
    total_expense: number;
    net: number;
}

// Task Types
export interface Task {
    id: number;
    farm_id: number;
    title: string;
    description: string | null;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    due_date: string | null;
    created_at: string;
    updated_at: string;
    assigned_users?: User[];
    assignments?: TaskAssignment[];
}

export interface TaskAssignment {
    id: number;
    task_id: number;
    user_id: number;
    assigned_at: string;
    completed_at: string | null;
    user?: User;
}

// Order Types
export interface Order {
    id: number;
    farm_id: number;
    customer_name: string;
    total_amount: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    order_date: string;
    created_at: string;
    updated_at: string;
    items?: OrderItem[];
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
}

export interface ProductBatch {
    id: number;
    farm_id: number;
    crop_cycle_id: number;
    batch_code: string;
    production_date: string;
    notes: string | null;
    created_at: string;
}

// Schedule Types
export interface Schedule {
    id: number;
    farm_id: number;
    title: string;
    description: string | null;
    scheduled_date: string;
    start_time: string | null;
    end_time: string | null;
    type: 'task' | 'event' | 'reminder';
    status: 'scheduled' | 'completed' | 'cancelled';
    related_task_id: number | null;
    related_task?: Pick<Task, 'id' | 'title'> | null;
    created_at: string;
    updated_at: string;
}

export interface ScheduleFormData {
    title: string;
    description?: string;
    scheduled_date: string;
    start_time?: string;
    end_time?: string;
    type: 'task' | 'event' | 'reminder';
    status: 'scheduled' | 'completed' | 'cancelled';
    related_task_id?: number | null;
}

// Contact Types
export interface Contact {
    id: number;
    farm_id: number;
    name: string;
    type: 'supplier' | 'customer' | 'vet' | 'contractor' | 'other';
    phone: string | null;
    email: string | null;
    address: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

export interface ContactFormData {
    name: string;
    type: 'supplier' | 'customer' | 'vet' | 'contractor' | 'other';
    phone?: string;
    email?: string;
    address?: string;
    notes?: string;
}

// Report Types
export interface MonthlyFinancialData {
    month: number;
    month_name: string;
    income: number;
    expense: number;
}

export interface FinancialTotals {
    total_income: number;
    total_expense: number;
    net: number;
}

export interface StatusCount {
    status: string;
    total: number;
}

export interface PriorityCount {
    priority: string;
    total: number;
}

export interface CategoryCount {
    category: string;
    total: number;
}

export interface GenderCount {
    gender: string;
    total: number;
}

// User Types
export interface User {
    id: number;
    name: string;
    email: string;
    farm_id: number | null;
    is_active: boolean;
    last_login_at: string | null;
    created_at: string;
}

// Pagination Types
export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

// Flash Message Types
export interface FlashMessages {
    success?: string;
    error?: string;
    info?: string;
    warning?: string;
}

// Form Data Types
export interface AnimalFormData {
    tag_number: string;
    name?: string;
    breed_id: number;
    category_id: number;
    gender: 'male' | 'female';
    birth_date: string;
    purchase_date?: string;
    status: 'active' | 'sold' | 'dead';
    weight?: number;
    notes?: string;
}

export interface CropCycleFormData {
    field_id: number;
    crop_id: number;
    planting_date: string;
    expected_harvest_date: string;
    status: 'planted' | 'growing' | 'harvested';
}

export interface InventoryItemFormData {
    category_id: number;
    name: string;
    unit: string;
    quantity: number;
    reorder_level: number;
}

export interface TaskFormData {
    title: string;
    description?: string;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    due_date?: string;
    assigned_to?: string;
}

export interface TransactionFormData {
    type: 'income' | 'expense';
    income_category_id?: number;
    expense_category_id?: number;
    amount: number;
    description: string;
    transaction_date: string;
    reference?: string;
}

export interface OrderFormData {
    customer_name: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    order_date: string;
}

export interface GrowLocationFormData {
    name: string;
    type: 'field' | 'greenhouse' | 'nursery' | 'orchard' | 'container' | 'bed' | 'row';
    parent_id?: number | null;
    area_size?: number | null;
    area_unit?: string;
    gps_coordinates?: string;
    status: 'active' | 'inactive' | 'maintenance';
    description?: string;
}

export interface PlantingFormData {
    crop_id: number;
    grow_location_id: number;
    variety?: string;
    season: string;
    status: 'planned' | 'seeded' | 'transplanted' | 'growing' | 'harvested' | 'failed';
    seed_start_date?: string;
    transplant_date?: string;
    direct_seed_date?: string;
    expected_harvest_date?: string;
    number_of_plants?: number;
    number_of_rows?: number;
    area_occupied?: number;
    area_unit?: string;
    succession_number: number;
    notes?: string;
}

export interface HarvestFormData {
    quantity: number;
    unit: string;
    quality_grade?: string;
    market_destination?: string;
    harvest_date: string;
    notes?: string;
}

export interface NutrientFormData {
    fertilizer_type: string;
    is_organic: boolean;
    quantity: number;
    unit: string;
    application_method?: string;
    application_date: string;
    cost?: number;
    applicator?: string;
    notes?: string;
}

export interface TreatmentFormData {
    treatment_type: string;
    product_used: string;
    active_ingredient?: string;
    dosage?: string;
    application_method?: string;
    application_date: string;
    reentry_interval?: string;
    notes?: string;
}
