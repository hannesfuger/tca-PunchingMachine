(function (TcHmi) {

    var CopyValues = function (par1, Index, AllParamters) {

        if (par1 == null || AllParamters == null) {
            return
        }

        AllParamters[Index] = par1;
        return AllParamters;
    };
    
    TcHmi.Functions.registerFunction('CopyValues', CopyValues);
})(TcHmi);