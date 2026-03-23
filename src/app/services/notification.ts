import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { NotificationType } from '../models/waste-report.model';

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
  reportId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: AppNotification[] = [];
  private notificationSubject = new Subject<AppNotification>();
  private nextId = 1;

  constructor() { }

  getNotifications(): Observable<AppNotification[]> {
    return of(this.notifications);
  }

  getUnreadNotifications(): Observable<AppNotification[]> {
    return of(this.notifications.filter(n => !n.read));
  }

  createNotification(
    userId: string,
    title: string,
    message: string,
    type: NotificationType,
    reportId?: string
  ): Observable<AppNotification> {
    const notification: AppNotification = {
      id: this.nextId.toString(),
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date(),
      reportId
    };

    this.notifications.push(notification);
    this.nextId++;
    this.notificationSubject.next(notification);

    // In a real app, this would send push notifications or emails
    this.sendRealTimeNotification(notification);

    return of(notification);
  }

  markAsRead(notificationId: string): Observable<boolean> {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      return of(true);
    }
    return of(false);
  }

  markAllAsRead(userId: string): Observable<boolean> {
    const userNotifications = this.notifications.filter(n => n.userId === userId);
    userNotifications.forEach(n => n.read = true);
    return of(true);
  }

  deleteNotification(notificationId: string): Observable<boolean> {
    const index = this.notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      this.notifications.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  getNotificationStream(): Observable<AppNotification> {
    return this.notificationSubject.asObservable();
  }

  private sendRealTimeNotification(notification: AppNotification): void {
    // Mock implementation for real-time notifications
    console.log('New notification:', notification);
    
    // In a real app, this would use WebSocket or Service Worker
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/assets/icons/notification-icon.png'
      });
    }
  }

  requestNotificationPermission(): Observable<boolean> {
    return new Observable(observer => {
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          observer.next(permission === 'granted');
          observer.complete();
        });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }
}
