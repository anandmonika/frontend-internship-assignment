import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs';
import { SubjectsService } from '../../core/services/subjects.service';
import { Book } from 'src/app/core/models/book-response.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;

  bookSearch: FormControl;
  searchOption: FormControl;
  allBooks: Book[] = [];
  totalBooks: number = 0;
  searchRequest: any = null;
  pageSize: number = 10;
  pageIndex: number = 0;
  noDataFound: boolean = false;
  errMsg: string = '';
  constructor(private subjectsService: SubjectsService) {
    this.bookSearch = new FormControl('');
    this.searchOption = new FormControl('title');
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  search(pagination?: any) {
    this.noDataFound = false;
    this.errMsg = '';
    if(!this.bookSearch.value) return;
    this.isLoading = true;
    if(this.searchRequest) {
      this.searchRequest.unsubscribe();
    }
    this.searchRequest = this.subjectsService.searchBooks(this.bookSearch.value, this.searchOption.value, pagination).subscribe((data) => {
      this.allBooks = data?.docs;
      this.totalBooks = data?.numFound;
      this.isLoading = false;
      this.searchRequest = null;
      if(!data?.docs || data?.docs?.length === 0) this.noDataFound = true;
    },
    (error) => {
      this.errMsg = error?.error?.error || "Something went wrong!";
      this.isLoading = false;
      this.searchRequest = null;
    })
  }

  pageChangeHandler(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.search(event);
  }

  clearSearch() {
    this.bookSearch.reset();
    this.pageSize = 10;
    this.totalBooks = 0;
    this.pageIndex = 0;
    this.allBooks = [];
    this.noDataFound=false; 
    this.errMsg = '';
  }

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        map((value) => { 
          this.noDataFound=false; 
          this.errMsg = '';
          return value; }
        ),
        debounceTime(300),
      ).
      subscribe((value: string) => {
        this.search()
      });

      this.searchOption.valueChanges
      .pipe(
        debounceTime(300),
      ).
      subscribe((value: string) => {
        this.search()
      });
  }
}
