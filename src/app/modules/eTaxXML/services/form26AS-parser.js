var parseForm26AS={};

parseForm26AS.extractInfoPartWise =function(lines,delimiter) { 
            var headerFound = false;        
            var lineData;         
            var parts=[];
            parts.cumulatives=[];
            parts.personalInfo=[];
            var columnData = {};
            var columns=[];
            var noOfLines = lines.length;
            var blankLineCounter;
            var lineCountForNextSection = 2;
            var header;
            var partNumber=0;
            for (var i = 2; i < noOfLines; i++) {
                
                lineData = lines[i];
                if (lineData.length == 0)
                    blankLineCounter++;
                //get personal information columns
                if(isNaN(lineData.charAt(0)) &&isNaN(lineData.charAt(1)) && lineData.substring(0,4)=="File") {
                        var arr = extractLineData(lineData,delimiter);
                        columnData.partName= "Personal Information";
                        columnData.partNumber=partNumber;	
                        columns=[];
                        for(var k=0;k<arr.length;k++)
                            columns.push(arr[k]);			
                        columnData.columns = columns;					
                        parts.push(columnData);
                        columnData={};
                        blankLineCounter=1;
                }
                //get personal information 
                var date=new Date(lineData.substring(6,10),1,1);
                if(!isNaN(date.getTime()) && date.getTime()>0 ) {
                    var arr = extractLineData(lineData,delimiter);    
                    var personalInfo={};
                    var personalInfoArray=[];
                    for(var n=0;n<columns.length;n++){
                        personalInfoArray.push(arr[n]);
                    }        
                    personalInfo.personalInfoArray=personalInfoArray;   
                    personalInfo.partNumber=partNumber;       
                    parts.personalInfo.push(personalInfo);                   
                }
                if (lineData.charAt(0) == delimiter && lineCountForNextSection == blankLineCounter) {
                    blankLineCounter = 0;
                    headerFound = true;
                }
                if (headerFound && (blankLineCounter == 0 || blankLineCounter == 1)) {
                    blankLineCounter = 0;
                    if (isNaN(lineData.charAt(1)) && lineData.charAt(0) == delimiter && lineData.substring(1,5)=="PART") {
                        header = extractLineData(lineData,delimiter)[0];
                        partNumber++;
                    }
                    //get the columns 
                    if (((isNaN(lineData.charAt(0)) && isNaN(lineData.charAt(1))) && lineData.charAt(0) != delimiter)
                        || (lineData.charAt(0) != delimiter && lineData.substring(0,6)=="Sr. No.")) {
                        var arr = extractLineData(lineData,delimiter);
                        columnData.partName= header;
                        columnData.partNumber=partNumber;	
                        columns=[];
                        for(var k=0;k<arr.length;k++)
                            columns.push(arr[k]);			
                        columnData.columns = columns;					
                        parts.push(columnData);
                        columnData={};
                    }
                    
                    //get company cumulative sum
                    if (!isNaN(lineData.charAt(0)) && lineData.charAt(1) == delimiter) {
                        var arr = extractLineData(lineData,delimiter);    
                        var cumulative =[];		
                        for(var l=0;l<columns.length;l++){
                            cumulative.push(arr[l]);
                        }                    
                        cumulative.partNumber=partNumber;
                        cumulative.monthWiseArray=[];				 
                        parts.cumulatives.push(cumulative);
                    }
                    //get data month wise
                    else if (lineData.charAt(0) == delimiter  && !isNaN(lineData.charAt(1))) {
                        var arr = extractLineData(lineData,delimiter);
                        var monthWise =[];
                        for(var m=0;m<arr.length;m++){
                            monthWise.push(arr[m]);
                        }                     
                        var len = parts.cumulatives.length;					 
                        if(len>0) {						
                            parts.cumulatives[len-1].monthWiseArray.push(monthWise);
                        }
                        else { 													
                            parts.cumulatives[len].monthWiseArray.push(monthWise);
                        }                  
                    }
                }
            }
            console.log(parts);     
            return parts;
        };
        var extractLineData = function(data,delimiter) {
            var fIndex=-1,nIndex=-1;
            
            var dataArray=[];
            var occurances=findOccurances(delimiter,data);
            for(var i=0;i<occurances;i++) {
                 
                fIndex=data.indexOf(delimiter,fIndex);	
                fIndex=fIndex+1;				 
                nIndex=fIndex + data.substring(fIndex).indexOf(delimiter);				
                if(data.substring(fIndex).indexOf(delimiter)==-1)
                    dataArray.push(data.substring(fIndex));
                else 
                    dataArray.push(data.substring(fIndex,nIndex));			 
                fIndex=nIndex;
            }	 
            return dataArray;
        };
       var findOccurances = function (searchString, sourceString){
            var count=0; var pos=0;
            pos=sourceString.indexOf(searchString);
            while(pos>-1) {
                ++count;
                pos=sourceString.indexOf(searchString,++pos);
            }
            return count;
        }    
   