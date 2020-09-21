//vertex shader program

var VSHADER_SOURCE =
	'attribute vec4 a_Position; \n' +
	'void main(){ \n ' +
	'	gl_Position = a_Position; \n ' +
	'	gl_PointSize = 10.0; \n ' +
		'} ';


//fragment shader 

var FSHADER_SOURCE = 
	'precision mediump float; \n' +
	'uniform vec4 u_FragColor; \n' + 
	'void main(){ \n' +
		'gl_FragColor = u_FragColor; \n' +
	' }\n'; 

function main(){

	var canvas = document.getElementById('example');

		console.log('Failed to retrieve the <canvas> element');

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

	//Set the position of vertices 
	var n = initVertexBuffers(gl);
	if(n < 0){
		console.log('Ffailed to set the position of the vertices');
	}

}