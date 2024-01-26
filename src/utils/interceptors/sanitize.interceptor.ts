import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SanitizeInterceptor implements NestInterceptor {
  constructor(private readonly keysToSanitize: string[]) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) return data;
        if (Array.isArray(data)) {
          data.forEach((item) => this.sanitize(item));
        } else {
          this.sanitize(data);
        }
        return data;
      }),
    );
  }

  private sanitize(item: Record<string, any>): void {
    this.keysToSanitize.forEach((key) => {
      if (key in item) {
        delete item[key];
      }
    });
  }
}
