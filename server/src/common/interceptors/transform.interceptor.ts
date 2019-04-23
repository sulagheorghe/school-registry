import { Injectable, NestInterceptor, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { classToPlain } from "class-transformer"
import { map} from "rxjs/operators"

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    return call$.pipe(map(data => classToPlain(data)));
  }
}