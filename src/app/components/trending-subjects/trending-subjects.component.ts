import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SubjectsService } from '../../core/services/subjects.service';
import { Book } from 'src/app/core/models/book-response.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'front-end-internship-assignment-trending-subjects',
  templateUrl: './trending-subjects.component.html',
  styleUrls: ['./trending-subjects.component.scss'],
})
export class TrendingSubjectsComponent implements OnInit {

  isLoading: boolean = true;

  subjectName: string = '';

  allBooks: Book[] = [];
  
  totalBooks: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService,
  ) {}
  
  
  getAllBooks(pagination?: any) {
    this.subjectsService.getAllBooks(this.subjectName, pagination).subscribe((data) => {
      this.allBooks = data?.works;
      this.totalBooks = data?.work_count;
      // this.subjectsArray = data;
      this.isLoading = false;
    });
  }

  handlePageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.isLoading = true;
    this.getAllBooks(event);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.isLoading = true;
      this.getAllBooks();
    });
  }

}
