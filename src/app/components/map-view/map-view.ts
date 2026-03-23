import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report';
import { WasteReport } from '../../models/waste-report.model';

@Component({
  selector: 'app-map-view',
  imports: [CommonModule],
  templateUrl: './map-view.html',
  styleUrl: './map-view.scss',
})
export class MapView implements OnInit {
  reports: WasteReport[] = [];
  isLoading = true;
  mapCenter = { lat: 15.1474, lng: 120.5957 }; // Malabanias coordinates

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.reportService.getReports().subscribe(data => {
      this.reports = data;
      this.isLoading = false;
    });
  }

  getMarkerColor(status: string): string {
    switch (status) {
      case 'PENDING': return '#f39c12';
      case 'ASSIGNED': return '#3498db';
      case 'IN_PROGRESS': return '#9b59b6';
      case 'RESOLVED': return '#27ae60';
      case 'REJECTED': return '#e74c3c';
      default: return '#95a5a6';
    }
  }

  onReportClick(report: WasteReport) {
    console.log('Report clicked:', report);
    // In a real app, this would open a detailed view or modal
  }
}
