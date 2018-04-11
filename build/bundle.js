/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar cells = document.getElementsByClassName(\"cell\");\nvar human = '0';\nvar ai = 'X';\nvar table = [];\nvar winningcombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];\n\nfunction intializeTableValues() {\n    for (var i = 1; i <= 9; i++) {\n        table[i] = -1;\n    }\n}\n\ndocument.getElementById(\"replay\").addEventListener(\"click\", prepareBoard);\n\nfunction prepareBoard() {\n    clear();\n    intializeTableValues();\n    for (var i = 0; i < cells.length; i++) {\n        cells[i].addEventListener('click', playerTurn);\n    }\n}\n\nfunction clear() {\n    for (var i = 0; i < cells.length; i++) {\n        cells[i].innerHTML = \"\";\n        cells[i].style.backgroundColor = \"\";\n    }\n}\n\nfunction playerTurn(cell) {\n    if (table[cell.target.id] === -1) {\n        fill(cell.target.id, human);\n        if (!checkWin(table, human) && !checkTie()) {\n            //console.log(\"Hello\" + \" \" + bestSpot());\n            fill(bestSpot(), ai);\n        }\n    }\n}\n\nfunction fill(cellId, player) {\n    table[cellId] = player;\n    document.getElementById(cellId).innerHTML = player;\n    var playerwon = checkWin(table, player);\n    if (playerwon != null) gameover(playerwon);\n}\n\nfunction checkWin(table, player) {\n    var currentStatus = table.reduce(function (a, e, i) {\n        return e == player ? a.concat(i) : a;\n    }, []);\n    var won = null;\n    //console.log(currentStatus);\n    var iterator = winningcombinations.entries();\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n        for (var _iterator = iterator[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n            var _step$value = _slicedToArray(_step.value, 2),\n                index = _step$value[0],\n                win = _step$value[1];\n\n            //console.log(index + \" \" +  win);\n            var t = [];\n            if (win.every(function (elem) {\n                return currentStatus.indexOf(elem) > -1;\n            })) {\n                won = { index: index, player: player };\n                break;\n            }\n        }\n    } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n    } finally {\n        try {\n            if (!_iteratorNormalCompletion && _iterator.return) {\n                _iterator.return();\n            }\n        } finally {\n            if (_didIteratorError) {\n                throw _iteratorError;\n            }\n        }\n    }\n\n    return won;\n}\n\nfunction gameover(playerwon) {\n    //let winnigcombination = \n    //let winningCombination = ;\n\n    var _iteratorNormalCompletion2 = true;\n    var _didIteratorError2 = false;\n    var _iteratorError2 = undefined;\n\n    try {\n        for (var _iterator2 = winningcombinations[playerwon.index][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n            var id = _step2.value;\n\n            document.getElementById(id).style.backgroundColor = playerwon.player == human ? \"blue\" : \"red\";\n        }\n    } catch (err) {\n        _didIteratorError2 = true;\n        _iteratorError2 = err;\n    } finally {\n        try {\n            if (!_iteratorNormalCompletion2 && _iterator2.return) {\n                _iterator2.return();\n            }\n        } finally {\n            if (_didIteratorError2) {\n                throw _iteratorError2;\n            }\n        }\n    }\n\n    for (var i = 0; i < cells.length; i++) {\n        cells[i].removeEventListener('click', playerTurn);\n    }\n\n    if (playerwon.player === '0') {\n        declare(\"You Win!\");\n    } else {\n        declare(\"You Lose!\");\n    }\n}\n\nfunction checkTie() {\n    //console.log(emptyTableRows().length);\n    if (emptyTableRows().length == 0) {\n        declare(\"Tie Game\");\n        return true;\n    }\n    return false;\n}\n\nfunction emptyTableRows() {\n    //console.log(table.filter(s => s == -1));\n    var emptyTableRows = [];\n    for (var i = 1; i <= 9; i++) {\n        if (table[i] == -1) {\n            emptyTableRows.push(i);\n        }\n    }\n    return emptyTableRows;\n}\n\nfunction declare(result) {\n    alert(result);\n}\n\nfunction bestSpot() {\n    console.log(\"Hello\" + \" \" + minimax(table, ai).index);\n    return minimax(table, ai).index;\n    //return emptyTableRows()[0];\n}\n\nfunction minimax(table, player) {\n    var availableSquares = emptyTableRows();\n\n    if (checkWin(table, human) != null) {\n        return { score: -10 };\n    } else if (checkWin(table, ai) != null) {\n        return { score: 10 };\n    } else if (availableSquares.length == 0) {\n        return { score: 0 };\n    }\n\n    var moves = [];\n\n    for (var i = 0; i < availableSquares.length; i++) {\n        var move = {};\n\n        move.index = availableSquares[i];\n        table[availableSquares[i]] = player;\n\n        if (player == ai) {\n            var result = minimax(table, human);\n            move.score = result.score;\n        } else {\n            var result = minimax(table, ai);\n            move.score = result.score;\n        }\n        table[availableSquares[i]] = -1;\n        moves.push(move);\n    }\n\n    var bestMove;\n\n    if (player == ai) {\n        var bestScore = -100000;\n        for (var i = 0; i < moves.length; i++) {\n            if (moves[i].score > bestScore) {\n                bestScore = moves[i].score;\n                bestMove = i;\n            }\n        }\n    } else {\n        var bestScore = 100000;\n        for (var i = 0; i < moves.length; i++) {\n            if (moves[i].score < bestScore) {\n                bestScore = moves[i].score;\n                bestMove = i;\n            }\n        }\n    }\n    //console.log(bestMove);\n    console.log(moves[bestMove].index);\n    return moves[bestMove];\n}\n\nprepareBoard();\nfill(bestSpot(), ai);\n\n//# sourceURL=webpack:///./app/index.js?");

/***/ })

/******/ });