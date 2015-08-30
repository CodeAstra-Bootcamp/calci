function handleInput(input) {
  $('#preview').html($('#preview').html() + input);
}

function handleDelete() {
  $('#preview').html($('#preview').html().slice(0, -1));
}

function evaluateResult() {
  $('#result').html(eval($('#preview').html()));  
}

$(document).ready(function() {
  $('#calculator .input').click(function(){
    var input;
    if(this.dataset.keyType == "digit") {
      handleInput(this.dataset.digit);
    } else if (this.dataset.keyType == "operator") {
      handleInput(this.dataset.operator);
    } else if (this.dataset.keyType == "delete") {
      handleDelete();
    } else if (this.dataset.keyType == "equals") {
      evaluateResult();
    }
  });

  $('#calculator #delete').dblclick(function() {
    $('#preview').html('');
    $('#result').html('');
  });

  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach(function(digit) {
    $(document).bind('keyup', digit, function() {
      handleInput(digit);
    });
  });
});