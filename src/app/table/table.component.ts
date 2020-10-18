import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {Observable, Subject} from 'rxjs';
import {Data} from '../models/data';
import {map, share, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  primaryIndex: number;
  data$: Observable<Data>;
  columnTitles$: Observable<string[]>;
  totals$: Observable<number[]>;

  destroySubject$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: HttpService) {
  }

  ngOnInit(): void {
    this.data$ = this.dataService.getData().pipe(share());
    this.columnTitles$ = this.data$.pipe(map((tableData: Data) => {
      return tableData.meta.columns.map(el => el.title);
    }));
    this.totals$ = this.data$.pipe(map((tableData: Data) => {
      return tableData.meta.columns.map(el => tableData.meta.total[el.key]);
    }));

    this.data$.pipe(takeUntil(this.destroySubject$)).subscribe((tableData) => {
      this.primaryIndex = tableData.meta.columns.findIndex(el => el.primary);
    });
  }

  trackByFn(index, row): string {
    return row[this.primaryIndex];
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(true);
    this.destroySubject$.complete();
  }

}
