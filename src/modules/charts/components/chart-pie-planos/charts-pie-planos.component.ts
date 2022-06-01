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
    selector: 'sb-chart-pie-planos',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-pie-planos.component.html',
    styleUrls: ['charts-pie-planos.component.scss'],
})
export class ChartPiePlanosComponent implements OnInit, AfterViewInit {
    @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;
    chart!: Chart;

    public mapTiposPlanos = mapTiposPlanos;

    constructor(
        private readonly _estatisticasService: EstatisticasService
    ) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this._estatisticasService.getEstatisticasPercentualAssinantesPorPlano().subscribe(
            (res: any) => {
                if (res) {
                    this.configChart(res);
                } else {
                    this.configChart({
                        percentualPlanoFree:  0,
                        percentualPlanoMensal: 0,
                        percentualPlanoSemestral: 0,
                        percentualPlanoAnual:  0,
                        percentualPlanoPromocionalAnual: 0
                    });
                }
            }, (err=>{
                this.configChart({
                    percentualPlanoFree:  0,
                    percentualPlanoMensal: 0,
                    percentualPlanoSemestral: 0,
                    percentualPlanoAnual:  0,
                    percentualPlanoPromocionalAnual: 0
                });
            })
        );
    }

    private configChart(percentuais: any){
        this.chart = new Chart(this.myPieChart.nativeElement, {
            type: 'pie',
            data: {
                labels: [
                    this.mapTiposPlanos[EnumTipoPlano.Free],
                    this.mapTiposPlanos[EnumTipoPlano.Mensal],
                    this.mapTiposPlanos[EnumTipoPlano.Semestral],
                    this.mapTiposPlanos[EnumTipoPlano.Anual],
                    this.mapTiposPlanos[EnumTipoPlano.PromocionalAnual]
                ],
                datasets: [
                    {
                        data: [
                            percentuais.percentualPlanoFree,
                            percentuais.percentualPlanoMensal,
                            percentuais.percentualPlanoSemestral,
                            percentuais.percentualPlanoAnual,
                            percentuais.percentualPlanoPromocionalAnual
                        ],
                        backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#743343'],
                    }
                ],
            }
        });
    }
}
