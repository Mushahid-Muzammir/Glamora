import { Component, ViewChild, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/manager-sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { Appointment, Employee } from '../../../data_interface';
import { ManagerService } from '../../../services/manager.service'; 
import { AuthService } from '../../../services/auth.service';
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
    BarController
);

@Component({
    selector: 'app-manager-analytics',
    imports: [SidebarComponent, TopbarComponent, BaseChartDirective],
  templateUrl: './manager-analytics.component.html',
  styleUrl: './manager-analytics.component.css'
})
export class ManagerAnalyticsComponent {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
    userID !: number;
    branchId !: number;
    appointmentData: any[] = [];
    employees: Employee[] = [];
    appointments: Appointment[] = [];
    totalSales: number = 0;
    totalRevenue: number = 0;
    showAppointmentsPopup: boolean = false;


    public chartType: keyof ChartTypeRegistry = 'bar';
    public chartOptions: ChartOptions = {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    color: '#333',
                    font: {
                        size: 14,
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

    constructor(
        private managerService: ManagerService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.userID = this.authService.getUserId();
        this.managerService.getBranchById(this.userID).subscribe(
            (res: any) => {
                this.branchId = res.manager.branch_id;
                console.log("Branch ID:", this.branchId);

                this.managerService.getAppointmentCountByService(this.branchId).subscribe(
                    (data: any) => {
                        this.appointmentData = data.appointmentData;
                        console.log("kbvjv", this.appointmentData);
                        this.chartData.labels = this.appointmentData.map((item: { service_name: any; }) => item.service_name);
                        this.chartData.datasets[0].data = this.appointmentData.map((item: { total: any; }) => item.total);
                        this.chart?.update();
                    });

                this.managerService.getTodayAppointments(this.branchId).subscribe(
                    (res: any) => {
                        this.appointments = res.appointments;
                    });
                this.managerService.getEmployees(this.branchId).subscribe(
                    (res: any) => {
                        this.employees = res.employees;
                    });
                this.managerService.getTodayRevenueByServices(this.branchId).subscribe(
                    (res: any) => {
                        this.totalRevenue = res.todayRevenue;
                    });
               
            });       
    }
}
