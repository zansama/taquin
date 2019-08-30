$(document).ready(function () {
    function Taquin($container, dim, size, margin) {
        let board = [[4,1,2],[9,5,3],[7,8,6]];
        startTableau = [[4,1,2],[9,5,3],[7,8,6]];
        // let board = [];
        let initialBoard = [];
        let valCaseVide = dim*dim;
        for (let i = 0; i < dim; i++) {
            // board.push([]);
            initialBoard.push([]);
            for (let j = 0; j < dim; j++) {
                if (i === dim - 1 && j === dim - 1) {
                    // board[i].push(valCaseVide);
                    initialBoard[i].push(valCaseVide);

                } else {
                    // board[i].push(dim * i + j + 1);
                    initialBoard[i].push(dim * i + j + 1);

                }
            }
        }
        drawBlocks($container, dim, size, margin, initialBoard, valCaseVide);

        $("#melanger").click(function () {
            shuffleboard(board, dim, size, margin, valCaseVide);
            let blankBoard = $container.find("div");
            blankBoard.remove();
            drawBlocks($container, dim, size, margin, board, valCaseVide);
        });

        $container.on('click', 'div', function (event) {
            let currentCase = $(event.currentTarget).text();
            currentCase = parseInt(currentCase);
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === currentCase) {
                        var line = i;
                        var column = j;
                    }
                }
            }


            if ((line < 3 && board[line + 1][column] === valCaseVide) || (line > 0 && board[line - 1][column] === valCaseVide) || (board[line][column + 1] === valCaseVide) || (board[line][column - 1] === valCaseVide)) {
                window.alert("je voudrai bien swap moi !!!!");
            }
        });

        $("#solution").click(function () {
            if (deepFirstSearch(initialBoard, board, 5, 0, valCaseVide) === true) {

                // for(let i = 0; i<solution.length; i++){
                //     swap()
                // }

                console.log('winner');
                console.log(board);
                console.log(test);
                console.log(solution);
                console.log(startTableau);

            } else {
                console.log(test);
                console.log('looser');
            }
        });
    }

    let test = 0;
    var solution = [];
    var startTableau = [];
    function deepFirstSearch(initialBoard, board, maxDepth, depth, valCaseVide, index1 = null, index2 =  null) {
        let blankPosition = getBlankPosition(board, valCaseVide);
        if (win(initialBoard, board, valCaseVide)) {
            return true;
        }
        if (depth > maxDepth) {
            let temp = board[blankPosition[0]][blankPosition[1]];
            board[blankPosition[0]][blankPosition[1]] = board[index1][index2];
            board[index1][index2] = temp;
            return false;
        }


        let moves = moveGranted(blankPosition[0], blankPosition[1], board.length-1);

        for (let i = 0; i < moves.length; i++) {
            let newBoard = swap(board, blankPosition[0], blankPosition[1], moves[i]);

            test++;
            if (deepFirstSearch(initialBoard, newBoard, maxDepth, depth + 1, valCaseVide, blankPosition[0], blankPosition[1])) {
                solution.push(moves[i]);
                return true
            }
        }
        if (index2 != null) {
            let temp = board[blankPosition[0]][blankPosition[1]];
            board[blankPosition[0]][blankPosition[1]] = board[index1][index2];
            board[index1][index2] = temp;
        }

        return false;
    }


    function getBlankPosition(board, valCaseVide) {
        for (let j = 0; j < board.length; j++) {
            for (let h = 0; h < board.length; h++) {
                if (board[j][h] === valCaseVide) {
                    return [j, h];
                }
            }
        }

    }

    function swap(board, posY, posX, move) {
        let temp = board[posY][posX];
        let moveY = move[0];
        let moveX = move[1];

        board[posY][posX] = board[moveY][moveX];
        board[moveY][moveX] = temp;

        return board;
    }

    function win(initialState, boardState, valCaseVide) {
        let arrayWin = [];
        let arrayBoardCheck = [];
        let testWin = 0;
        for (let i = 0; i < boardState.length; i++) {
            for (let j = 0; j < boardState[i].length; j++) {
                arrayWin.push(initialState[i][j]);
                arrayBoardCheck.push(boardState[i][j]);
            }
        }

        for (let i = 0; i < arrayWin.length; i++) {
            if (arrayWin[i] === arrayBoardCheck[i]) {
                testWin++
            }
        }
        if (testWin === valCaseVide) {
            return true;
        } else {
            return false;
        }
    }

    function moveGranted(i, j, dim) {

        let grandtedMove = [];

        if (i !== 0) {
            grandtedMove.push([i-1,j])
        }
        if (j !== 0 ) {
            grandtedMove.push([i,j-1])
        }
        if (i !== dim ){
            grandtedMove.push([i+1,j])
        }
        if (j !== dim){
            grandtedMove.push([i,j+1])
        }
        return grandtedMove;


    }

    function shuffleboard(board, dim, size, margin, valCaseVide) {
        // for (let i = 0; i < board.length; i++) {
        //     for (let j = 0; j < board[i].length; j++) {
        //         let i1 = Math.floor(Math.random() * (board.length));
        //         let j1 = Math.floor(Math.random() * (board.length));
        //         let temp = board[i][j];
        //         board[i][j] = board[i1][j1];
        //         board[i1][j1] = temp;
        //     }
        //
        // }



        let arrayCheck = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                arrayCheck.push(board[i][j]);

            }
        }

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === valCaseVide) {
                    var caseVideLigne = i;
                    var caseVideColonne = j;
                }
            }
        }
        let nbPermutationCaseVide = ((dim - 1) * 2) - (caseVideLigne + caseVideColonne);
        let evenOrtNot = checkNumberPermuation(arrayCheck);
        if ((nbPermutationCaseVide % 2 === 0 && evenOrtNot % 2 === 0) || (nbPermutationCaseVide % 2 !== 0 && evenOrtNot % 2 !== 0)) {
        } else {
            shuffleboard(board, dim, size, margin, valCaseVide);
            let blankBoard = $('#container-a-example').find("div");
            blankBoard.remove();
            drawBlocks($('#container-a-example'), dim, size, margin, board);
        }

        return board;
    }

    function checkNumberPermuation(arrayCheck) {
        let test = 0;
        for (let i = 0; i < arrayCheck.length; i++) {
            if (arrayCheck[i] !== i + 1) {
                for (let j = 0; j < arrayCheck.length; j++) {
                    if (arrayCheck[j] === i + 1) {
                        test++;
                        let temp = arrayCheck[i];
                        arrayCheck[i] = arrayCheck[j];
                        arrayCheck[j] = temp;

                    }
                }
            }
        }
        return test;
    }


// creation des tuiles
    function drawBlocks($container, dim, size, margin, board, valCaseVide) {
        for (let i = 0; i < dim; i++) {
            for (let j = 0; j < dim; j++) {
                let id = i * dim + j + 1;
                if (board[i][j] !== valCaseVide) {
                    $container.append("<div id='c" + id + "'>" + board[i][j] + "</div>");
                    let $e = $container.find("#c" + id);
                    $e.attr("class", "tuile");
                    $e.css("left", j * (size + margin));
                    $e.css("top", i * (size + margin));
                    $e.css("width", size + "px");
                    $e.css("height", size + "px");
                    $e.css("font-size", size * 0.7);
                } else {
                    $container.append("<div id='caseVide'></div>");
                    let $e = $container.find("#caseVide");
                    $e.attr("class", "caseVide");
                    $e.css("left", j * (size + margin));
                    $e.css("top", i * (size + margin));
                    $e.css("width", size + "px");
                    $e.css("height", size + "px");

                }
            }
            $container.css("width", (size + margin) * dim);
            $container.css("height", (size + margin) * dim);
        }

    }

    new Taquin($('#container-a-example'), 3, 120, 5);

});

