export interface Employee{
    user_id: number,
    name: string,
    contact: number,
    email: string,
    employee_id: number,
    salary: number,
    branch: number,
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

export interface Branch {
    branch_id: number,
    image_path: string,
    branch_name: string,
    address: string,
    manager_id: number,
    contact: number,
    open_time : string,
    close_time : string,
    name: string
}

export interface Appointment {
    appointment_id : number,
    customer_id : number,
    name : string,  
    branch_name : string,
    contact : number,
    start_time : string,
    end_time : string,
    date : Date,
    service_status : string,
    payment_mode: string,
    payment_status : string
}