import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { GenericResponse, MaritalStatus, Sexo } from '../../Interfaces/forms.interface';
import { RequestClientCreate } from '../../Interfaces/client.interface';
import { HomeService } from '../../Services/home.service';
import { NgxMaskDirective } from 'ngx-mask';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatGridListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    NgxMaskDirective,
    MatButtonModule
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent {
  public selectedValue: string = '';

  public sex: Sexo[] = [
    { value: 1, viewValue: 'Masculino' },
    { value: 2, viewValue: 'Feminino' },
  ];

  public maritalStatus: MaritalStatus[] = [
    { value: 1, viewValue: 'Solteiro' },
    { value: 2, viewValue: 'Casado' },
    { value: 3, viewValue: 'Divorciado' },
    { value: 4, viewValue: 'Viuvo' },
  ];

  public forms: RequestClientCreate = {
    externCode: '',
    name: '',
    email: '',
    cpf: '',
    indCpf: false,
    sex: 0,
    maritalStatus: 0,
    birthDate: '',
    cellphone: '',
    identification: '',
    signDigital: false,
  };

  constructor(private homeService: HomeService) {}

  public hasCpf() {
    if (this.forms.cpf.length > 0) {
      this.forms.cpf = '';
    }
  }

  public buttonIsValid() {
    if (
      this.forms.name.length > 0 &&
      (this.forms.cpf.length > 0 || this.forms.indCpf) &&
      this.forms.birthDate.length > 0
    ) {
      return false;
    }
    return true;
  }

  public submitForm() {
    this.homeService.insertNewClient(this.forms).subscribe((resp: any) => {
      if (resp.code) {
        this.cleanFields();
        this.homeService.setData('');
      }
    });
  }

  private cleanFields() {
    this.forms = {
      externCode: '',
      name: '',
      email: '',
      cpf: '',
      indCpf: false,
      sex: 0,
      maritalStatus: 0,
      birthDate: '',
      cellphone: '',
      identification: '',
      signDigital: false,
    };
  }
}
