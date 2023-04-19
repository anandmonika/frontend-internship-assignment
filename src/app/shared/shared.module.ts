import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from './table-view/table-view.component';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [TableViewComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatTableModule],
  exports: [TableViewComponent, MatIconModule]
})
export class SharedModule {}
