describe('StringBuilder', function () {
	var sb;

	describe('#cat', function () {

		beforeEach(function () {
			sb = new StringBuilder();
		});

		it('add one string', function () {
			sb.cat('Hello');
			expect(sb.string()).toBe('Hello');
		});

		it('add more than on strings in one call', function () {
			sb.cat('Hello', ' World');
			expect(sb.string()).toBe('Hello World');
		});

		it('adde more than on strings in diferrents call', function () {
			sb.cat('Hello');
			sb.cat(' Javascript', ' crazy', ' world').cat('!!!');
			expect(sb.string()).toBe('Hello Javascript crazy world!!!');
		});

		it('with a string and functions given', function () {
			sb.cat('Hello');
			sb.cat(function () { return ' world'; });
			expect(sb.string()).toBe('Hello world');
		});

		it('with string an array given', function () {
			sb.cat('Hello');
			sb.cat([' Javascript', ' crazy', ' world']);
			expect(sb.string()).toBe('Hello Javascript crazy world');
		});

		it('with string an array and a function given', function () {
			sb.cat('Hello')
				.cat([' Javascript', ' crazy', ' world'])
				.cat(function () { return '!!!'; });
			expect(sb.string()).toBe('Hello Javascript crazy world!!!');
		});

	});

	describe('#rep', function () {

		it("repeat 3 times the world ' please'", function () {
			sb = new StringBuilder();
			sb.cat('Mom, can you').rep(' please', 3).cat(' buy me an ice cream');
			expect(sb.string()).toBe('Mom, can you please please please buy me an ice cream');
		});

	});

	describe('#catIf', function () {

		it('with a valid constraint', function () {
			sb = new StringBuilder();
			var sex = 'f';
			sb.cat('Hello')
				.catIf(' pretty', ' lady', sex === 'f');
			expect(sb.string()).toBe('Hello pretty lady');
		});
		
	});

  describe('#wrap', function () {

    beforeEach(function () {
      sb = new StringBuilder();
    });

    /*it('', function () {
      sb.cat('<ul>', '\n')
      .wrap('<li>', ['<li/>', '\n'])
      .rep('list item', 5)
      .cat('</ ul>');
      expect(sb.string()).toBe('<ul><li>1.- list item</li><li>2.- list item</li><li>3.- list item</li><li>4.- list item</li><li>5.- list item</li></ul>')
      });*/ //sospecho que esta prueba esta mal porque espera el mismo resultado que la de abajo pero en ningun momento te manda las otras funciones


    it('with suffix and prefix added', function () {
      var sb = new StringBuilder();

      sb.suffix('\n')
      .cat('<ul>')
      .wrap(['<li>', function(){ var count = 0;
            return function() { return count += 1; }}(), '.- '], '</li>')
            .rep('list item', 5)
            .end()
            .cat('</ul>');
            expect(sb.string()).toBe('<ul><li>1.- list item</li><li>2.- list item</li><li>3.- list item</li><li>4.- list item</li><li>5.- list item</li></ul>');
    });

  });
  
  describe('#prefix', function () {

    it('add a new prefix', function() {
      var sb = new StringBuilder();
      sb.cat('Hello')
        .prefix(' -')
        .cat('World')
        .cat('Friends');
      expect(sb.string()).toBe('Hello -World -Friends');
    });

  });

  describe('#suffix', function () {

    it('add a suffix', function() {
      var sb = new StringBuilder();
      sb.cat('Hello')
        .suffix(".")
        .cat(" World")
        .cat(" Friends");
      expect(sb.string()).toBe("Hello World. Friends.");
    });

  });

  describe('#end', function() {
    var sb;

    beforeEach(function () {
      sb = new StringBuilder();
    });

    describe("without number of deep end", function () {

      it('cancel the current last decorator', function() {
        sb.cat('Hello')
          .suffix('.')
          .cat(" World")
          .cat(" Friends")
          .end()
          .cat(" Fin");
        expect(sb.string()).toBe("Hello World. Friends. Fin");
      });

    });

  });

  describe('#suspend', function() {

    it('does not print the last decorator', function() {
      var sb = new StringBuilder();
      sb.cat('Hello')
        .suffix('.')
        .cat(" World")
        .cat(" Friends")
        .suspend()
        .cat(" Fin");
      expect(sb.string()).toBe("Hello World. Friends. Fin");
    });

  });

  describe('#each', function() {
    
  });

  describe('#when', function() {
    
  });

  describe('#string', function () {

    beforeEach(function (){
      sb = new StringBuilder();
    });

    describe('whitout string given', function () {

      it('returns an empty string', function () {
        expect(sb.string()).toBe('');
      });

    });

    describe('with elements saved before', function () {

      it('return the concated string', function () {
        sb.cat('Hello');
        expect(sb.string()).toBe('Hello');
      });

    });
  });

});
