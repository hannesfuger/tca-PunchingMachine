(function (TcHmi) {

    var PasteValues = function (par1, Index, AllParamters) {

        if (par1 == null || AllParamters == null) {
            return
        }

        par1 = AllParamters[Index];
        return par1;
    };
    
    TcHmi.Functions.registerFunction('PasteValues', PasteValues);
})(TcHmi);