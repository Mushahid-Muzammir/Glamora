export interface Employee{
    user_id: number,
    name: string,
    contact: number,
    email: string,
    employee_id: number,
    salary: number,
    branch_id: number,
    branch_name: string
}

export interface Customer{
    user_id: number,
    name: string,
    contact: number,
    email: string,
    customer_id: number,
    loyalty_points: number
}

export interface Product{
    product_id:number,
    product_name: string,
    cost_price: number,
    selling_price: number,
    stock_level: number,
    expiry_date: Date
}

export interface Service {
    service_id: number,
    service_name: string,
    decription: string,
    price: number,
    duration: number
}