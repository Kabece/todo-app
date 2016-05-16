function filterDigits (event) {
          var keyCode = ('which' in event) ? event.which : event.keyCode;

          isNumeric = (keyCode >= 48  && keyCode <= 57) || /* Digits */
                      (keyCode >= 96  && keyCode <= 105 ); /* Numeric keyboard */
          controlChars = (keyCode === 8  ||                // backspace
                          keyCode === 46 ||                // delete
                          keyCode >=37 && keyCode <= 40);  // arrows
          return isNumeric || controlChars;
      }
