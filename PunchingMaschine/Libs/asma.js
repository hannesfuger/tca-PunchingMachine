/// <reference path="d3.js" />

function DrawElement(DivID, Mat, SelRun, SelElem) {
    var svg = d3.select("div[id='" + DivID + "']").select('div').select('svg');
    var stRun = Mat.astRuns[SelRun];

    if (stRun == null) {
        return
    }

    var stTool = stRun.stTool;
    var stToolHolder = stRun.stToolHolder;
    var stElement = stRun.astElements[SelElem];

    if (stElement == null) {
        return
    }

// ELEMENT
    var bActiveElem = stElement.bActive;
    var fX_Pos = stElement.fX_Pos;
    var fY_Pos = stElement.fY_Pos;
    var nCountX = stElement.nCountX;
    var fDistanceX = stElement.fDistanceX;
    var nCountY = stElement.nCountY;
    var fDistanceY = stElement.fDistanceY;
    var bCenterElem = stElement.bCentering;
    var eOrigin = stElement.eOrigin;

    var toolWidth = 0;
    var toolHeight = 0;
    var toolCorner = 0;
    var toolDieCount = 0;
    var toolOffset = 0;

// DEFINE TOOL
    if (stTool.eDieGeometry == 1) {            // square
        toolWidth = stTool.fLength;
        toolHeight = stTool.fLength;
        toolCorner = stTool.fRoundCorner;
    }
    if (stTool.eDieGeometry == 2) {            // rectagular
        toolWidth = stTool.fLength; 
        toolHeight = stTool.fWidth;
        toolCorner = stTool.fRoundCorner;
    }
    if (stTool.eDieGeometry == 3) {            // circle
        toolWidth = stTool.fRadius * 2;
        toolHeight = stTool.fRadius * 2;
        toolCorner = stTool.fRadius;
    }
    if (stTool.eDieGeometry == 4) {            // point
        toolWidth = 4;
        toolHeight = toolWidth;
        toolCorner = toolWidth / 2;
    }
    if (stToolHolder.bMultiDie == true) {                 // multiDie
        toolDieCount = stToolHolder.nDieCount;
        toolOffset = stToolHolder.fDie_Offset;
    } else    
    {
        toolDieCount = 1;
        toolOffset = 0;
    }
    if (stToolHolder.bRotateDie == true) {                 // rotate Die
        var vartmp = toolWidth;
        toolWidth = toolHeight;
        toolHeight = vartmp;
    }


// DEFINE PATTERN
    svg.select('defs').selectAll('pattern').filter('#tool_' + SelRun + '_' + SelElem).remove();

    var tool = svg.select('defs')
         .append('pattern')
         .attr('id', 'tool_' + SelRun + '_' + SelElem)
         .attr('patternUnits', 'userSpaceOnUse')
         .attr('width', Math.max(fDistanceX, toolWidth))
         .attr('height', Math.max(fDistanceY, toolHeight));

    if ((fDistanceY >= toolHeight || nCountY == 1) && (fDistanceX >= toolWidth || nCountX == 1)) {
        tool.attr('class', 'run_' + SelRun)
            .append('rect')
            .attr('width', toolWidth)
            .attr('height', toolHeight)
            .attr('rx', toolCorner)
            .attr('ry', toolCorner)
    } else {
        tool.attr('class', 'error')
            .append('rect')
            .attr('width', Math.max(fDistanceX, toolWidth))
            .attr('height', Math.max(fDistanceY, toolHeight))
            .attr('rx', '0')
            .attr('ry', '0')
    }
    
// DRAW HOLES
        svg.selectAll('class, .run_' + SelRun + '_' + SelElem).remove();
    
        if (bActiveElem != true) {
            return;
        }

        if (nCountX * nCountY < 1) {
            return;
        }

        if (bCenterElem == true) {
            fY_Pos = (Mat.fWidth - (toolOffset * (toolDieCount - 1) + fDistanceY * (nCountY - 1))) / 2;
        }

        var transX = 0;
        var transY = 0;

        for (var h = 0; h < toolDieCount; h++) {
            
            if (eOrigin == 0) {
                transX = fX_Pos - toolWidth / 2;
                transY = fY_Pos - toolHeight / 2 + toolOffset * h;
            }
            if (eOrigin == 1) {
                transX = Mat.fLenght - (fX_Pos + ((nCountX - 1) * fDistanceX + toolWidth)) + toolWidth / 2;
                transY = fY_Pos - toolHeight / 2 + toolOffset * h;
            }
            if (eOrigin == 2) {
                transX = fX_Pos - toolWidth / 2;
                transY = Mat.fWidth - (fY_Pos + ((nCountY - 1) * fDistanceY + toolHeight)) + toolHeight / 2 - toolOffset * h;
            }
            if (eOrigin == 3) {
                transX = Mat.fLenght - (fX_Pos + ((nCountX - 1) * fDistanceX + toolWidth)) + toolWidth / 2;
                transY = Mat.fWidth - (fY_Pos + ((nCountY - 1) * fDistanceY + toolHeight)) + toolHeight / 2 - toolOffset * h;
            }

            svg.select('g').append('rect')
                .attr('class', 'run_' + SelRun + '_' + SelElem)
                .attr('id', 'run_' + SelRun + '_' + SelElem + '_' + h)
                .attr('width', (nCountX - 1) * fDistanceX + toolWidth)
                .attr('height', (nCountY - 1) * fDistanceY + toolHeight)
                .attr('transform', 'translate(' + transX + ',' + transY + ')')

                .attr('fill', 'url(#tool_' + SelRun + '_' + SelElem + ')');

        }

       
};

