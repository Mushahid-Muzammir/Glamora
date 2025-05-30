export interface Employee{
    user_id: number,
    name: string,
    contact: number,
    email: string,
    employee_id: number,
    salary: number,
    title : string,
    branch: number,
    branch_name: string,
    image_url: string

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
    image_url : string,
    product_name: string,
    description: string,
    cost_price: number,
    selling_price: number,
    quantity : number,
    stock_level: number,
    expiry_date: Date
}

export interface Service {
    service_id: number,
    image_url : string,
    service_name: string,
    description: string,
    price: number,
    duration: number
}

export interface Branch {
    branch_id: number,
    image_url: string,
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
    date : string,
    service_status : string,
    payment_mode: string,
    payment_status : string
}
export interface Manager {
    user_id: number,
    name: string,
    contact: number,
    email: string,
    manager_id: number,
    salary: number,
    branch_id: number,
    branch_name: string
}

export interface Request {
    leave_id: number,
    employee_id: number,
    name: string,
    reason: string,
    date: Date,
    status: string
}