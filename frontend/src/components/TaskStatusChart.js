import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const TaskStatusChart = ({ tasks }) => {
  const colors = ["#fcca03", "#13ba00", "#ba0006", "#F5C842", "#37D400"];
  const boxSize = 900;
  const chartRef = useRef(null);

  const width = 500;
  const height = 500;
  useEffect(() => {
    if (tasks && tasks.length) {
      // Calculate task status counts
      const statusCounts = tasks.reduce((counts, task) => {
        counts[task.status] = (counts[task.status] || 0) + 1;
        return counts;
      }, {});

      // Define color scale for task statuses
      const element = chartRef.current;
      const data = Object.keys(statusCounts).map((status) => ({
        status,
        value: statusCounts[status],
      }));
      d3.select(element).select("svg").remove();
      const svg = d3
        .select(element)
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("height", height)
        .attr("width", width)
        .attr("style", "max-width: 100%; max-height: 110vw")
        .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
        .append("g")
        .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);

      const arcGenerator = d3
        .arc()
        .cornerRadius(10)
        .padAngle(0.02)
        .innerRadius(100)
        .outerRadius(250);

      const pieGenerator = d3.pie().value((d) => d.value);
      const arcs = svg.selectAll().data(pieGenerator(data)).enter();
      arcs
        .append("path")
        .attr("d", arcGenerator)
        .style("fill", (d, i) => colors[i % data.length])
        .style("stroke", "#777")
        .style("stroke-width", "1px")
        .transition()
        .duration(800)
        .attrTween("d", function (d) {
          var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
          return function (t) {
            d.endAngle = i(t);
            return arcGenerator(d);
          };
        });
      const arcOuterRadius = 250; // Modify the outer radius value as needed
      const textOffset = 80;
      function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
      arcs
        .append("text")
        .attr("text-anchor", "middle")
        .text((d) => `${capitalizeFirstLetter(d.data.status)}: ${d.value}`)
        .style("fill", "black")
        .style("font-size", "0")
        .attr("x", (d) => {
          const [x, y] = arcGenerator.centroid(d);
          const angle = Math.atan2(y, x);
          const x2 =
            Math.cos(angle) * (arcOuterRadius + textOffset) +
            Math.cos(angle) * 50;
          return x2;
        })
        .attr("y", (d) => {
          const [x, y] = arcGenerator.centroid(d);
          const angle = Math.atan2(y, x);
          const y2 =
            Math.sin(angle) * (arcOuterRadius + textOffset) +
            Math.sin(angle) * 15;
          return y2;
        })
        .transition()
        .duration(800)
        .attr("dy", "0.35em")
        .attr("dx", "-0.35em")
        .style("font-size", "22px")
        .style("font-weight", "bold");

      // svg
      //   .append("circle")
      //   .attr("cx", 0)
      //   .attr("cy", 0)
      //   .style("fill", "#fff")
      //   .style("stroke", "#02c2db")
      //   .transition()
      //   .duration(800)
      //   .style("stroke-width", "3px")
      //   .attr("r", 90);

      // Modify the text offset value as needed
      arcs
        .append("line")
        .attr("class", "line")
        .transition()
        .duration(800)
        .attr("x1", (d) => {
          const centroid = arcGenerator.centroid(d);
          const midAngle = (d.startAngle + d.endAngle - 15.7) / 2;
          const x = Math.cos(midAngle) * arcOuterRadius;
          return x;
        })
        .attr("y1", (d) => {
          const centroid = arcGenerator.centroid(d);
          const midAngle = (d.startAngle + d.endAngle - 15.7) / 2;
          const y = Math.sin(midAngle) * arcOuterRadius;
          return y;
        })
        .attr("x2", (d) => {
          const centroid = arcGenerator.centroid(d);
          const midAngle = (d.startAngle + d.endAngle - 15.7) / 2;
          const x = Math.cos(midAngle) * (arcOuterRadius + textOffset);
          return x;
        })
        .attr("y2", (d) => {
          const centroid = arcGenerator.centroid(d);
          const midAngle = (d.startAngle + d.endAngle - 15.7) / 2;
          const y = Math.sin(midAngle) * (arcOuterRadius + textOffset);
          return y;
        })
        .attr("stroke", "black");
    }
  }, [tasks]);

  return (
    <div style={{ maxWidth: "90%" }}>
      <div width={width} height={height} ref={chartRef}></div>
    </div>
  );
};

export default TaskStatusChart;
