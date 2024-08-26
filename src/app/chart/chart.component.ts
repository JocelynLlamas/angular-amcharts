import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  private root!: am5.Root;

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    // Create root element
    this.root = am5.Root.new(this.elRef.nativeElement);

    // Apply a theme
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    // Create a Pie Chart
    let chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        endAngle: 270
      })
    );

    // Create Series
    let series = chart.series.push(
      am5percent.PieSeries.new(this.root, {
        valueField: "value",
        categoryField: "category",
        endAngle: 270
      })
    );

    series.data.setAll([
      { value: 10, category: "Category 1" },
      { value: 20, category: "Category 2" },
      { value: 30, category: "Category 3" }
    ]);

    series.appear(1000, 100);
  }

  ngOnDestroy(): void {
    // Clean up the chart when the component is destroyed
    if (this.root) {
      this.root.dispose();
    }
  }
}
