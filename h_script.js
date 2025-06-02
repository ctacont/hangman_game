 angular.module('hangmanApp', [])
            .controller('HangmanController', ['$document', '$scope', function ($document, $scope) {
                const vm = this;
                vm.wordList = [
                  "COMPUTER", "PROGRAMMIERUNG", "ALGORITHMUS",
                  "DATENBANK", "BENUTZER", "ENTWICKLUNG",
                  "SCHNITTSTELLE", "NETZWERK", "VERSCHLUESSELUNG",
                  "BIBLIOTHEK", "FRAMEWORK", "ANWENDUNG",
                  "PROZESSOR", "SPEICHER", "BETRIEBSSYSTEM",
                  "KOMPILIERER", "VARIABLE", "FUNKTION",
                  "OBJEKT", "INSTANZ", "DATENSCHUTZERKLÄRUNG", "INFORMATIONSDESIGN", "BILDVERARBEITUNG",
                  "BENUTZEROBERFLÄCHE", "CONTENTMANAGEMENT", "DATENVISUALISIERUNG", "FOTOMONTAGE",
                  "KOMMUNIKATIONSDESIGN", "PROGRAMMIERSPRACHE", "AUFLÖSUNGSVERLUST", "BILDNACHBEARBEITUNG",
                  "FARBKORREKTUR", "LAYOUTGESTALTUNG", "MULTIMEDIASYSTEM", "OBJEKTORIENTIERUNG", "SCHRIFTGESTALTUNG",
                  "SICHERHEITSCONZEPT", "SOFTWAREENTWICKLUNG", "TYPOGRAFIEGESTALTUNG", "VIRTUALISIERUNG"
                ];
                vm.init = () => {
                    vm.originalWord = vm.wordList[
                        Math.floor(Math.random() * vm.wordList.length)
                    ].toUpperCase();
                    vm.wordLetters = vm.originalWord.split('').map(c => ({
                        char: c,
                        guessed: false
                    }));
                    vm.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
                    vm.guessedLetters = [];
                    vm.errors = 0;
                    vm.gameOver = false;
                    vm.win = false;
                };
                vm.guessLetter = function (letter) {
                    if (vm.gameOver) return;
                    vm.guessedLetters.push(letter);
                    let correct = false;
                    vm.wordLetters.forEach(l => {
                        if (l.char === letter) {
                            l.guessed = true;
                            correct = true;
                        }
                    });
                    if (!correct) {
                        vm.errors++;
                        if (vm.errors >= 10) {
                            vm.gameOver = true;
                        }
                    } else {
                        vm.win = vm.wordLetters.every(l => l.guessed);
                        vm.gameOver = vm.win;
                    }
                };
                vm.init();
                $document.on('keydown', function (event) {
                    var key = event.key.toUpperCase();
                    if (vm.alphabet.includes(key) &&
                        !vm.guessedLetters.includes(key) &&
                        !vm.gameOver) {
                        $scope.$apply(function () {
                            vm.guessLetter(key);
                        });
                    }
                });
            }]);
