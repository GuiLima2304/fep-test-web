import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FormsComponent } from './Components/forms/forms.component';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [NavbarComponent, FormsComponent, MatDividerModule]
})
export class HomeComponent {

}