function SelElement(DivID, SelRun, SelElem) {
    var svg = d3.select("div[id='" + DivID + "']").select('div').select('svg');

    svg.select('defs').selectAll('pattern').style('fill', 'white');
    svg.select('defs').selectAll('pattern').style('fill-opacity', '1');
    svg.select('defs').selectAll('pattern').filter('.run_' + SelRun).style('fill', 'lightgrey');
    svg.select('defs').selectAll('pattern').filter('.run_' + SelRun).style('fill-opacity', '1');

    svg.select('defs').selectAll('pattern').filter('#tool_' + SelRun + '_' + SelElem).style('fill', 'green');
    svg.select('defs').selectAll('pattern').filter('#tool_' + SelRun + '_' + SelElem).style('fill-opacity', '1');

    svg.select('defs').selectAll('pattern').filter('.error').style('fill', 'red');

};

function DeSelRun(DivID, SelRun) {
    var svg = d3.select("div[id='" + DivID + "']").select('div').select('svg');

    svg.select('defs').selectAll('pattern').filter('.run_' + SelRun).style('fill', '#DE992F');
    svg.select('defs').selectAll('pattern').filter('.run_' + SelRun).style('fill-opacity', '1');

};

function SelRun(DivID, SelRun) {
    var svg = d3.select("div[id='" + DivID + "']").select('div').select('svg');

    svg.select('defs').selectAll('pattern').filter('.run_' + SelRun).style('fill', 'white');
    svg.select('defs').selectAll('pattern').filter('.run_' + SelRun).style('fill-opacity', '1');

};

