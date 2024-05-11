import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { HomeService } from '../../Services/home.service';
import { RequestDeleteClient, ResponseClientGetAll } from '../../Interfaces/client.interface';
import { GenericResponse } from '../../Interfaces/forms.interface';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatCheckboxModule, MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit, OnChanges {

  displayedColumns: string[] = ['select', 'id', 'name', 'cpf', 'signDigital'];
  selection = new SelectionModel<ResponseClientGetAll>(true, []);
  dataSource: any;
  listId: RequestDeleteClient[] = [];
  //dataSource = new MatTableDataSource<ResponseClientGetAll>(ELEMENT_TESTE);

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private homeService: HomeService) {
    this.homeService.getMessage.subscribe(() => {
      this.getListClient();
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['recall'].currentValue !== changes['recall'].previousValue) {
      this.getListClient();
    }
  }

  private getListClient() {
    this.homeService.getAllClients().subscribe((resp: ResponseClientGetAll[])=>{
      this.dataSource = new MatTableDataSource<ResponseClientGetAll>(resp)
    })
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource._updateChangeSubscription()
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  getIds(element: any) {
    this.listId.push(element);
  }


  checkboxLabel(row?: ResponseClientGetAll): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  public deleteClients() {
    this.homeService.deleteClients(this.listId).subscribe((resp: any) => {
      if(resp.code == 200) {
        this.homeService.setData('');
      }
    })
  }

}
