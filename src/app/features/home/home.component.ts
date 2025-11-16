import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CarCardComponent } from '../../shared/components/car-card/car-card.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { trigger , style , transition , animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, CarCardComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeComponent {

}
