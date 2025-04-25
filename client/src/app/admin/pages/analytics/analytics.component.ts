import { Component,ViewChild, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { Appointment, Employee } from '../../../data_interface';
import { CommonModule } from '@angular/common'; 
import { AdminService } from '../../../services/admin.service';
import { BaseChartDirective } from "ng2-charts";
import { 
    ChartConfiguration,
    ChartOptions,
    ChartType,
    ChartData,
    ChartTypeRegistry,
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    BarController
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    BarController,
    
);

@Component({
    selector: 'app-analytics',
    imports: [SidebarComponent, TopbarComponent, CommonModule, BaseChartDirective],
    templateUrl: './analytics.component.html',
    styleUrl: './analytics.component.css'
})

export class AnalyticsComponent {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
    appointmentData: any[] = [];
    branchData: any[] = [];
    employees: Employee[] = [];
    appointments: Appointment[] = [];
    totalSales: number = 0;
    totalRevenue: number = 0;
    showAppointmentsPopup: boolean = false;
    showEmployeesPopup: boolean = false;

    public chartType: keyof ChartTypeRegistry = 'bar';
    public chartOptions: ChartOptions = {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    color: '#333',         
                    font: {
                        size: 13,
                        weight: 'bold',
                    }   
                }
            },
            y: {

                ticks: {
                    color: '#333',
                    font: {
                        size: 14,
                        weight: 'bold',
                    }
                }
            }
        },
    };

    public chartData: ChartData<'bar'> = {
        labels: [
        ],
        datasets: [
            {
                data: [],
                label: 'Appointments per Service',
                backgroundColor: '#003366',
                hoverBackgroundColor: '#2563eb',
                barPercentage: 0.4,
                categoryPercentage: 1
            }
        ]
    };

    public chartData2: ChartData<'bar'> = {
        labels: [
        ],
        datasets: [
            {
                data: [],
                label: 'Branch per Appointment',
                backgroundColor: '#003366',
                hoverBackgroundColor: '#2563eb',
                barPercentage: 0.6,
                categoryPercentage: 0.7
            }
        ]
    };

    constructor(private adminService: AdminService) { }

    ngOnInit() {
        this.adminService.getAppointmentCountByService().subscribe(
            (data: any) => {
                this.appointmentData = data.appointmentData;
                this.chartData.labels = this.appointmentData.map((item: { service_name: any; }) => item.service_name);
                this.chartData.datasets[0].data = this.appointmentData.map((item: { total: any; }) => item.total);
                this.chart?.update();
            });

        this.adminService.getAppointmentCountByBranch().subscribe(
            (data: any) => {
                this.branchData = data.branchData;
                this.chartData2.labels = this.branchData.map((item: { branch_name: any; }) => item.branch_name);
                this.chartData2.datasets[0].data = this.branchData.map((item: { total: any; }) => item.total);
                this.chart?.update();
            });

        this.adminService.getTodayAppointments().subscribe(
            (res: any) => {
                this.appointments = res.appointments;
            });
        this.adminService.getEmployees().subscribe(
            (res: any) => {
                this.employees = res.employees;
            });
        this.adminService.getTodaySales().subscribe(
            (res: any) => {
                this.totalSales = res.totalSales;
            });
        this.adminService.getTodayRevenueByServices().subscribe(
            (res: any) => {
                this.totalRevenue = res.todayRevenue;
            });
    }

    openAppointmentsPopup() {
        this.showAppointmentsPopup = true;
    }

    closeAppointmentsPopup() {
        this.showAppointmentsPopup = false;
    }

    openEmployeesPopup() {
        this.showEmployeesPopup = true;
    }

    closeEmployeesPopup() {
        this.showEmployeesPopup = false;
    }
}
