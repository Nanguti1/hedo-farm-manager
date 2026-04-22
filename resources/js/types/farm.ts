// Farm Types
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
    category: string;
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
