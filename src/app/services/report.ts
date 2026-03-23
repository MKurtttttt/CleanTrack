import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WasteReport, WasteCategory, ReportStatus, Priority } from '../models/waste-report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private reports: WasteReport[] = [];
  private nextId = 1;

  constructor() { }

  createReport(report: Omit<WasteReport, 'id' | 'reportedAt' | 'updatedAt'>): Observable<WasteReport> {
    const newReport: WasteReport = {
      ...report,
      id: this.nextId.toString(),
      reportedAt: new Date(),
      updatedAt: new Date()
    };
    
    this.reports.push(newReport);
    this.nextId++;
    
    return of(newReport);
  }

  getReports(): Observable<WasteReport[]> {
    return of(this.reports);
  }

  getReportById(id: string): Observable<WasteReport | undefined> {
    return of(this.reports.find(report => report.id === id));
  }

  updateReportStatus(id: string, status: ReportStatus): Observable<WasteReport | null> {
    const reportIndex = this.reports.findIndex(report => report.id === id);
    if (reportIndex !== -1) {
      this.reports[reportIndex].status = status;
      this.reports[reportIndex].updatedAt = new Date();
      return of(this.reports[reportIndex]);
    }
    return of(null);
  }

  getReportsByStatus(status: ReportStatus): Observable<WasteReport[]> {
    return of(this.reports.filter(report => report.status === status));
  }

  getReportsByCategory(category: WasteCategory): Observable<WasteReport[]> {
    return of(this.reports.filter(report => report.category === category));
  }

  assignReport(id: string, assignedTo: string): Observable<WasteReport | null> {
    const reportIndex = this.reports.findIndex(report => report.id === id);
    if (reportIndex !== -1) {
      this.reports[reportIndex].assignedTo = assignedTo;
      this.reports[reportIndex].status = ReportStatus.ASSIGNED;
      this.reports[reportIndex].updatedAt = new Date();
      return of(this.reports[reportIndex]);
    }
    return of(null);
  }
}
