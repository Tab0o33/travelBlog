import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  countries = [
    {
      label: 'colombie',
      places: [
        {
          title: 'Bogotá',
          description: '3 jours dans la capitale',
          imageURL: 'bogota.jpg',
          imageAlt: 'Bogotá',
          firstDay: '10/07/2020',
          lastday: '16/07/2020'
        },
        {
          title: 'Villa de Leyva',
          description: 'La typique ville blanche',
          imageURL: 'villaDeLeyva.jpg',
          imageAlt: 'Villa de Leyva',
          firstDay: '17/07/2020',
          lastday: '28/07/2020'
        },
        {
          title: 'Guatapé',
          description: 'Un lieu inoubliable',
          imageURL: 'guatape.jpg',
          imageAlt: 'Guatapé',
          firstDay: '29/07/2020',
          lastday: '25/08/2020'
        },
        {
          title: 'Salento',
          description: 'Quel paysage',
          imageURL: 'salento.jpg',
          imageAlt: 'Salento',
          firstDay: '26/08/2020',
          lastday: '15/09/2020'
        }
      ]
    },
    {
      label: 'equateur',
      places: [
        {
          title: 'Quito',
          description: 'Capitale de l\'Équateur',
          imageURL: 'quito.jpg',
          imageAlt: 'Quito',
          firstDay: '17/08/2020',
          lastday: '28/08/2020'
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
