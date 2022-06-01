import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { EstatisticasService } from '@app/api/services';
import { mapTiposPlanos } from '@app/utils/consts';
import { EnumTipoPlano } from '@app/utils/enums';
import { Chart } from 'chart.js';

@Component({
    selector: 'sb-chart-radar-clientes-por-estado',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './chart-radar-clientes-por-estado.component.html',
    styleUrls: ['chart-radar-clientes-por-estado.component.scss'],
})
export class ChartRadasClientesPorEstadoComponent implements OnInit, AfterViewInit {
    @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;
    chart!: Chart;

    public mapTiposPlanos = mapTiposPlanos;

    private readonly VALUES_DEFAULT = {
        codigosEstadosComClientes: [],
        valores: {
            planoFree: [],
            planoMensal: [],
            planoSemestral: [],
            planoAnual: [],
            planoPromocionalAnual: [],
        }
    }


    constructor(
        private readonly _estatisticasService: EstatisticasService
    ) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this._estatisticasService.getEstatisticasPlanosAssinadosPorEstado().subscribe(
            (res: any) => {
                if (res) {
                    this.configChart(res);
                } else {
                    this.configChart(this.VALUES_DEFAULT);
                }
            }, (err=>{
                this.configChart(this.VALUES_DEFAULT);
            })
        );
    }

    private configChart(valores: any) {
        this.chart = new Chart(this.myPieChart.nativeElement, {
            type: 'radar',
            data: {
                labels: valores.codigosEstadosComClientes,
                datasets: [
                    {
                        label: this.mapTiposPlanos[EnumTipoPlano.Free],
                        data: valores.valores.planoFree,
                        fill: true,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 99, 132)'
                    }, {
                        label: this.mapTiposPlanos[EnumTipoPlano.Mensal],
                        data: valores.valores.planoMensal,
                        fill: true,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgb(54, 162, 235)',
                        pointBackgroundColor: 'rgb(54, 162, 235)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(54, 162, 235)'
                    },
                    {
                        label: this.mapTiposPlanos[EnumTipoPlano.Semestral],
                        data: valores.valores.planoSemestral,
                        fill: true,
                        backgroundColor: 'rgba(5a, 18, 70, 0.2)',
                        borderColor: 'rgb(4a, 18, 68)',
                        pointBackgroundColor: 'rgb(4a, 18, 68)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(4a, 18, 68)'
                    },
                    {
                        label: this.mapTiposPlanos[EnumTipoPlano.Anual],
                        data: valores.valores.planoAnual,
                        fill: true,
                        backgroundColor: 'rgba(5, 180, 00, 0.5)',
                        borderColor: 'rgb(00, 80, 00)',
                        pointBackgroundColor: 'rgb(00, 80, 00)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(00, 80, 00)',
                    },
                    {
                        label: this.mapTiposPlanos[EnumTipoPlano.PromocionalAnual],
                        data: valores.valores.planoPromocionalAnual,
                        fill: true,
                        backgroundColor: 'rgba(154, 162, 235, 0.2)',
                        borderColor: 'rgb(143, 16, 25)',
                        pointBackgroundColor: 'rgb(143, 16, 25)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(143, 16, 25)'
                    }
                ]
            },
            options: {
                elements: {
                    line: {
                        borderWidth: 3
                    }
                }
            }
        });
    }
}
