import { ChartBarAssinaturasPorMesComponent } from './chart-bar-assinaturas-por-mes/chart-bar-assinaturas-por-mes.component';
import { ChartPiePlanosComponent } from './chart-pie-planos/charts-pie-planos.component';
import { ChartRadasClientesPorEstadoComponent } from './chart-radar-clientes-por-estado/chart-radar-clientes-por-estado.component';
import { ChartsAreaComponent } from './charts-area/charts-area.component';
import { ChartsBarComponent } from './charts-bar/charts-bar.component';
import { ChartsPieComponent } from './charts-pie/charts-pie.component';

export const components = [
    ChartPiePlanosComponent,
    ChartBarAssinaturasPorMesComponent,
    ChartRadasClientesPorEstadoComponent,

    ChartsAreaComponent, 
    ChartsBarComponent,
    ChartsPieComponent
];

export * from './charts-area/charts-area.component';
export * from './charts-bar/charts-bar.component';
export * from './charts-pie/charts-pie.component';
export * from './chart-pie-planos/charts-pie-planos.component';
export * from './chart-bar-assinaturas-por-mes/chart-bar-assinaturas-por-mes.component';
export * from './chart-radar-clientes-por-estado/chart-radar-clientes-por-estado.component';