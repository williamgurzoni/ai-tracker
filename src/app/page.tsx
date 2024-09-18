'use client';

import { useEffect } from 'react';
import * as d3 from 'd3';
import Title from './components/title';
import Repos from './repos';
import Stats from './stats';
import data from './data.json';

const colors = {
  groups: '#7733ff',
  'image-generation': '#00FFFF',
  agents: '#FF00FF',
  'self-hosted-llm': '#FFFF00',
  'gui-image-generation': '#00FF00',
};

export default function Home() {
  // Exemple:
  // https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork

  useEffect(() => {
    // Specify the dimensions of the chart.
    const width = 700;
    const height = 700;

    const projects = data['my-nodes'];

    // Normalize stars
    // The normalized value should be between 2 and 8
    const maxStars = Math.max(...projects.map((d) => d.stars));
    const minStars = Math.min(...projects.map((d) => d.stars));
    projects.forEach((project) => {
      project.stars = Math.round(
        2 + ((project.stars - minStars) / (maxStars - minStars)) * 7
      );
    });

    const groups = data['my-groups'];
    const nodes = [...projects, ...groups].map((d) => ({
      ...d,
    }));
    const links = data['my-links'];

    // Create a simulation with several forces.
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(links).id((d) => d.id)
      )
      .force('charge', d3.forceManyBody())
      .force('x', d3.forceX())
      .force('y', d3.forceY());

    // Create the SVG container.
    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height]);

    // Add a line for each link, and a circle for each node.
    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', (d) => 1.5);

    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', (d) => d.stars || 5)
      .attr('fill', (d) => colors[d.group || 'groups']);

    node.append('title').text((d) => d.name);

    // Add a drag behavior.
    node.call(
      d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    );

    // Set the position attributes of links and nodes each time the simulation ticks.
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    });

    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // When this cell is re-run, stop the previous simulation. (This doesn’t
    // really matter since the target alpha is zero and the simulation will
    // stop naturally, but it’s a good practice.)
    // invalidation.then(() => simulation.stop());

    // svg.node();
  }, []);

  return (
    <div>
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col gap-10">
          <div id="chart" className="bg-gray-200 w-[700px] h-[700px]"></div>

          <Title>AI Tracker for Devs</Title>
          <div className="text-center text-lg">
            Your Gateway to the Most Influential AI Repositories
          </div>

          <Stats />
        </div>
      </div>
      <Repos />
    </div>
  );
}
