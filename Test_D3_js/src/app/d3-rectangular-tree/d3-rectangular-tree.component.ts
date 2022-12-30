import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-rectangular-tree',
  templateUrl: './d3-rectangular-tree.component.html',
  styleUrls: ['./d3-rectangular-tree.component.scss'],
})
export class D3RectangularTreeComponent implements OnInit {
  treeData: any = {
    name: 'Chart',
    children: [
      {
        name: 'Sources de données 1',
        children: [
          {
            name: 'filtre 1',
          },
          {
            name: 'filtre 2',
          },
        ],
      },
      {
        name: 'Sources de données 2',
        children: [
          {
            name: 'filtre 1',
          },
          {
            name: 'filtre 2',
          },
        ],
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {
    this.createTree();
  }

  createTree() {
    const title = d3
      .select('body')
      .append('h2')
      .text('D3 tree with rectangular');

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', 1200)
      .attr('height', 600)
      .append('g')
      .attr('transform', 'translate(50,50)');

    const tree = d3.hierarchy(this.treeData);

    const treeStructure = d3.tree().size([1000, 300]);

    const information = treeStructure(tree);

    console.log(information.descendants());
    console.log(information.links());

    let connections = svg
      .append('g')
      .selectAll('path')
      .data(information.links());

    // LINES FROM A PARENT POINT TO A CHILD POINT
    // M = Move to
    // The first couple of data separated by "," = starting point
    // C = Control points (to make the curve)
    // The first couple of data separated by "," = first control point
    // Then " " for separating the control points
    // The second couple of data separated by "," = second control point
    // Finally, the last couple of data separated by "," = ending point
    connections
      .enter()
      .append('path')
      .attr('d', function (d) {
        return (
          'M' +
          d.source.x +
          ',' +
          d.source.y +
          ' v 50 H' +
          d.target.x +
          ' V' +
          d.target.y
        );
      })
      .attr('fill', 'none')
      .attr('stroke', 'silver')
      .attr('stroke-width', '2px');

    let rectangles = svg
      .append('g')
      .selectAll('rect')
      .data(information.descendants());
    rectangles
      .enter()
      .append('rect')
      .attr('x', function (d: any) {
        return d.x - 75;
      })
      .attr('y', function (d: any) {
        return d.y - 20;
      })
      .attr('fill', 'white')
      .attr('stroke', 'silver')
      .attr('width', '160px')
      .attr('height', '40px')
      .attr('stroke-width', '2px')
      .on('mouseover', function (d) {
        d3.select(this).attr('fill', 'red').attr('cursor', 'pointer');
      })
      .on('mouseout', function (d) {
        d3.select(this).attr('fill', 'lightblue');
      });

    let names = svg
      .append('g')
      .selectAll('text')
      .data(information.descendants());
    names
      .enter()
      .append('text')
      .text(function (d: any) {
        return d.data.name;
      })
      .attr('x', function (d) {
        return d.x + 5;
      })
      .attr('y', function (d) {
        return d.y + 2;
      })
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', 'middle')
      .attr('color', 'yellow');
    // .classed('bigger', true);
    // La classe est bien attribuée mais le SCSS ne s'applique pas ?!?
  }
}
