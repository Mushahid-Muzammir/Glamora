export interface Employee{
    user_id: number,
    name: string,
    contact: number,
    email: string,
    employee_id: number,
    salary: number,
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
    image_url: string,
    branch_name: string,
    address: string,
    manager_id: number,
    contact: number,
    open_time: string,
    close_time: string
}

export interface Appointment {
    branch_id : number,
    start_time : string,
    end_time : string,
    date : Date
}