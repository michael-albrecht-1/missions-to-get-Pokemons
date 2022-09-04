import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainLayoutModule } from './core/main-layout/main-layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, MainLayoutModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
