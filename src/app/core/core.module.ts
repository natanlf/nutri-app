import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule
  ], 
  exports: [
    HomeComponent,
    HeaderComponent,
    AngularMaterialModule
  ]
})
export class CoreModule { }
