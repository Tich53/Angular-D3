import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartVerticalComponent } from './bar-chart-vertical/bar-chart-vertical.component';
import { D3TreeComponent } from './d3-tree/d3-tree.component';
import { TreeComponent } from './tree/tree.component';
import { D3RectangularTreeComponent } from './d3-rectangular-tree/d3-rectangular-tree.component';

@NgModule({
  declarations: [AppComponent, BarChartVerticalComponent, D3TreeComponent, TreeComponent, D3RectangularTreeComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
