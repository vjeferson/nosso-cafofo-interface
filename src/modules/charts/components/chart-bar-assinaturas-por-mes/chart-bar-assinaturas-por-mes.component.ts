import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { EstatisticasService } from '@app/api/services';
import { Chart } from 'chart.js';

@Component({
    selector: 'sb-chart-bar-assinaturas-por-mes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './chart-bar-assinaturas-por-mes.component.html',
    styleUrls: ['chart-bar-assinaturas-por-mes.component.scss'],
})
export class ChartBarAssinaturasPorMesComponent implements OnInit, AfterViewInit {
    @ViewChild('myBarChart') myBarChart!: ElementRef<HTMLCanvasElement>;
    chart!: Chart;
    private readonly LIST_MONTHS = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto'
    ];

    private readonly VALUES_DEFAULT = {
        janeiro: 0,
        fevereiro: 0,
        marco: 0,
        abril: 0,
        maio: 0,
        junho: 0,
        julho: 0,
        agost: 0
    }

    constructor(
        private readonly _estatisticasService: EstatisticasService
    ) { }

    ngOnInit() {}

    ngAfterViewInit() {
        this._estatisticasService.getEstatisticasAssinanturasPorMes().subscribe(
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

    private configChart(valores: any){
        this.chart = new Chart(this.myBarChart.nativeElement, {
            type: 'bar',
            data: {
                labels: this.LIST_MONTHS,
                datasets: [
                    {
                        label: 'Nova(s) assinatura(s)',
                        backgroundColor: 'rgba(2,117,216,1)',
                        borderColor: 'rgba(2,117,216,1)',
                        data: [
                            valores.janeiro,
                            valores.fevereiro,
                            valores.marco,
                            valores.abril,
                            valores.maio,
                            valores.junho,
                            valores.julho,
                            valores.agosto
                        ]
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            time: {
                                unit: 'month',
                            },
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                maxTicksLimit: 8
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                max: 50,
                                maxTicksLimit: 5
                            },
                            gridLines: {
                                display: true
                            }
                        }
                    ]
                },
                legend: {
                    display: false
                }
            }
        });
    }
}
