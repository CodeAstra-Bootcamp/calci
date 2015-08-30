Calci =
  init: ->
    $('#calculator .input').click ->
      if @.dataset.keyType == "digit"
        Calci.handleInput(@.dataset.digit)
      else if@.dataset.keyType == "operator"
        Calci.handleOperator(@.dataset.operator)
      else if @.dataset.keyType == "delete"
        Calci.handleDelete()
      else if @.dataset.keyType == "equals"
        Calci.evaluateResult()
    $('#calculator #delete').dblclick ->
      Calci.clearPreview()
      Calci.clearResult()
    for digit in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      $(document).bind 'keyup', digit, ->
        Calci.handleInput(digit)
    for digit in ['/', '*', '+', '-']
      $(document).bind 'keyup', digit, ->
        Calci.handleOperator(digit)
    $(document).bind 'keyup', '.', ->
      lastNumber = Calci.getLastNumber()
      if lastNumber.indexOf('.') == -1
        if lastNumber.length == 0
          Calci.handleInput(0)
        Calci.handleInput('.')
    $(document).bind 'keyup', 'backspace', ->
      Calci.handleDelete()
    $(document).bind 'keyup', 'shift+=', ->
      Calci.handleOperator('+')
    for key in ['=', 'return']
      $(document).bind 'keyup', key, ->
        Calci.evaluateResult()
  handleInput: (input) ->
    $('#preview').html($('#preview').html() + input)
  handleOperator: (operator) ->
    if $('#preview').html().length == 0
      if operator == '-'
        Calci.handleInput('-')
    else
      if Calci.checkLastCharIsOperator()
        Calci.handleDelete()
      Calci.handleInput(operator)
  handleDelete: ->
    $('#preview').html($('#preview').html().slice(0, -1))
    if $('#preview').html().length == 0
      Calci.clearResult()    
  evaluateResult: ->
    if Calci.checkLastCharIsOperator()
      Calci.handleDelete()
    $('#result').html(eval($('#preview').html()))
  clearResult: ->
    $('#result').html('')
  clearPreview: ->
    $('#preview').html('')
  getLastNumber: ->
    str = $('#preview').html()
    regexp = /[+\-*\/]([0-9.])*$/
    matches = str.match(regexp)
    if matches == null
      return str
    else
      return matches[0].slice(1)
  getLastChar: ->
    str = $('#preview').html()
    if str.length == 0
      return str
    else
      return str[str.length - 1]
  checkLastCharIsOperator: ->
    lastChar = Calci.getLastChar()
    return (['+', '-', '*', '/'].indexOf(lastChar) != -1)

$ ->
  Calci.init()
