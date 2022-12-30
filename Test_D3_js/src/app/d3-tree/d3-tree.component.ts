import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
// import { Tree } from '@d3/tree';
// import { HierarchyNode, treemap } from 'd3';

@Component({
  selector: 'app-d3-tree',
  templateUrl: './d3-tree.component.html',
  styleUrls: ['./d3-tree.component.scss'],
})
export class D3TreeComponent implements OnInit {
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
    const title = d3.select('body').append('h2').text('D3 tree with curves');

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', 600)
      .attr('height', 600)
      .append('g')
      .attr('transform', 'translate(50,50)');

    const tree = d3.hierarchy(this.treeData);

    const treeStructure = d3.tree().size([500, 300]);

    const information = treeStructure(tree);

    console.log(information.descendants());
    console.log(information.links());

    let circles = svg
      .append('g')
      .selectAll('circle')
      .data(information.descendants());
    circles
      .enter()
      .append('circle')
      .attr('cx', function (d: any) {
        return d.x;
      })
      .attr('cy', function (d: any) {
        return d.y;
      })
      .attr('r', 5)
      .attr('fill', 'blue')
      .on('mouseover', function (d) {
        d3.select(this).attr('fill', 'red').attr('cursor', 'pointer');
      })
      .on('mouseout', function (d) {
        d3.select(this).attr('fill', 'black');
      });

    let connections = svg
      .append('g')
      .selectAll('path')
      .data(information.links());

    // CURVES FROM A PARENT POINT TO A CHILD POINT
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
          ' C ' +
          d.source.x +
          ',' +
          (d.source.y + d.target.y) / 2 +
          ' ' +
          d.target.x +
          ',' +
          (d.source.y + d.target.y) / 2 +
          ' ' +
          d.target.x +
          ',' +
          d.target.y
        );
      })
      .attr('fill', 'none')
      .attr('stroke', 'red');

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
      });
  }
}
