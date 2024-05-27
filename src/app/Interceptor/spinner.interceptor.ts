import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize } from "rxjs";
import { NgxUiLoaderService } from "ngx-ui-loader";

export const SpinnerInterceptor:HttpInterceptorFn = (req, next) => {
     var activeRequest = 0
    const spinnerService = inject(NgxUiLoaderService);

    if (activeRequest === 0) {
        spinnerService.start();
    }
    activeRequest++; 

    return next(req).pipe(finalize(() => {
        activeRequest--;
        if(activeRequest == 0) spinnerService.stop();
    }))
}

