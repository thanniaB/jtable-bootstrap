(function () {
    'use strict';

    Array.prototype.each = function (callback) {
        var index;
        for (index = 0; index < this.length; index += 1) {
            callback.call(this, this[index], index);
        }
        return this;
    };

    Array.prototype.where = function(spec){
    	var index, results = [];
    	for (index = 0; index < this.length; index += 1) {
            if(spec(this[index])){
            	results.push(this[index]);
            }
        }
    	return results;
    };

    Array.prototype.any = function(spec){
    	var index, result;
    	function isFunctionA(object) {
 			return object && getClass.call(object) == '[object Function]';
		}
        for (index = 0; index < this.length; index += 1) {
        	if (typeof spec == 'function') {
            	if(spec(this[index])){//if spec is a function
            		result = true;
            	}
            } else {
            	if(this[index] == spec){ //if spec is not a function
            		result = true;
            	}
            }
        }
        return result;
    };

    Array.prototype.select = function(spec){
    	var index, results = [];
    	for (index = 0; index < this.length; index += 1) {
            	results.push(spec(this[index]));
        }
    	return results;
    };

    Array.prototype.take = function(howMany, spec){
    	var index, results = [];
    	if(howMany > this.length){
    		howMany = this.length;
    	}
    	if(arguments.length === 1){//if only howMany was specified
    		for (index = 0; index < howMany; index += 1) {
            	results.push(this[index]);
        	}
    	} else {//if we have a spec function
    		for (index = 0; index < howMany; index += 1) {
            	results.push(spec(this[index]));
        	}
    	}
    	return results;
    };

    Array.prototype.skip = function(howMany){
    	var index, results = [];
    	for(index = 0; index < (this.length - howMany); index++){
    		results.push(this[index+howMany]);
    	}
    	return results;
    };
    Array.prototype.first = function(spec){
    	var index;
    	if(arguments.length === 0){ //if there is no specification
    		return this[0];
    	} else {
    		for(index=0; index < this.length; index++){//with specification
    			if(spec(this[index])){
    				return this[index];
    			}
    		}
    	}
    }
    Array.prototype.last = function(spec){
    	var index;
    	if(arguments.length === 0){ //if there is no specification
    		return this[this.length -1];
    	} else {
    		for(index=this.length -1; index > -1; index--){//with specification
    			if(spec(this[index])){
    				return this[index];
    			}
    		}
    	}
    }
    Array.prototype.count = function(spec){
    	var index, result = 0;
    	if(arguments.length === 0){ //if there is no specification
    		return this.length;
    	} else {
    		for(index=0; index < this.length; index++){//with specification
    			if(spec(this[index])){
    				result++;
    			}
    		}
    		return result;
    	}
    }
    Array.prototype.index = function(spec){
    	var index, result = -1;
    	for(index=0; index<this.length; index++){
    		if (typeof spec == 'function') {//if spec is a function
    			if(spec(this[index])){
    				result = index;
    			}
    		} else {//if its an object
    			if(this[index] === spec){
    				result = index;
    			}
    		}
     	}
     	return result;
    }
    Array.prototype.pluck = function(property){
    	var index, results = [];
    	for(index=0; index<this.length; index++){
    		results.push(this[index][property]);
    	}
    	return results;
    }
    Array.prototype.sum = function(spec){
    	var index, accum = 0, result = 0;
    	if(arguments.length === 0){ //without spec
    		for(index = 0; index < this.length; index++){
    			accum = accum + this[index];
    		}
    	} else { //with spec
    		for(index = 0; index < this.length; index++){
    			accum = accum + spec(this[index]);
    		}	

    	}
    	result = accum;
    	return result;
    };
    Array.prototype.max = function(comparer){
    	var index, result, max;
    	if(this == ""){
    		return null;
    	} else if(arguments.length === 0){//no comparer
    		max = this[0];
    		for(index = 1; index < this.length; index++){
    			if(this[index] > max){
    				max = this[index];
    			}
    		}
    	result = max;
    	return result;

    	}else{//with comparer
    		max = this[0];
    		for(index = 1; index < this.length; index++){
    			if(comparer(this[index],max) < 0){
    				max = max;
    			} else if (comparer (this[index], max) > 0){
    				max = this[index];
    			} else if (comparer(this[index], max === 0)){
    				//both are the same lenght;
    			}
    		}
    		result = max;
    		return result;
    	}

    };
    Array.prototype.min = function(comparer){
    	var index, min;
    	if(this == ""){
    		return null;
    	}else if(arguments.length === 0){//no comparer
    		min = this[0];
    		for(index = 1; index < this.length; index++){
    			if(this[index] < min){
    				min = this[index];
    			}
    		}
    	return min;
    	}else{//with comparer
    		min = this[0];
    		for(index = 1; index < this.length; index++){
    			if(comparer(this[index],min) > 0){
    				min = min;
    			} else if (comparer (this[index], min) < 0){
    				min = this[index];
    			} else if (comparer(this[index], min === 0)){
    				//both are the same lenght;
    			}
    		}
    		return min;

    	}
    };
    Array.prototype.flatten = function(){
    	var results = [], index, subIndex, subArray = [];
    	//console.log(this);
    	for(index = 0; index < this.length; index++){
    		if(this[index] instanceof Array){//checks if element is array

    			subArray = this[index].flatten();
    			for(subIndex = 0; subIndex < subArray.length; subIndex ++){
    				results.push(subArray[subIndex]);
    			}
    			
    		} else {//if its not it just pushes it
    			results.push(this[index]);
    		}
    	} 
    	//console.log(results);
    	return results;

    };

}());

