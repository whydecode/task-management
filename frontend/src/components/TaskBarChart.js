import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";

const TaskBarChart = ({ tasks }) => {
  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const [data, setData] = useState([]);
  const [completed, setCompleted] = useState("");
  const [cancelled, setCancelled] = useState("");
  const chartRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  useEffect(() => {
    if (tasks && users) {
      const taskCounts = {};
      const completedTaskCounts = {};
      const cancelledTaskCounts = {};
      tasks.forEach((task) => {
        const { assignedUser, status } = task;
        const { name } = users.find((user) => user._id === assignedUser);

        if (taskCounts[name]) {
          taskCounts[name] += 1;
        } else {
          taskCounts[name] = 1;
        }

        if (status === "completed") {
          if (completedTaskCounts[name]) {
            completedTaskCounts[name] += 1;
          } else {
            completedTaskCounts[name] = 1;
          }
        } else {
          if (!completedTaskCounts[name]) {
            completedTaskCounts[name] = 0;
          }
        }
        if (status === "cancelled") {
          if (cancelledTaskCounts[name]) {
            cancelledTaskCounts[name] += 1;
          } else {
            cancelledTaskCounts[name] = 1;
          }
        } else {
          if (!cancelledTaskCounts[name]) {
            cancelledTaskCounts[name] = 0;
          }
        }
      });
      users.forEach((user) => {
        const { name } = user;
        if (!taskCounts[name]) {
          taskCounts[name] = 0;
        }
        if (!completedTaskCounts[name]) {
          completedTaskCounts[name] = 0;
        }
        if (!cancelledTaskCounts[name]) {
          cancelledTaskCounts[name] = 0;
        }
      });

      const userTaskCount = Object.entries(taskCounts).map(
        ([label, value]) => ({
          label,
          value,
        })
      );
      setData(userTaskCount);

      const userTaskCompleted = Object.entries(completedTaskCounts).map(
        ([label, value]) => ({
          label,
          value,
        })
      );
      setCompleted(userTaskCompleted);

      const userTaskCancelled = Object.entries(cancelledTaskCounts).map(
        ([label, value]) => ({
          label,
          value,
        })
      );
      setCancelled(userTaskCancelled);
    }
  }, [tasks, users]);

  const width = 500;
  const height = 500;
  useEffect(() => {
    if (data && chartRef.current) {
      // Set up chart dimensions
      const colors = ["#fcca03", "#13ba00", "#ba0006"];
      const margin = { top: 10, right: 20, bottom: 100, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      const mergedData = data.map((d1) => {
        const matchingData2 = completed.find((d2) => d2.label === d1.label);
        const matchingData3 = cancelled.find((d3) => d3.label === d1.label);
        return {
          label: d1.label,
          value1: d1.value - matchingData2.value - matchingData3.value,
          value2: matchingData2 ? matchingData2.value : 0,
          value3: matchingData3 ? matchingData3.value : 0,
        };
      });
      // Create x scale
      const x = d3
        .scaleBand()
        .domain(mergedData.map((d) => d.label))
        .range([-20, innerWidth])
        .padding(0.125);

      // Create y scale
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(mergedData, (d) => d.value1) + 1])
        .range([innerHeight, 20]);

      // Remove previous chart
      d3.select(chartRef.current).select("svg").remove();
      // Create chart
      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", mergedData.length * 50)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");
      // .attr("transform", `rotate(-90)`);

      // Add a rect for each bar.
      const group = svg.append("g");

      group
        .selectAll("g")
        .data(mergedData)
        .join("g")
        .attr(
          "transform",
          (d, i) => `translate(${i * x.bandwidth() + i * 5}, 0)`
        )
        .selectAll("rect")
        .data((d) => [d.value1, d.value2, d.value3])
        .join("rect")
        .attr("x", 0)
        .attr("y", (d) => y(d))
        .attr("width", x.bandwidth() / 3)
        .style("fill", (d, i) => colors[i % data.length])
        .attr("x", (d, i) => (x.bandwidth() / 3) * i) // Divide the bandwidth by 3 for grouped bars
        .transition()
        .duration(800)
        .attr("height", (d) => y(0) - y(d));

      svg
        .append("g")
        .attr("transform", `translate(10,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .selectAll("text")
        .style("text-anchor", "end")
        .style("font-size", "12px")
        .attr("dx", "-.8em")
        .attr("dy", "-.15em")
        .attr("transform", "rotate(-60)");

      // Add the y-axis and label, and remove the domain line.
      svg
        .append("g")
        .attr("transform", `translate(${-10},0)`)
        .call(d3.axisLeft(y).ticks(y.domain()[1]).tickFormat(d3.format("d")))
        .call((g) =>
          g
            .append("text")
            .attr("x", -margin.left)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("Number of Tasks")
            .attr("transform", "rotate(-90) translate(-110, -35)")
            .attr("style", "font-size: 17px;")
        );

      const colorMapping = [
        { label: "Pending" },
        { label: "Completed" },
        { label: "Cancelled" },
      ];
      const legend = svg
        .append("g")
        .attr(
          "transform",
          `translate(${innerWidth + margin.left + margin.right}, ${margin.top})`
        );

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
  }, [data, width, height]);
  return (
    <div
      ref={chartRef}
      style={{
        marginLeft: "5%",
      }}
    ></div>
  );
};

export default TaskBarChart;
