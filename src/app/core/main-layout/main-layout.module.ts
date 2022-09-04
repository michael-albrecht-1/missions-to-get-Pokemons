import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [MainLayoutComponent, HeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [MainLayoutComponent],
})
export class MainLayoutModule {}
