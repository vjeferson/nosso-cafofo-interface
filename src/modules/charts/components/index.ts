import { ChartPiePlanosComponent } from './chart-pie-planos/charts-pie-planos.component';
import { ChartsAreaComponent } from './charts-area/charts-area.component';
import { ChartsBarComponent } from './charts-bar/charts-bar.component';
import { ChartsPieComponent } from './charts-pie/charts-pie.component';

export const components = [
    ChartPiePlanosComponent,

    ChartsAreaComponent, 
    ChartsBarComponent,
    ChartsPieComponent
];

export * from './charts-area/charts-area.component';
export * from './charts-bar/charts-bar.component';
export * from './charts-pie/charts-pie.component';
export * from './chart-pie-planos/charts-pie-planos.component';