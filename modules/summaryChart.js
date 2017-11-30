import * as d3 from 'd3';
import { timeParse } from 'd3-time-format';
import { scaleTime, scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';


let svg;
let height;
let width;
let valueline;
let x;
let y;

const parseTime = timeParse('%d-%b-%y');

const updateData = (data) => {
	data.forEach((d) => {
		d.date = parseTime(d.date);
		d.close = +d.close;
	});

	x.domain(
		d3.extent(data, (d) => d.date)
	);

	y.domain(
		[0, d3.max(data, (d) => d.close)]
	);

	svg.append('path')
		.data([data])
		.attr('class', 'line')
		.attr('d', valueline);

	svg.append('g')
		.attr('transform', `translate(0, ${height})`)
		.call(d3.axisBottom(x));

	svg.append('g')
		.call(d3.axisLeft(y));
};

const getData = () => {
	d3.csv('data.csv', (error, data) => {
		if (error) {
			throw error;
		} else {
			updateData(data);
		}
	});
};

export class SummaryChart {
	constructor() {
		const margin = {top: 20, right: 20, bottom: 30, left: 50};
		width = 960 - margin.left - margin.right;
		height = 500 - margin.top - margin.bottom;


		x = scaleTime().range([0, width]);
		y = scaleLinear().range([height, 0]);

		valueline = line()
			.x((d) => x(d.date))
			.y((d) => y(d.close));


		svg = d3.select('body').append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		getData();
	}

	confirm() {
		console.log('Summary chart created.');
	}
}
