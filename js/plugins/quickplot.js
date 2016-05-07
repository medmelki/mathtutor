var QuickPlot = function(canvas){
    //Canvas properties
    this.canvas;
    this.canvasContext;
    this.canvasWidth;
    this.canvasHeight;
    
    //Graph properties
    this.canvasBackgroundColor;
    this.functionColor;
    this.graphDomain; //Domain/range from far left to far right of the canvas
    this.graphRange;
    this.drawAxis;
    
    //Function properties
    this.functionLambda;
    this.functionDomain; //What domain/range to graph the function on
    this.functionRange;
    
    //METHODS-----------------------------------------------------------
    
    //void notifyCanvasSizeUpdate(redraw)
    //Refreshes canvas width and height and scales graph accordingly.
    //Redraws after internal resizing if redraw=true
    this.notifyCanvasSizeUpdate = function(redraw){
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        
        if(redraw){
            this.drawGraph();
        }
    }
    
    //SETTERS
    
    //void setDrawAxis(enabled) enables drawing the axis if passed true.
    //NOTE: Does not update canvas.
    this.setDrawAxis = function(enabled){
        this.drawAxis = enabled;
    }
    
    //void setBackgroundColor(color) sets the background color for the canvas.
    //Note: Does not update canvas
    //E.g. setBackgroundColor("#FFFFFF");
    this.setBackgroundColor = function(color){
        this.canvasBackgroundColor = color;
    }
    
    //void setFunctionColor(color) sets the function plot color.
    //Note: Does not update canvas.
    //E.g. setFunctionColor("#e3e300");
    this.setFunctionColor = function(color){
        this.functionColor = color;
    }
    
    //void setGraphDomain(from, to) sets the graph domain.
    //E.g. setGraphDomain(-2.5, 2.5) would make the very left of the graph x=-2.5 and
    //     the very right of the graph x=2.5
    this.setGraphDomain = function(from, to){
        this.graphDomain = {"from": from,
                            "to": to};
        if(this.functionDomain == undefined){
            this.functionDomain = this.graphDomain;
        }
    }
    
    //void setGraphRange(from, to) sets the graph range.
    //E.g. setGraphRange(-3, 0) would make the very top of the graph y=0 and
    //     the very bottom of the graph y=-3
    this.setGraphRange = function(from, to){
        this.graphRange = {"from": from,
                          "to": to};
        if(this.functionRange == undefined){
            this.functionRange = this.graphRange;
        }
    }
    
    //void setFunction(functionLambda) sets the function to be plotted to functionLambda
    //NOTE: setFunction does not update the canvas
    //NOTE: functionLambda must have one parameter and must output a floating point number.
    this.setFunction = function(functionLambda){
        this.functionLambda = functionLambda;
    }
    
    //void setFunctionDomain(from, to) sets the domain the function should be plotted on.
    //NOTE: This domain is bounded by the canvas domain.
    this.setFunctionDomain = function(from, to){
        this.functionDomain = {"from": from,
                              "to": to};
    }
    
    //void setFunctionRange(from, to) sets the range the function should be plotted on.
    //NOTE: This range is bounded by the canvss range.
    this.setFunctionRange = function(from, to){
        this.functionRange = {"from": from,
                             "to": to};
    }
    
    
    //GETTERS
    
    //Boolean getDrawAxis() returns whether or not axis is currently being drawn.
    this.getDrawAxis = function(){
        return this.drawAxis;
    }
    
    //Object getBackgroundColor() returns the current canvas background color.
    this.getBackgroundColor = function(){
        return this.canvasBackgroundColor;
    }
    
    //Object getFunctionColor() returns the current function color.
    this.getFunctionColor = function(){
        return this.functionColor;
    }
    
    //Object getGraphDomain() returns the current graph domain object.
    this.getGraphDomain = function(){
        return this.graphDomain;
    }
    
    //Object getGraphRange() returns the current graph range object.
    this.getGraphRange = function(){
        return this.graphRange;
    }
    
    //Object getFunctionDomain() returns the current function domain object.
    this.getFunctionDomain = function(){
        return this.functionDomain;
    }
    
    //Object getFunctionRange() returns the current function range object.
    this.getFunctionRange = function(){
        return this.functionRange;
    }
    
    //Function getFunctionLambda() returns the current function lambda.
    this.getFunctionLambda = function(){
        return this.functionLambda;
    }
    
    //boolean drawGraph() draws the graph according to properties set using setters.
    //NOTE: Returns false and prints an error if draw fails. Otherwise returns true.
    this.drawGraph = function(){
        //Check for valid properties
        var errorFlag = false;
        if(this.canvas == undefined || this.canvasContext == undefined){
            errorFlag = true;
            console.error("QuickPlot Error: Canvas not defined");
        }
        if(this.canvasWidth <=0 || this.canvasHeight <= 0){
            errorFlag = true;
            console.error("QuickPlot Error: Canvas dimension error.");
        }
        if(this.functionLambda == undefined || this.functionLambda == undefined){
            errorFlag = true;
            console.error("QuickPlot Error: Function not defined.");
        }
        if(this.graphDomain == undefined || this.graphRange == undefined){
            errorFlag = true;
            console.error("QuickPlot Error: Graph domain or range not set.");
        }
        if(this.graphDomain.to - this.graphDomain.from <= 0){
            errorFlag = true;
            console.error("QuickPlot Error: Graph domain error.");
        }
        
        if(errorFlag){
            return false;
        }
        
        //Properties are valid, we can draw the graph now.
        //First, draw the background.
        
        this.canvasContext.fillStyle = (this.canvasBackgroundColor == undefined) ? "#FFFFFF" : this.canvasBackgroundColor;
        this.canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        
        //Now draw the axis:
        if(this.drawAxis){
            var xAxis = (-1 * this.graphDomain.from) * (this.canvasWidth)/(this.graphDomain.to - this.graphDomain.from);
            var yAxis = (-1 * this.graphRange.from) * (this.canvasHeight)/(this.graphRange.to - this.graphRange.from);

            //Change to black color for axis
            this.canvasContext.fillStyle = "#000000";
            this.canvasContext.fillRect(xAxis, 0, 1, this.canvasHeight);
            this.canvasContext.fillRect(0, (this.canvasHeight - yAxis), this.canvasWidth, 1);
                                        //We flip the y because y=0 is at the top of the canvas
        }
        
        //Finally, the function
        this.canvasContext.fillStyle = (this.functionColor == undefined) ? "#AA0000" : this.functionColor;
        //We cache previous y2 values because they're the same as y1 on the next iteration.
        var cacheY1 = null;
        var cacheY1Pixel = null;
        for(var i = 0; i<=this.canvasWidth; i++){
            var x = ((i)  * ((this.graphDomain.to - this.graphDomain.from) / this.canvasWidth)) + this.graphDomain.from;
            
            if(x < this.functionDomain.from || x > this.functionDomain.to)
                continue;
            
            var y1 = (cacheY1 == null) ? this.functionLambda(x) : cacheY1;
            var y2 = this.functionLambda(x+((this.graphDomain.to - this.graphDomain.from) / this.canvasWidth));
            
            var y1Pixel = (cacheY1Pixel == null) ? ((y1 - this.graphRange.from) * (this.canvasHeight) / (this.graphRange.to - this.graphRange.from)) : cacheY1Pixel;
            var y2Pixel = ((y2 - this.graphRange.from) * (this.canvasHeight) / (this.graphRange.to - this.graphRange.from));
            
            var point = Math.max(y1Pixel, y2Pixel);
            var height = Math.abs(y1Pixel-y2Pixel)+1;
            
            this.canvasContext.fillRect(i, this.canvasHeight - point, 1, height);
            
            cacheY1 = y2;
            cacheY1Pixel = y2Pixel;
        }
    }
    
    //Initialization function - gets called on instantiation
    this.init = function(){
        if(canvas.nodeName.toLowerCase() != "canvas"){
            console.log(canvas.nodeName.toLowerCase());
            console.error("Invalid canvas passed to QuickPlot");
            return 1;
        }
        
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d");
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.drawAxis = true;
    }
    
    this.init(canvas);
}
