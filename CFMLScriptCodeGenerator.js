var CFMLScriptCodeGenerator = function() {


    this.generate = function(context,requests,options){
        var generated = "" ;

            // iterate requests (`Request` objects)
            for (var i in requests) {

                var request = requests[i];
                var request_code = 'cfhttp(url="' + request.urlBase + '"';
                    request_code += ', method="' + request.method + '"';
                    request_code += '){\n';
                
                var headers = request.headers;
                for (var header_name in headers) {
                    var header_value = headers[header_name];
                    request_code += '\tcfhttpparam(type="header", name="'+header_name+'", value="'+header_value+'");\n';
                }

                var urlparams = request.getUrlParameters();
                for (var urlparam_name in urlparams) {
                    var urlparam_value = urlparams[urlparam_name];
                    request_code += '\tcfhttpparam(type="url", name="'+urlparam_name+'", value="'+urlparam_value+'");\n';
                }
                
                //TODO: add form vars
                request_code +=  "\n}";
                generated += request_code + "\n\n";
            }




        return generated;
    }

}

CFMLScriptCodeGenerator.identifier = "org.lucee.CFMLScriptCodeGenerator";
CFMLScriptCodeGenerator.title = "CFML Script Code Generator";
registerCodeGenerator(CFMLScriptCodeGenerator);