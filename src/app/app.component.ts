import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  nomeFormControl = new FormControl('', [Validators.required]);
  telefoneFormControl = new FormControl('', [Validators.required]);

  displayedColumns: string[] = ['codigo', 'nome', 'telefone', 'excluir'];
  arrayPessoas: any[] = [];
  pessoas = new MatTableDataSource(this.arrayPessoas);
  qtdPessoas = 0;

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.pessoas.sort = this.sort;
  }

  buscar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pessoas.filter = filterValue.trim().toLowerCase();
  }

  limparCampos() {
    this.pessoa.nome = '';
    this.pessoa.telefone = '';
  }

  salvar() {
    if(!this.nomeFormControl.hasError('required') && !this.telefoneFormControl.hasError('required')){
        this.qtdPessoas++;
        this.arrayPessoas.push({
          codigo: this.qtdPessoas,
          nome: this.pessoa.nome,
          telefone: this.pessoa.telefone
        });
        this.pessoas = new MatTableDataSource(this.arrayPessoas);
    }
  }

  excluir(codigo: any){
    this.qtdPessoas--;
    this.arrayPessoas = this.arrayPessoas.filter(pessoa => pessoa.codigo != codigo);
    this.pessoas = new MatTableDataSource(this.arrayPessoas);
  }
}
