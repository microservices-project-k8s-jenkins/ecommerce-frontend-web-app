import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configSubject = new BehaviorSubject<any>(null);
  public config$ = this.configSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log('ConfigService inicializado');
  }

  loadConfig(): Promise<void> {
    console.log('Intentando cargar config.json...');
    return this.http.get<any>('assets/config.json')
      .pipe(
        tap(config => {
          console.log('Config cargada:', config);
          this.configSubject.next(config);
        })
      )
      .toPromise()
      .catch(error => {
        console.error('Error cargando config:', error);
        this.configSubject.next({ secretText: 'not provided' });
      });
  }

  getSecretText(): string {
    const config = this.configSubject.getValue();
    console.log('Obteniendo secretText, config actual:', config);
    return config?.secretText || 'not provided';
  }
} 