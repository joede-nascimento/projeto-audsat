import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports:[
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
