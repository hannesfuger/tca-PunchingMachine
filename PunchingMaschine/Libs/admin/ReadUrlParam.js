// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var ReadUrlParam = function (ParameterName) {

        //Get the complete url from browser and splitting the url at "?" in an array, e.g. http://127.0.0.1:1010/?View=View1
        let paramArray = window.location.href.split('?');
        //Create temp variables for the path parameter
        let pathParam = "";

        //Search in paramArray of splitted url for 'View=', e.g. "View=View1"
        for (i = 0; i < paramArray.length; i++) {
            if (paramArray[i].indexOf(ParameterName + '=') === 0) {
                pathParam = paramArray[i].split('/').join('');
                break;
            }
        }


        return pathParam

    
    };
    
    TcHmi.Functions.registerFunction('ReadUrlParam', ReadUrlParam);
})(TcHmi);