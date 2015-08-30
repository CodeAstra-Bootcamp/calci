(function() {
  var Calci;

  Calci = {
    init: function() {
      var digit, i, j, k, key, len, len1, len2, ref, ref1, ref2, results;
      $('#calculator .input').click(function() {
        if (this.dataset.keyType === "digit") {
          return Calci.handleInput(this.dataset.digit);
        } else if (this.dataset.keyType === "operator") {
          return Calci.handleOperator(this.dataset.operator);
        } else if (this.dataset.keyType === "delete") {
          return Calci.handleDelete();
        } else if (this.dataset.keyType === "equals") {
          return Calci.evaluateResult();
        }
      });
      $('#calculator #delete').dblclick(function() {
        Calci.clearPreview();
        return Calci.clearResult();
      });
      ref = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      for (i = 0, len = ref.length; i < len; i++) {
        digit = ref[i];
        $(document).bind('keyup', digit, function() {
          return Calci.handleInput(digit);
        });
      }
      ref1 = ['/', '*', '+', '-'];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        digit = ref1[j];
        $(document).bind('keyup', digit, function() {
          return Calci.handleOperator(digit);
        });
      }
      $(document).bind('keyup', '.', function() {
        var lastNumber;
        lastNumber = Calci.getLastNumber();
        if (lastNumber.indexOf('.') === -1) {
          if (lastNumber.length === 0) {
            Calci.handleInput(0);
          }
          return Calci.handleInput('.');
        }
      });
      $(document).bind('keyup', 'backspace', function() {
        return Calci.handleDelete();
      });
      $(document).bind('keyup', 'shift+=', function() {
        return Calci.handleOperator('+');
      });
      ref2 = ['=', 'return'];
      results = [];
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        key = ref2[k];
        results.push($(document).bind('keyup', key, function() {
          return Calci.evaluateResult();
        }));
      }
      return results;
    },
    handleInput: function(input) {
      return $('#preview').html($('#preview').html() + input);
    },
    handleOperator: function(operator) {
      if ($('#preview').html().length === 0) {
        if (operator === '-') {
          return Calci.handleInput('-');
        }
      } else {
        if (Calci.checkLastCharIsOperator()) {
          Calci.handleDelete();
        }
        return Calci.handleInput(operator);
      }
    },
    handleDelete: function() {
      $('#preview').html($('#preview').html().slice(0, -1));
      if ($('#preview').html().length === 0) {
        return Calci.clearResult();
      }
    },
    evaluateResult: function() {
      if (Calci.checkLastCharIsOperator()) {
        Calci.handleDelete();
      }
      return $('#result').html(eval($('#preview').html()));
    },
    clearResult: function() {
      return $('#result').html('');
    },
    clearPreview: function() {
      return $('#preview').html('');
    },
    getLastNumber: function() {
      var matches, regexp, str;
      str = $('#preview').html();
      regexp = /[+\-*\/]([0-9.])*$/;
      matches = str.match(regexp);
      if (matches === null) {
        return str;
      } else {
        return matches[0].slice(1);
      }
    },
    getLastChar: function() {
      var str;
      str = $('#preview').html();
      if (str.length === 0) {
        return str;
      } else {
        return str[str.length - 1];
      }
    },
    checkLastCharIsOperator: function() {
      var lastChar;
      lastChar = Calci.getLastChar();
      return ['+', '-', '*', '/'].indexOf(lastChar) !== -1;
    }
  };

  $(function() {
    return Calci.init();
  });

}).call(this);
