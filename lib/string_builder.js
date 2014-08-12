
// Example returning an object
var StringBuilder = function () {
	var string = '', 
		buffer = [],
		prefix = '',
		suffix = '',
		decorators = [],
		suspend = false;

	function isFunction(arg) {
		return typeof arg === 'function'
	}

	function isArray(arg) {
		return arg instanceof Array;
	}

	function isNotString(arg) {
		return typeof arg != 'string';
	}

	/*function searchArray(array, lengthOfSearch, stuffToDo){ //no la use porque no sirvio y me confundi
		for(var i = 0; i < lengthOfSearch; i++){
			stuffToDo(array[i]);
		}
	}*/

	return {
		cat: function () {
			for(var i=0; i < arguments.length; i++) {
				var currentArgument = arguments[i];
				

				if (isFunction(currentArgument)){
					if(!suspend){						
						currentArgument = currentArgument();
						if(prefix){
							currentArgument = prefix + currentArgument;
						} 
						if(suffix){
							currentArgument = currentArgument + suffix;
						}
						buffer.push(currentArgument);
					} else {
						buffer.push(currentArgument());
					}
				} else if (isArray(currentArgument)){
					var subArray = currentArgument;
					if(!suspend){
						if(prefix){
							subArray.unshift(prefix);
						}
						if(suffix){
							subArray.push(suffix);
						}
						for(var j=0; j<subArray.length; j++){
							buffer.push(subArray[j]);
						}
					} else {
						for(var j=0; j<subArray.length; j++){
							buffer.push(subArray[j]);
						}
					}
				} else if (isNotString(currentArgument)){
					currentArgument.toString();
					if(!suspend){
						if(prefix){
							currentArgument = prefix + currentArgument;
						} 
						if(suffix){
							currentArgument = currentArgument + suffix;
						}
						buffer.push(currentArgument);
					} else {
						buffer.push(currentArgument);
					
					}
				} else {
					if(!suspend){
						if(prefix){
							currentArgument = prefix + currentArgument;
						} 
						if(suffix){
							currentArgument = currentArgument + suffix;
						}
						buffer.push(currentArgument);
					} else {
						buffer.push(currentArgument);
					}
				}
			}
			return this;
		},

		string: function () {
			return buffer.join('');
		},

		rep: function () {//the last argument must be the howManyTimes argument
			var lastArgument = arguments.length - 1,
				howManyTimes = arguments[lastArgument];

			for(var arg = 0; arg < lastArgument; arg++){
				for(var times = 0; times < howManyTimes; times++){
					this.cat(arguments[arg]);
				}
			}
			return this;

		},

		catIf: function () {
			var lastArgument = arguments.length - 1,
				condition = arguments[lastArgument];
				if(condition){
					for(var arg = 0; arg < lastArgument; arg++){
						this.cat(arguments[arg]);
					}
				}
				return this;
		},

		wrap: function (pref, suff){
			if(pref){
				if(pref instanceof Array){
					for(var i=0; i<pref.length; i++){
						if(pref[i] instanceof Array){
							pref[i].join("");
						} else if(typeof pref[i] === "function"){						
							pref[i] = pref[i]();
						}
					}
					pref = pref.join('');
				} else if(typeof pref === "function") {
					pref();
				} else if(typeof pref != "string"){
					pref.toString();
				}
			}
			if(suff){
				if(suff instanceof Array){
					suff = suff.join("");
				} else if(typeof suff === "function") {
					//keep it that way
				} else if(typeof suff != "string"){
					suff.toString();
				}
			}
			prefix = prefix + pref; //prefix = prefix + pref if I wanted to be able to stack prefixes
			suffix = suffix + suff; //but to keep the "end" function simple I'm not doing it for now
			if(pref && suff){
				decorators.push("wrap");
			}
			return this;
		}, 

		end: function(deep){
			var decLenght = decorators.length;
			var lastDecorator = decLenght - 1;
			if(deep > decLenght){
				console.log("you haven't added those much decorators");				
			}
			if(arguments.length === 0){
				if(decorators[lastDecorator] === "wrap"){
					prefix = "";
					suffix = "";
				} else if(decorators[lastDecorator] === "prefix"){
					prefix = "";
				} if(decorators[lastDecorator] === "suffix"){
					suffix = "";
				} else if(decorators[decLenght - i] === "suffix"){
					suspend = false;
				}
			} else {
				for(var i=0; i < deep; i++){
					if(decorators[decLenght - i] === "wrap"){
						prefix = "";
						suffix = "";
					} else if(decorators[decLenght - i] === "prefix"){
						prefix = "";
					} else if(decorators[decLenght - i] === "suffix"){
						suffix = "";
					} else if(decorators[decLenght - i] === "suffix"){
						suspend = false;
					}
				}
			}
			//puro pedo no se como hacerlo
			return this;
		},

		prefix: function(pref){
			this.wrap(pref, "");
			decorators.push("prefix");
			return this;
		},

		suffix: function(suff){	
			this.wrap("", suff);
			decorators.push("suffix");
			return this;
		},

		each: function(args, callback){
			args.forEach(
					function(arg){
						callback(arg);
					}
				);
			return this;
		},
		suspend: function(){
			suspend = true;
			decorators.push("suspend");
			return this;
		},
		when: function(expression, thenArgs, otherwiseArgs){
			if(expression){
				this.cat(thenArgs);
			} else {
				this.cat(otherwiseArgs);
			}
			return this;
		}

	}
}