function RedrawElement(DivID, Mat, SelRun, SelElem) {
    var svg = d3.select("div[id='" + DivID + "']").select('div').select('svg');
    var stRun = Mat.astRuns[SelRun];

    if (stRun == null) {
        return
    }

    var stTool = stRun.stTool;
    var stToolHolder = stRun.stToolHolder;
    var stElement = stRun.astElements[SelElem];

    if (stElement == null) {
        return
    }

    var fX_Pos = stElement.fX_Pos;
    var fY_Pos = stElement.fY_Pos;
    var nCountX = stElement.nCountX;
    var fDistanceX = stElement.fDistanceX;
    var nCountY = stElement.nCountY;
    var fDistanceY = stElement.fDistanceY;
    var bActiveElem = stElement.bActive;
    var bCenterElem = stElement.bCentering;
    var eOrigin = stElement.eOrigin;

    var toolWidth = 0;
    var toolHeight = 0;
    var toolCorner = 0;
    var toolDieCount = 0;
    var toolOffset = 0;

    // DEFINE TOOL
    if (stTool.eDieGeometry == 1) {            // square
        toolWidth = stTool.fLength;
        toolHeight = stTool.fLength;
        toolCorner = stTool.fRoundCorner;
    }
    if (stTool.eDieGeometry == 2) {            // rectagular
        toolWidth = stTool.fLength;
        toolHeight = stTool.fWidth;
        toolCorner = stTool.fRoundCorner;
    }
    if (stTool.eDieGeometry == 3) {            // circle
        toolWidth = stTool.fRadius * 2;
        toolHeight = stTool.fRadius * 2;
        toolCorner = stTool.fRadius;
    }
    if (stTool.eDieGeometry == 4) {            // point
        toolWidth = 4;
        toolHeight = toolWidth;
        toolCorner = toolWidth / 2;
    }
    if (stToolHolder.bMultiDie == true) {                 // multiDie
        toolDieCount = stToolHolder.nDieCount;
        toolOffset = stToolHolder.fDie_Offset;
    } else {
        toolDieCount = 1;
        toolOffset = 0;
    }
    if (stToolHolder.bRotateDie == true) {                 // rotate Die
        var vartmp = toolWidth;
        toolWidth = toolHeight;
        toolHeight = vartmp;
    }

    // DEFINE PATTERN OVERRIDE EXISTING VARIABLE
    var tool = svg.select('defs').selectAll('pattern').filter('#tool_' + SelRun + '_' + SelElem);

    tool.attr('patternUnits', 'userSpaceOnUse')
         .attr('width', Math.max(fDistanceX, toolWidth))
         .attr('height', Math.max(fDistanceY, toolHeight));

    if ((fDistanceY >= toolHeight || nCountY == 1) && (fDistanceX >= toolWidth || nCountX == 1)) {
        tool.attr('class', 'run_' + SelRun)
            .select('rect')
            .attr('width', toolWidth)
            .attr('height', toolHeight)
            .attr('rx', toolCorner)
            .attr('ry', toolCorner)
    } else {
        tool.attr('class', 'error')
            .select('rect')
            .attr('width', Math.max(fDistanceX, toolWidth))
            .attr('height', Math.max(fDistanceY, toolHeight))
            .attr('rx', '0')
            .attr('ry', '0')
    }


    // DRAW HOLES
    var holes = svg.selectAll('g').filter('.svg-pan-zoom_viewport').select('g')
    holes.selectAll('class, .run_' + SelRun + '_' + SelElem).remove();

   if (bActiveElem != true) {
     return;
   }

    if (nCountX * nCountY < 1) {
        return;
    }

    if (bCenterElem == true) {
        fY_Pos = (Mat.fWidth - (toolOffset * (toolDieCount - 1) + fDistanceY * (nCountY - 1))) / 2;
    }

    var transX = 0;
    var transY = 0;

    for (var h = 0; h < toolDieCount; h++) {

        if (eOrigin == 0) {
            transX = fX_Pos - toolWidth / 2;
            transY = fY_Pos - toolHeight / 2 + toolOffset * h;
        }
        if (eOrigin == 1) {
            transX = Mat.fLenght - (fX_Pos + ((nCountX - 1) * fDistanceX + toolWidth)) + toolWidth / 2;
            transY = fY_Pos - toolHeight / 2 + toolOffset * h;
        }
        if (eOrigin == 2) {
            transX = fX_Pos - toolWidth / 2;
            transY = Mat.fWidth - (fY_Pos + ((nCountY - 1) * fDistanceY + toolHeight)) + toolHeight / 2 - toolOffset * h;
        }
        if (eOrigin == 3) {
            transX = Mat.fLenght - (fX_Pos + ((nCountX - 1) * fDistanceX + toolWidth)) + toolWidth / 2;
            transY = Mat.fWidth - (fY_Pos + ((nCountY - 1) * fDistanceY + toolHeight)) + toolHeight / 2 - toolOffset * h;
        }

        holes.append('rect')
            .attr('class', 'run_' + SelRun + '_' + SelElem)
            .attr('id', 'run_' + SelRun + '_' + SelElem + '_' + h)
            .attr('width', (nCountX - 1) * fDistanceX + toolWidth)
            .attr('height', (nCountY - 1) * fDistanceY + toolHeight)
            .attr('transform', 'translate(' + transX + ',' + transY + ')')

            .attr('fill', 'url(#tool_' + SelRun + '_' + SelElem + ')');

    }

   
    SelElement(DivID, SelRun, SelElem)

};

function DrawCompleteMat(DivID, Mat) {

    d3.select("div[id='" + DivID + "']").select("div").select('svg').remove();
    
    var svg = d3.select("div[id='" + DivID + "']").select("div").append('svg')
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("id", "mat")
        svg.append('defs');
        svg.append('g')
            .attr('transform', 'rotate(180)')
            .append("rect")
            //.attr("x", 500)
            //.attr("y", 500)
            .attr("width", Mat.fLenght)
            .attr("height", Mat.fWidth)
            .attr("rx", 0)
            .attr("ry", 0)
            .style("fill", "#DE992F")
 



    for (var l = 0; l < 8; l++) {                   // Schleife der Durchläufe
        for (var k = 0; k < 128; k++) {              // Schleife der Elemente
            DrawElement(DivID, Mat, l, k);
        }
    }

    var patterm = d3.select("div[id='" + DivID + "']").select('div').select('svg');

    patterm.select('defs').selectAll('pattern').style('fill', '#DE992F');
    patterm.select('defs').selectAll('pattern').style('fill-opacity', '1');


    var svgmat = svgPanZoomRotate.init('#mat', {
        viewportSelector: '.svg-pan-zoom_viewport',
        zoomEnabled: true,
        controlIconsEnabled: false,
        center: true,
    });

    svgmat.fit();
    svgmat.zoom(0.9);

   // svgmat.zoomAtPoint(1, { x: 0, y: 0 })
    //svgmat.pan({ x:1620, y: 700 })
};

function RedrawCompleteMat(DivID, Mat) {

    for (var l = 0; l < 8; l++) {                   // Schleife der Durchläufe
        for (var k = 0; k < 128; k++) {              // Schleife der Elemente
            RedrawElement(DivID, Mat, l, k);
        }
    }

};



function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
