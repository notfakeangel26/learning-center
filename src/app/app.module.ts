import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './public/pages/about/about.component';
import { HomeComponent } from './public/pages/home/home.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import { StudentManagementComponent } from './learning/pages/student-management/student-management.component';
import { StudentCreateAndEditComponent } from './learning/components/student-create-and-edit/student-create-and-edit.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {StudentsService} from "./learning/services/students.service";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatIcon} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    PageNotFoundComponent,
    StudentManagementComponent,
    StudentCreateAndEditComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatButton,
    MatToolbar,
    MatAnchor,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatCellDef,
    MatCell,
    MatSort,
    MatSortHeader,
    MatPaginator,
    MatIcon
  ],
  providers: [
    provideAnimationsAsync(),
    StudentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
