// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var GetToolStrings = function (Mat) {

        var array = new Array()

        array[0] = "kA";

        for (var SelRun = 0; SelRun < 9; SelRun++) {        

            var stRun = Mat.astRuns[SelRun];

            if (stRun == null) {
               continue
            }

            var stTool = stRun.stTool;
            var tmpToolName = stTool.stToolName;

            // check
            if (tmpToolName != "") {
                array[SelRun+1] = tmpToolName;
            }
        }


        var uniqueArray = [];
        $.each(array, function (i, el) {
            if ($.inArray(el, uniqueArray) === -1) uniqueArray.push(el);
        });

        return uniqueArray.sort();

    };
    
    TcHmi.Functions.registerFunction('GetToolStrings', GetToolStrings);
})(TcHmi);