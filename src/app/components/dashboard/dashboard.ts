import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report';
import { WasteReport, ReportStatus, WasteCategory } from '../../models/waste-report.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  reports: WasteReport[] = [];
  stats = {
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    urgent: 0
  };

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.reportService.getReports().subscribe(data => {
      this.reports = data;
      this.calculateStats();
    });
  }

  calculateStats() {
    this.stats.total = this.reports.length;
    this.stats.pending = this.reports.filter(r => r.status === ReportStatus.PENDING).length;
    this.stats.inProgress = this.reports.filter(r => r.status === ReportStatus.IN_PROGRESS).length;
    this.stats.resolved = this.reports.filter(r => r.status === ReportStatus.RESOLVED).length;
    this.stats.urgent = this.reports.filter(r => r.priority === 'URGENT').length;
  }

  getStatusDisplayName(status: ReportStatus): string {
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  }

  getCategoryDisplayName(category: WasteCategory): string {
    return category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  }

  getStatusColor(status: ReportStatus): string {
    switch (status) {
      case ReportStatus.PENDING: return '#f39c12';
      case ReportStatus.ASSIGNED: return '#3498db';
      case ReportStatus.IN_PROGRESS: return '#9b59b6';
      case ReportStatus.RESOLVED: return '#27ae60';
      case ReportStatus.REJECTED: return '#e74c3c';
      default: return '#95a5a6';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'URGENT': return '#e74c3c';
      case 'HIGH': return '#f39c12';
      case 'MEDIUM': return '#3498db';
      case 'LOW': return '#27ae60';
      default: return '#95a5a6';
    }
  }
}
