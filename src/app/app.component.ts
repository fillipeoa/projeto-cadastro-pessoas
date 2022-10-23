import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {  
  pessoa = {  
    nome: '',
    telefone: ''
  };

  displayedColumns: string[] = ['codigo', 'nome', 'telefone'];
  pessoas = new MatTableDataSource([
    { codigo: 1, nome: 'Fillipe', telefone: '(31) 11111-1111' },
    { codigo: 2, nome: 'Joao', telefone: '(31) 22222-2222' }
  ]);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.pessoas.sort = this.sort;
  }


  buscar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pessoas.filter = filterValue.trim().toLowerCase();
  }
}
