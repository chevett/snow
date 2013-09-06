var fs = require('fs'), 
	smusher = require('node-minify');


function toWhiteSpace(v){
	var ans = '',t;

	for (var i=0; i<v.length; i++){

		t = (v.charCodeAt(i).toString(2))
		t = new Array(9-t.length).join('0')+t;
		t = t.replace(/1/g, ' ').replace(/0/g, '	');
		
		ans +=t;
	}

	return ans;
}

function fromWhiteSpace(str){
	var ans = '', code, bCode, wCode, chr;

	for (var i=0; i<str.length; i+=8){
		wCode = str.substr(i, 8);
		bCode = wCode.replace(/ /g, '1').replace(/	/g, '0');
		code = parseInt(bCode, 2);
		chr = String.fromCharCode(code);

		ans+=chr;
	}

	return ans;
}

var fileName = process.argv[2],
	wsFileName = fileName+'.ws',
	goFileName = fileName+'.ws.go',
	minFileName = fileName+'.ws.go.min',
	js = fs.readFileSync(fileName).toString(),
	ws = toWhiteSpace(js),
	go = fromWhiteSpace.toString().replace(/fromWhiteSpace/, 'xj5') + 'eval(xj5("'+ws+'"));';


fs.writeFileSync(wsFileName, ws);


fs.writeFileSync(goFileName, go);

new smusher.minify({
    type: 'yui-js',
    fileIn: goFileName,
    fileOut: minFileName,
    callback: function(err){
    	if (err)
        	console.log(err);
    }
});
