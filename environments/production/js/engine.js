!function e(t,r,o){function n(s,c){if(!r[s]){if(!t[s]){var u="function"==typeof require&&require;if(!c&&u)return u(s,!0);if(i)return i(s,!0);throw new Error("Cannot find module '"+s+"'")}var h=r[s]={exports:{}};t[s][0].call(h.exports,function(e){var r=t[s][1][e];return n(r?r:e)},h,h.exports,e,t,r,o)}return r[s].exports}for(var i="function"==typeof require&&require,s=0;s<o.length;s++)n(o[s]);return n}({1:[function(e,t,r){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e}Object.defineProperty(r,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),s=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?5:arguments[0],r=arguments.length<=1||void 0===arguments[1]?5:arguments[1],n=arguments.length<=2||void 0===arguments[2]?8:arguments[2];o(this,e),this.width=t,this.height=r,this.gridCount=t*r,this.sectorCount=n,this.activeSectors=[],this.sectorIDs=[],this.grid=[]}return i(e,[{key:"generate",value:function(){this.createGrid(),this.playZone()}},{key:"createGrid",value:function(){for(var e=[],t=0;t<this.height;t++){for(var r=[],o=0;o<this.width;o++)r.push({name:"column_"+o,number:this.width*t+(o+1)});e.push({name:"row_"+t,columns:r})}return this.grid=e,e}},{key:"playZone",value:function(){var e=n(1,this.gridCount),t=this.getPosition(e);this.addSector(1,e,t),this.grid[t.rowIndex].columns[t.colIndex].start=!0;for(var r=0;r<this.sectorCount-1;r++){var o=this.activeSectors[r],i=this.getAdjacentSector(o.sectorNumber);this.addSector(r+2,i.sectorNumber,i.sectorPos)}}},{key:"addSector",value:function(e,t,r){this.activeSectors.push({index:e,sectorNumber:t,sectorPos:r}),this.sectorIDs.push(t),this.grid[r.rowIndex].columns[r.colIndex].playable=!0}},{key:"getPosition",value:function(e){var t=Math.ceil(e/this.width)-1,r=Number;return this.grid[t].columns.forEach(function(t,o){t.number==e&&(r=o)}),{rowIndex:t,colIndex:r}}},{key:"checkExisting",value:function(e){return this.sectorIDs.indexOf(e)>-1}},{key:"getAdjacentSector",value:function(e){var t=this.getPosition(e),r=[],o=e-this.width,i=e+this.width,s=e+1,c=e-1;t.rowIndex>0&&this.checkExisting(o)&&r.push({sectorNumber:o,sectorPos:{rowIndex:t.rowIndex-1,colIndex:t.colIndex}}),t.rowIndex<this.height-1&&r.push({sectorNumber:i,sectorPos:{rowIndex:t.rowIndex+1,colIndex:t.colIndex}}),t.colIndex<this.width-1&&r.push({sectorNumber:s,sectorPos:{rowIndex:t.rowIndex,colIndex:t.colIndex+1}}),t.colIndex>0&&r.push({sectorNumber:c,sectorPos:{rowIndex:t.rowIndex,colIndex:t.colIndex-1}});var u=r[n(1,r.length)-1];return u}}]),e}();r.Level=s},{}]},{},[1]);