import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  data: { name: string; series: { name: string; value: number }[] }[];
  barColor = ['#a9ce97', '#a5b5de'];
  domain = [100, 1000];

  treeData2 = {
    name: 'Chart',
    value: 15,
    type: 'black',
    level: 'yellow',
    children: [
      {
        name: 'Sources de données 1',
        children: [
          {
            name: 'Filtre 1',
          },
          {
            name: 'Filtre 2',
            children: [
              {
                name: 'Sous filtre 1',
              },
            ],
          },
        ],
      },
      {
        name: 'Sources de données 2',
        children: [
          {
            name: 'Filtre 1',
          },
          {
            name: 'Filtre 2',
          },
        ],
      },
    ],
  };
  constructor() {
    this.data = [
      {
        name: 'Row1',
        series: [
          { name: 'Bar1', value: 150 },
          { name: 'Bar2', value: 200 },
        ],
      },
      {
        name: 'Row2',
        series: [
          { name: 'Bar1', value: 300 },
          { name: 'Bar2', value: 400 },
        ],
      },
      {
        name: 'Row3',
        series: [
          { name: 'Bar1', value: 500 },
          { name: 'Bar2', value: 1000 },
        ],
      },
    ];
  }

  ngOnInit(): void {
    this.createRectangle();
    this.createCircle();
  }

  createRectangle() {
    d3.select('svg')
      .append('rect')
      .attr('width', '250')
      .attr('height', '100')
      .attr('x', '200')
      .attr('y', '100')
      .attr('fill', 'lightblue')
      .on('mouseover', function (d) {
        d3.select(this).attr('fill', 'red').attr('cursor', 'pointer');
      })
      .on('mouseout', function (d) {
        d3.select(this).attr('fill', 'violet');
      });
  }

  createCircle() {
    d3.select('svg')
      .append('circle')
      .attr('cx', '100')
      .attr('cy', '150')
      .attr('r', '50')
      .attr('fill', 'green');
  }
}
