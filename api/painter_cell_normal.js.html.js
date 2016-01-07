tui.util.defineNamespace("fedoc.content", {});
fedoc.content["painter_cell_normal.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview 기본 Cell (일반, 숫자, 메인 Checkbox) 관련 Painter 정의\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar Cell = require('../cell');\n\n/**\n * editOption 이 적용되지 않은 cell 의 Painter\n * @module painter/cell/normal\n */\nvar NormalCell = tui.util.defineClass(Cell,/**@lends module:painter/cell/normal.prototype */{\n    /**\n     * @constructs\n     * @extends module:painter/cell\n     */\n    init: function() {\n        Cell.apply(this, arguments);\n    },\n\n    /**\n     * 자기 자신의 인스턴스의 editType 을 반환한다.\n     * @return {string} editType 'normal|select|button|text|text-convertible'\n     */\n    getEditType: function() {\n        return 'normal';\n    },\n\n    /**\n     * Cell data 를 인자로 받아 &lt;td> 안에 들아갈 html string 을 반환한다.\n     * redrawAttributes 에 해당하는 프로퍼티가 변경되었을 때 수행될 로직을 구현한다.\n     * @param {object} cellData 모델의 셀 데이터\n     * @return  {string} html 마크업 문자열\n     * @example\n     * var html = this.getContentHtml();\n     * &lt;select>\n     *     &lt;option value='1'>option1&lt;/option>\n     *     &lt;option value='2'>option1&lt;/option>\n     *     &lt;option value='3'>option1&lt;/option>\n     * &lt;/select>\n     */\n    getContentHtml: function(cellData) {\n        var columnName = cellData.columnName,\n            columnModel = this.grid.columnModel.getColumnModel(columnName),\n            value = this.grid.dataModel.get(cellData.rowKey).getHTMLEncodedString(columnName),\n            rowKey = cellData.rowKey;\n        if (tui.util.isFunction(columnModel.formatter)) {\n            value = columnModel.formatter(value, this.grid.dataModel.get(rowKey).toJSON(), columnModel);\n        }\n        if (!tui.util.isExisty(value)) {\n            value = '';\n        }\n        return value;\n    },\n\n    /**\n     * cell 에서 키보드 enter 를 입력했을 때 편집모드로 전환. cell 내 input 에 focus 를 수행하는 로직. 필요에 따라 override 한다.\n     */\n    focusIn: function() {\n        this.grid.focusModel.focusClipboard();\n    },\n\n    /**\n     * model의 redrawAttributes 에 해당하지 않는 프로퍼티의 변화가 발생했을 때 수행할 메서드\n     * redrawAttributes 에 해당하지 않는 프로퍼티가 변경되었을 때 수행할 로직을 구현한다.\n     * @param {object} cellData 모델의 셀 데이터\n     * @param {jQuery} $td 해당 cell 엘리먼트\n     * @param {Boolean} hasFocusedElement 해당 셀에 실제 focus 된 엘리먼트가 존재하는지 여부\n     */\n    /* istanbul ignore next */\n    setElementAttribute: function(cellData, $td, hasFocusedElement) {} // eslint-disable-line\n});\n\nmodule.exports = NormalCell;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"