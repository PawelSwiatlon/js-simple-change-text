'use strict';

let Behemot = {

    $body: $('body'),
    $document: $('document'),


    init: function() {
        this.simpleChangeTextAnimation();
    },

    simpleChangeTextAnimation: function() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

        Behemot.$body.find('[data-run]').on('click', function(){
            const $elements = Behemot.$body.find('[data-text-lang-pl]');
            $elements.each(function(){
                const $this = $(this);
                // const originalText = $(this).text();
                const originalText = $(this).data('text-lang-en');
                const lengthCharacters = originalText.length;
                let arrayText = prepareArray(lengthCharacters);
                changeArrayText($this, originalText, arrayText);
            });
        });


        function prepareArray(length){
            let arrayText = [];

            for(let i = 0; i < length; i++) {
                arrayText.push({
                    is_original: false,
                    character: characters.charAt(Math.floor(Math.random() * characters.length)),
                });
            }

            return arrayText;
        }

        function changeArrayText($element, originalText, arrayText){
            const lengthCharacters = originalText.length;
            let randomPosition = Math.floor(Math.random() * lengthCharacters);
            if(arrayText.length > randomPosition && arrayText[randomPosition].is_original) {
                let isSomeFalse = false;

                arrayText.forEach((element, key) => {
                    if(!element.is_original) {
                        isSomeFalse = true;
                    };
                })

                if(isSomeFalse) {
                    return changeArrayText($element, originalText, arrayText);
                } else {
                    return;
                }
            }
            
            arrayText.forEach((element, key) => {
                if(randomPosition == key) {
                    arrayText[key] = {
                        is_original: true,
                        character: originalText.substr(key, 1),
                    };
                } else {
                    if(!arrayText[key].is_original) {
                        arrayText[key] = {
                            is_original: false,
                            character: characters.charAt(Math.floor(Math.random() * characters.length)),
                        };
                    }
                }
            });


            let isSomeFalse = false;
            let text = '';
            arrayText.forEach((element, key) => {
                text += element.character;
                if(!element.is_original) {
                    isSomeFalse = true;
                };
            })
            $element.html(text)
            if(isSomeFalse) {
                setTimeout(function(){
                    changeArrayText($element, originalText, arrayText);
                }, 100);
            }
            return;
        }
    }
}

$(document).ready(function (){
    Behemot.init();
});
