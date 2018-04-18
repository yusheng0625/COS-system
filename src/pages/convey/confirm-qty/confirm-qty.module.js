var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ConfirmQtyPage } from './confirm-qty';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
var SignupModalPageModule = /** @class */ (function () {
    function SignupModalPageModule() {
    }
    SignupModalPageModule = __decorate([
        NgModule({
            declarations: [
                ConfirmQtyPage,
            ],
            imports: [
                IonicPageModule.forChild(ConfirmQtyPage),
            ],
            exports: [
                ConfirmQtyPage
            ]
        })
    ], SignupModalPageModule);
    return SignupModalPageModule;
}());
export { SignupModalPageModule };
//# sourceMappingURL=confirm-qty.module.js.map