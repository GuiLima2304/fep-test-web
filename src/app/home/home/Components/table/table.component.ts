import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { HomeService } from '../../Services/home.service';
import { HttpClient } from '@angular/common/http';
import { ResponseClientGetAll } from '../../Interfaces/client.interface';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 12, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 15, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const ELEMENT_TESTE: ResponseClientGetAll[] = [
  {
      "id": 1,
      "externCode": "112223335546",
      "name": "Sergio da Costa",
      "cpf": "45042906620",
      "cellphone": "11998245613",
      "signDigital": true
  },
  {
      "id": 3,
      "externCode": "98766484",
      "name": "Camilla Ferreira",
      "cpf": "62059847830",
      "cellphone": "11993658475",
      "signDigital": true
  }
]

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatCheckboxModule, MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit {

  dataClients: ResponseClientGetAll[] = [];
  displayedColumns: string[] = ['select', 'id', 'name', 'cpf', 'signDigital'];
  selection = new SelectionModel<ResponseClientGetAll>(true, []);
  dataSource: any;
  //dataSource = new MatTableDataSource<ResponseClientGetAll>(ELEMENT_TESTE);

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private homeService: HomeService) {
    this.homeService.getAllClients().subscribe((resp: ResponseClientGetAll[])=>{
      // this.dataClients.push(resp);
      this.dataSource = new MatTableDataSource<ResponseClientGetAll>(resp)
    })
  }


  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource._updateChangeSubscription()
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }


  checkboxLabel(row?: ResponseClientGetAll): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
