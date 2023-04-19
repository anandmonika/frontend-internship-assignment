import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/core/models/book-response.model';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  @Input() booksList: Book[] = [];
  @Input() subjectName: string = '';
  @Input() totalBooks: number = 0;
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  displayedColumns: string[] = ['title', 'author', 'first_publish_year'];
  constructor(
    private router: Router
  ){}

  goToHome(){
    this.router.navigate(['']);
  }

  handlePageEvent(event: PageEvent) {
    this.onPageChange.emit(event);
  }
}
