tui.util.defineNamespace("fedoc.content", {});
fedoc.content["model_focus.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Focus 관련 데이터 처리름 담당한다.\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar Model = require('../base/model'),\n    util = require('../common/util');\n\n/**\n * Focus model\n * RowList collection 이 focus class 를 listen 한다.\n * @module model/focus\n */\nvar Focus = Model.extend(/**@lends module:model/focus.prototype */{\n    /**\n     * @extends module:base/model\n     * @constructs\n     */\n    initialize: function(attrs, options) {\n        Model.prototype.initialize.apply(this, arguments);\n\n        this.dataModel = options.dataModel;\n        this.columnModel = options.columnModel;\n        this.dimensionModel = options.dimensionModel;\n        this.renderModel = options.renderModel;\n        this.cellFactory = options.cellFactory;\n        this.domState = options.domState;\n    },\n\n    defaults: {\n        rowKey: null,\n        columnName: '',\n        prevRowKey: null,\n        prevColumnName: ''\n    },\n\n    /**\n     * 이전 focus 정보를 저장한다.\n     * @private\n     * @return {Model.Focus} This object\n     */\n    _savePrevious: function() {\n        if (this.get('rowKey') !== null) {\n            this.set('prevRowKey', this.get('rowKey'));\n        }\n        if (this.get('columnName')) {\n            this.set('prevColumnName', this.get('columnName'));\n        }\n        return this;\n    },\n\n    /**\n     * 이전 focus 정보를 제거한다.\n     * @private\n     */\n    _clearPrevious: function() {\n        this.set({\n            prevRowKey: null,\n            prevColumnName: ''\n        });\n    },\n\n    /**\n     * 행을 select 한다.\n     * @param {Number|String} rowKey - select 할 행의 키값\n     * @returns {Model.Focus} This object\n     */\n    select: function(rowKey) {\n        this.unselect().set('rowKey', rowKey);\n        if (this.columnModel.get('selectType') === 'radio') {\n            this.dataModel.check(rowKey);\n        }\n        this.trigger('select', {\n            rowKey: rowKey,\n            rowData: this.dataModel.getRowData(rowKey)\n        });\n        return this;\n    },\n\n    /**\n     * 행을 unselect 한다.\n     * @param {boolean} blur - The boolean value whether to invoke blur\n     * @return {Model.Focus} This object\n     */\n    unselect: function(blur) {\n        if (blur) {\n            this.blur();\n        }\n        this.trigger('unselect', this.get('rowKey'));\n        this.set({\n            'rowKey': null\n        });\n        return this;\n    },\n\n    /**\n     * focus 처리한다.\n     * @param {Number|String} rowKey focus 처리할 셀의 rowKey 값\n     * @param {String} columnName focus 처리할 셀의 컬럼명\n     * @param {Boolean} isScrollable focus 처리한 영역으로 scroll 위치를 이동할지 여부\n     * @return {Model.Focus} This object\n     */\n    focus: function(rowKey, columnName, isScrollable) {\n        if (util.isBlank(rowKey) ||\n            util.isBlank(columnName) ||\n            this.columnModel.isMetaColumn(columnName) ||\n            (this.get('rowKey') === rowKey &amp;&amp; this.get('columnName') === columnName)) {\n            return this;\n        }\n\n        this.blur()\n            .select(rowKey)\n            .set('columnName', columnName)\n            .trigger('focus', rowKey, columnName);\n\n        if (isScrollable) {\n            this.scrollToFocus();\n        }\n        return this;\n    },\n\n    /**\n     * rowIndex, columnIndex 에 해당하는 컬럼에 포커싱한다.\n     * @param {(Number|String)} rowIndex 행 index\n     * @param {String} columnIndex 열 index\n     * @param {boolean} [isScrollable=false] 그리드에서 해당 영역으로 scroll 할지 여부\n     */\n    focusAt: function(rowIndex, columnIndex, isScrollable) {\n        var row = this.dataModel.at(rowIndex),\n            column = this.columnModel.at(columnIndex, true);\n        if (row &amp;&amp; column) {\n            this.focus(row.get('rowKey'), column['columnName'], isScrollable);\n        }\n    },\n\n    /**\n     * 셀을 편집모드로 전환한다.\n     * @param {(Number|String)} rowKey    행 데이터의 고유 키\n     * @param {String} columnName   컬럼 이름\n     * @param {boolean} [isScrollable=false] 그리드에서 해당 영역으로 scroll 할지 여부\n     */\n    focusIn: function(rowKey, columnName, isScrollable) {\n        var cellPainter;\n\n        this.focus(rowKey, columnName, isScrollable);\n        rowKey = this.dataModel.getMainRowKey(rowKey, columnName);\n        if (this.dataModel.get(rowKey).isEditable(columnName)) {\n            this.trigger('focusIn', rowKey, columnName);\n        } else {\n            this.focusClipboard();\n        }\n    },\n\n    /**\n     * rowIndex, columnIndex 에 해당하는 컬럼에 포커싱 후 편진모드로 전환 한다.\n     * @param {(Number|String)} rowIndex 행 index\n     * @param {String} columnIndex 열 index\n     * @param {boolean} [isScrollable=false] 그리드에서 해당 영역으로 scroll 할지 여부\n     */\n    focusInAt: function(rowIndex, columnIndex, isScrollable) {\n        var row = this.dataModel.at(rowIndex),\n            column = this.columnModel.at(columnIndex, true);\n        if (row &amp;&amp; column) {\n            this.focusIn(row.get('rowKey'), column['columnName'], isScrollable);\n        }\n    },\n\n    /**\n     * clipboard 에 focus 한다.\n     */\n    focusClipboard: function() {\n        this.trigger('focusClipboard');\n    },\n\n    /**\n     * If the grid has focused element, make sure that focusModel has a valid data,\n     * Otherwise call focusModel.blur().\n     */\n    refreshState: function() {\n        if (!this.domState.hasFocusedElement()) {\n            this.blur();\n        } else if (!this.has() &amp;&amp; !this.restore()) {\n            this.focusAt(0, 0);\n        }\n    },\n\n    /**\n     * Scroll to focus\n     */\n    scrollToFocus: function() {\n        var rowKey = this.get('rowKey'),\n            columnName = this.get('columnName'),\n            scrollPosition = this.dimensionModel.getScrollPosition(rowKey, columnName);\n\n        if (!tui.util.isEmpty(scrollPosition)) {\n            this.renderModel.set(scrollPosition);\n        }\n    },\n\n    /**\n     * 디자인 blur 처리한다.\n     * @return {Model.Focus} This object\n     */\n    blur: function() {\n        if (this.has()) {\n            this._savePrevious();\n            this.trigger('blur', this.get('rowKey'), this.get('columnName'));\n            if (this.get('rowKey') !== null) {\n                this.set('columnName', '');\n            }\n        }\n        return this;\n    },\n\n    /**\n     * 현재 focus 정보를 반환한다.\n     * @return {{rowKey: (number|string), columnName: string}} 현재 focus 정보에 해당하는 rowKey, columnName\n     */\n    which: function() {\n        return {\n            rowKey: this.get('rowKey'),\n            columnName: this.get('columnName')\n        };\n    },\n\n    /**\n     * 현재 focus 정보를 index 기준으로 반환한다.\n     * @param {boolean} isPrevious 이전 focus 정보를 반환할지 여부\n     * @return {{row: number, column: number}} The object that contains index info\n     */\n    indexOf: function(isPrevious) {\n        var rowKey = isPrevious ? this.get('prevRowKey') : this.get('rowKey'),\n            columnName = isPrevious ? this.get('prevColumnName') : this.get('columnName');\n\n        return {\n            row: this.dataModel.indexOfRowKey(rowKey),\n            column: this.columnModel.indexOfColumnName(columnName, true)\n        };\n    },\n\n    /**\n     * Returns whether has focus.\n     * @return {boolean} True if has focus.\n     */\n    has: function() {\n        return this._isValidCell(this.get('rowKey'), this.get('columnName'));\n    },\n\n    /**\n     * Restore previous focus data.\n     * @return {boolean} True if restored\n     */\n    restore: function() {\n        var prevRowKey = this.get('prevRowKey'),\n            prevColumnName = this.get('prevColumnName'),\n            restored = false;\n\n        if (this._isValidCell(prevRowKey, prevColumnName)) {\n            this.focus(prevRowKey, prevColumnName);\n            restored = true;\n        }\n        return restored;\n    },\n\n    /**\n     * Returns whether the specified cell is exist\n     * @return {boolean} True if exist\n     */\n    _isValidCell: function(rowKey, columnName) {\n        var isValidRowKey = !util.isBlank(rowKey) &amp;&amp; !!this.dataModel.get(rowKey),\n            isValidColumnName = !util.isBlank(columnName) &amp;&amp; !!this.columnModel.getColumnModel(columnName);\n\n        return isValidRowKey &amp;&amp; isValidColumnName;\n    },\n\n    /**\n     * 현재 focus 된 row 기준으로 offset 만큼 이동한 rowKey 를 반환한다.\n     * @param {Number} offset   이동할 offset\n     * @return {Number|String} rowKey   offset 만큼 이동한 위치의 rowKey\n     * @private\n     */\n    _findRowKey: function(offset) {\n        var index, row,\n            dataModel = this.dataModel;\n        if (this.has()) {\n            index = Math.max(Math.min(dataModel.indexOfRowKey(this.get('rowKey')) + offset, this.dataModel.length - 1), 0);\n            row = dataModel.at(index);\n            return row &amp;&amp; row.get('rowKey');\n        }\n    },\n\n    /**\n     * 현재 focus 된 column 기준으로 offset 만큼 이동한 columnName 을 반환한다.\n     * @param {Number} offset   이동할 offset\n     * @return {String} columnName  offset 만큼 이동한 위치의 columnName\n     * @private\n     */\n    _findColumnName: function(offset) {\n        var index,\n            columnModel = this.columnModel,\n            columnModelList = columnModel.getVisibleColumnModelList(),\n            columnIndex = columnModel.indexOfColumnName(this.get('columnName'), true);\n\n        if (this.has()) {\n            index = Math.max(Math.min(columnIndex + offset, columnModelList.length - 1), 0);\n            return columnModelList[index] &amp;&amp; columnModelList[index]['columnName'];\n        }\n    },\n\n    /**\n     * rowSpanData 를 반환한다.\n     * @param {Number|String} rowKey    조회할 데이터의 키값\n     * @param {String} columnName   컬럼명\n     * @return {*|{count: number, isMainRow: boolean, mainRowKey: *}|*} rowSpanData 정보\n     * @private\n     */\n    _getRowSpanData: function(rowKey, columnName) {\n        return this.dataModel.get(rowKey).getRowSpanData(columnName);\n    },\n\n    /**\n     * offset 만큼 뒤로 이동한 row 의 index 를 반환한다.\n     * @param {number} offset   이동할 offset\n     * @return {Number} 이동한 위치의 row index\n     */\n    nextRowIndex: function(offset) {\n        var rowKey = this.nextRowKey(offset);\n        return this.dataModel.indexOfRowKey(rowKey);\n    },\n\n    /**\n     * offset 만큼 앞으로 이동한 row의 index를 반환한다.\n     * @param {number} offset 이동할 offset\n     * @return {Number} 이동한 위치의 row index\n     */\n    prevRowIndex: function(offset) {\n        var rowKey = this.prevRowKey(offset);\n        return this.dataModel.indexOfRowKey(rowKey);\n    },\n\n    /**\n     * 다음 컬럼의 인덱스를 반환한다.\n     * @return {Number} 다음 컬럼의 index\n     */\n    nextColumnIndex: function() {\n        var columnName = this.nextColumnName();\n        return this.columnModel.indexOfColumnName(columnName, true);\n    },\n\n    /**\n     * 이전 컬럼의 인덱스를 반환한다.\n     * @return {Number} 이전 컬럼의 인덱스\n     */\n    prevColumnIndex: function() {\n        var columnName = this.prevColumnName();\n        return this.columnModel.indexOfColumnName(columnName, true);\n    },\n\n    /**\n     * keyEvent 발생 시 호출될 메서드로,\n     * rowSpan 정보 까지 계산된 다음 rowKey 를 반환한다.\n     * @param {number}  offset 이동할 offset\n     * @return {Number|String} offset 만큼 이동한 위치의 rowKey\n     */\n    nextRowKey: function(offset) {\n        var focused = this.which(),\n            rowKey = focused.rowKey,\n            count, rowSpanData;\n\n        offset = (typeof offset === 'number') ? offset : 1;\n        if (offset > 1) {\n            rowKey = this._findRowKey(offset);\n            rowSpanData = this._getRowSpanData(rowKey, focused.columnName);\n            if (!rowSpanData.isMainRow) {\n                rowKey = this._findRowKey(rowSpanData.count + offset);\n            }\n        } else {\n            rowSpanData = this._getRowSpanData(rowKey, focused.columnName);\n            if (rowSpanData.isMainRow &amp;&amp; rowSpanData.count > 0) {\n                rowKey = this._findRowKey(rowSpanData.count);\n            } else if (!rowSpanData.isMainRow) {\n                count = rowSpanData.count;\n                rowSpanData = this._getRowSpanData(rowSpanData.mainRowKey, focused.columnName);\n                rowKey = this._findRowKey(rowSpanData.count + count);\n            } else {\n                rowKey = this._findRowKey(1);\n            }\n        }\n        return rowKey;\n    },\n\n    /**\n     * keyEvent 발생 시 호출될 메서드로,\n     * rowSpan 정보 까지 계산된 이전 rowKey 를 반환한다.\n     * @param {number}  offset 이동할 offset\n     * @return {Number|String} offset 만큼 이동한 위치의 rowKey\n     */\n    prevRowKey: function(offset) {\n        var focused = this.which(),\n            rowKey = focused.rowKey,\n            rowSpanData;\n        offset = typeof offset === 'number' ? offset : 1;\n        offset *= -1;\n\n        if (offset &lt; -1) {\n            rowKey = this._findRowKey(offset);\n            rowSpanData = this._getRowSpanData(rowKey, focused.columnName);\n            if (!rowSpanData.isMainRow) {\n                rowKey = this._findRowKey(rowSpanData.count + offset);\n            }\n        } else {\n            rowSpanData = this._getRowSpanData(rowKey, focused.columnName);\n            if (!rowSpanData.isMainRow) {\n                rowKey = this._findRowKey(rowSpanData.count - 1);\n            } else {\n                rowKey = this._findRowKey(-1);\n            }\n        }\n        return rowKey;\n    },\n\n    /**\n     * keyEvent 발생 시 호출될 메서드로, 다음 columnName 을 반환한다.\n     * @return {String} 다음 컬럼명\n     */\n    nextColumnName: function() {\n        return this._findColumnName(1);\n    },\n\n    /**\n     * keyEvent 발생 시 호출될 메서드로, 이전 columnName 을 반환한다.\n     * @return {String} 이전 컬럼명\n     */\n    prevColumnName: function() {\n        return this._findColumnName(-1);\n    },\n\n    /**\n     * 첫번째 row 의 key 를 반환한다.\n     * @return {(string|number)} 첫번째 row 의 키값\n     */\n    firstRowKey: function() {\n        return this.dataModel.at(0).get('rowKey');\n    },\n\n    /**\n     * 마지막 row의 key 를 반환한다.\n     * @return {(string|number)} 마지막 row 의 키값\n     */\n    lastRowKey: function() {\n        return this.dataModel.at(this.dataModel.length - 1).get('rowKey');\n    },\n\n    /**\n     * 첫번째 columnName 을 반환한다.\n     * @return {string} 첫번째 컬럼명\n     */\n    firstColumnName: function() {\n        var columnModelList = this.columnModel.getVisibleColumnModelList();\n        return columnModelList[0]['columnName'];\n    },\n\n    /**\n     * 마지막 columnName 을 반환한다.\n     * @return {string} 마지막 컬럼명\n     */\n    lastColumnName: function() {\n        var columnModelList = this.columnModel.getVisibleColumnModelList(),\n            lastIndex = columnModelList.length - 1;\n        return columnModelList[lastIndex]['columnName'];\n    }\n});\n\nmodule.exports = Focus;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"