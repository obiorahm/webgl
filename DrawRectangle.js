console.log('got to draw rectangle');

//Vertex shader program
var VSHADER_SOURCE =
	'attribute vec4 a_Position; \n' +
	'attribute float a_PointSize; \n' +
	'void main(){ \n' +
		'gl_Position = a_Position; \n' +
		'gl_PointSize = a_PointSize; \n' +
	'}\n';


var FSHADER_SOURCE = 
	'precision mediump float; \n' +
	'uniform vec4 u_FragColor; \n' + 
	'void main(){ \n' +
		'gl_FragColor = u_FragColor; \n' +
	' }\n';




function main(){
	var canvas = document.getElementById('example');

		console.log('Failed to retrieve the <canvas> element');

	//get the rendering context for 2DCG
	//var ctx = canvas.getContext('2d');
	//ctx.fillStyle ='rgba(0,0,255,1.0)'; //set to blue color
	//ctx.fillRect(120,10,150,150); //fill rectangle with the color

	var gl = getWebGLContext(canvas);
	if (!gl){
		console.log('Failed to get the rendering context for webgl')
		return;
	}


	//initialize shaders
	if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
		console.log('Failed to initialize shaders');
		return;
	}

	//get the storage location of attribute variable 
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if (a_Position < 0){
		console.log('Failed to get the storage location of a_Position');
		return;
	}

	//get a_PointSize attribute variable 
	var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
	if(a_PointSize < 0){
		console.log('Failed to get the storage location of a_PointSize');
		return;
	}

	var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
	if(u_FragColor < 0){
		console.log('Failed to get the storage location of u_FragColor');
		return;
	}


	canvas.onmousedown = function(ev){click(ev,gl,canvas, a_Position, u_FragColor);};

	gl.vertexAttrib1f(a_PointSize, 5.0);



	//specify the color for clearing <canvas>
	gl.clearColor(0.0,0.0,0.0,1.0);

	gl.clear(gl.COLOR_BUFFER_BIT);

	//Draw point 
	gl.drawArrays(gl.POINTS, 0, 1);



	//Draw a point
}


var g_points =[];
var g_colors = [];

function click(ev, gl, canvas, a_Position, u_FragColor){
	var x = ev.clientX; //x coordinate of a mouse pointer 
	var y = ev.clientY; //y coordinate of a mouse pointer

	var rect = ev.target.getBoundingClientRect();

	x = ((x - rect.left) - canvas.height/2)/(canvas.height/2)
	y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);

	g_points.push([x,y]);


	//store the color to g_colors array
	if(x >= 0.0 && y >= 0.0){
		g_colors.push([1.0, 0.0, 0.0, 1.0]);
	} else if (x >= 0.0 && y < 0.0){
		g_colors.push([0.0, 1.0, 0.0, 1.0]);
	} else if(x < 0.0 && y < 0.0){
		g_colors.push([0.0, 0.0, 1.0, 1.0]);
	}else{
		g_colors.push([1.0, 1.0, 1.0, 1.0]);
	}

console.log('size of x ' + x);

	// CLear <canvas>
	gl.clear(gl.COLOR_BUFFER_BIT);


	var len = g_points.length;
	for(var i = 0; i < len; i = i + 1){

		xy = g_points[i];


		gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

		rgba =  g_colors[i];

		gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

		//Draw point 
		gl.drawArrays(gl.POINTS, 0, 1);


	}
}


