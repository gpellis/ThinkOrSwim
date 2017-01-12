(require 'generic-x)

(define-generic-mode 'thinkscript-mode ;; name of the mode to create
  '("#")                               ;; comments start with '!!'
  '("above"
    "ago"
    "and"
    "bar"
    "bars"
    "below"
    "between"
    "case"
    "crosses"
    "declare"
    "def"
    "default"
    "do"
    "else"
    "equal"
    "equals"
    "false"
    "fold"
    "from"
    "greater"
    "if"
    "input"
    "is"
    "less"
    "no"
    "not"
    "or"
    "plot"
    "profile"
    "rec"
    "reference"
    "script"
    "switch"
    "than"
    "then"
    "to"
    "true"
    "while"
    "with"
    "within"
    "yes")                      ;; some keywords
  '(("=" . 'font-lock-operator) ;; '=' is an operator
    (";" . 'font-lock-builtin)) ;; ';' is a built-in 
  '(".thinkscript\\'")           ;; files for which to activate this mode 
  nil                    ;; other functions to call
  "A mode for thinkscript files" ;; doc string for this mode
  )
