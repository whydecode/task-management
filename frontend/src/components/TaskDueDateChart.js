import React, { useEffect, useRef, useState } from "react";

import * as d3 from "d3";
const TaskDueDateChart = ({ tasks }) => {
  const chartRef = useRef();

  const [data, setData] = useState([]);

  useEffect(() => {
    const calculateDaysToDue = () => {
      const currentDate = new Date();
      const updatedDaysToDue = tasks.map((task) => {
        const dueDate = new Date(task.dueDate);
        const timeDiff = dueDate.getTime() - currentDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
        return { title: task.title, value: daysDiff };
      });
      updatedDaysToDue.sort((a, b) => b.value - a.value);
      setData(updatedDaysToDue);
    };
    calculateDaysToDue();
  }, [tasks]);
  useEffect(() => {
    if (data && data.length) {
      const element = chartRef.current;
      const width = 700;
      const height = 500;

      d3.select(element).select("svg").remove();
      const svg = d3
        .select(element)
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("height", height)
        .attr("width", width)
        .attr("style", "max-width: 100%; max-height: 110vw")
        .attr("viewBox", `0 0 ${width + 100} ${height + 30}`)
        .append("g");
      // .attr("transform", `translate(${margin.left}, ${margin.top})`);

      var cfg = {
        labelMargin: 5,
        xAxisMargin: 10,
        legendRightMargin: 0,
      };
      // Add title
      svg
        .append("g")
        .attr("class", "legend")
        .append("text")
        .attr("x", width - cfg.legendRightMargin)
        .attr("y", 550)
        .attr("text-anchor", "end")
        .text("Due in (days)");
      const x = d3.scaleLinear().range([0, width]);

      const colour = d3
        .scaleQuantize()
        .domain([-1, 1])
        .range([d3.rgb("#ba0006"), d3.rgb("#fcca03")]);

      const y = d3.scaleBand().range([height, 0]).padding(0.3);

      y.domain(
        data.map(function (d) {
          return d.title;
        })
      );
      x.domain(
        d3.extent(data, function (d) {
          return d.value;
        })
      );
      var max = d3.max(data, function (d) {
        return d.value;
      });
      colour.domain([-max, max]);
      // Add the x Axis
      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (height + cfg.xAxisMargin) + ")")
        .call(d3.axisBottom(x).ticks(x.domain()[1] / 2));
      svg
        .append("g")
        .attr("class", "bars")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "annual-growth")
        .attr("x", function (d) {
          return x(Math.min(0, d.value));
        })
        .attr("y", function (d) {
          return y(d.title);
        })
        .attr("height", y.bandwidth())

        .style("fill", function (d) {
          return colour(d.value);
        })
        .transition()
        .duration(800)
        .attr("width", function (d) {
          return Math.abs(x(d.value) - x(0));
        });
      svg
        .append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", x(0))
        .attr("y", function (d) {
          return y(d.title);
        })
        .attr("dx", function (d) {
          return d.value < 0 ? cfg.labelMargin : -cfg.labelMargin;
        })
        .attr("dy", y.bandwidth() - 5)
        .attr("text-anchor", function (d) {
          return d.value < 0 ? "start" : "end";
        })
        .text(function (d) {
          return d.title;
        })
        .style("fill", "black");
      const colors = ["#fcca03", "#ba0006"];

      const colorMapping = [{ label: "In Progress" }, { label: "Overdue" }];
      const legend = svg
        .append("g")
        .attr("transform", `translate(${width + 50}, ${20})`);

      const legendEntries = legend
        .selectAll(".legend-entry")
        .data(colorMapping.map((d) => d.label))
        .enter()
        .append("g")
        .attr("class", "legend-entry")
        .attr("transform", (d, i) => `translate(-100, ${i * 20})`);

      legendEntries
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", (d, i) => colors[i % data.length]);

      legendEntries
        .append("text")
        .attr("x", 20)
        .attr("y", 11)
        .text((d) => d)
        .attr("style", "font-size: 14px;");
    }
  }, [data]);

  return (
    <div style={{ marginLeft: "5%" }}>
      <div ref={chartRef}></div>
    </div>
  );
};

export default TaskDueDateChart;
