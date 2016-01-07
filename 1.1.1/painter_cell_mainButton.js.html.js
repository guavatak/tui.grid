tui.util.defineNamespace("fedoc.content", {});
fedoc.content["painter_cell_mainButton.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Painter class for the main button\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar Cell = require('../cell');\n\n/**\n * Painter class for the main button\n * @module painter/cell/mainButton\n */\nvar MainButtonCell = tui.util.defineClass(Cell,/**@lends module:painter/cell/mainButton.prototype */{\n    /**\n     * @constructs\n     * @extends module:painter/cell\n     */\n    init: function() {\n        Cell.apply(this, arguments);\n        this.setKeyDownSwitch({\n            'UP_ARROW': function() {},\n            'DOWN_ARROW': function() {},\n            'ENTER': function(keyDownEvent, param) {\n                this.focusOut(param.$target);\n            },\n            'LEFT_ARROW': function() {},\n            'RIGHT_ARROW': function() {},\n            'ESC': function() {}\n        });\n    },\n\n    /**\n     * rendering 해야하는 cellData 의 변경 목록\n     */\n    redrawAttributes: ['isDisabled', 'isEditable', 'optionList'],\n\n    eventHandler: {\n        'mousedown': '_onMouseDown',\n        'change input': '_onChange',\n        'keydown input': '_onKeyDown'\n    },\n\n    /**\n     * Content markup template\n     * @return {string} html\n     */\n    contentTemplate: _.template(\n        '&lt;input' +\n        ' type=\"&lt;%=type%>\"' +\n        ' name=\"&lt;%=name%>\"' +\n        ' &lt;% if (isChecked) print(\"checked\") %>' +\n        ' &lt;% if (isDisabled) print(\"disabled\") %>' +\n        '/>'\n    ),\n\n    /**\n     * 자기 자신의 인스턴스의 editType 을 반환한다.\n     * @return {string} editType 'normal|button|select|button|text|text-password|text-convertible'\n     */\n    getEditType: function() {\n        return '_button';\n    },\n\n    /**\n     * Cell data 를 인자로 받아 &lt;td> 안에 들아갈 html string 을 반환한다.\n     * redrawAttributes 에 해당하는 프로퍼티가 변경되었을 때 수행될 로직을 구현한다.\n     * @param {object} cellData 모델의 셀 데이터\n     * @return  {string} html 마크업 문자열\n     * @example\n     * var html = this.getContentHtml();\n     * &lt;select>\n     *     &lt;option value='1'>option1&lt;/option>\n     *     &lt;option value='2'>option1&lt;/option>\n     *     &lt;option value='3'>option1&lt;/option>\n     * &lt;/select>\n     */\n    getContentHtml: function(cellData) {\n        var isDisabled = cellData.isDisabled;\n\n        return this.contentTemplate({\n            type: this.grid.columnModel.get('selectType'),\n            name: this.grid.id,\n            isChecked: !!cellData.value,\n            isDisabled: isDisabled\n        });\n    },\n\n    /**\n     * cell 에서 키보드 enter 를 입력했을 때 편집모드로 전환. cell 내 input 에 focus 를 수행하는 로직. 필요에 따라 override 한다.\n     * @param {jQuery} $td 해당 cell 엘리먼트\n     */\n    /* istanbul ignore next */\n    focusIn: function() {\n        //아무것도 안하도록 변경\n    },\n\n    /**\n     * model의 redrawAttributes 에 해당하지 않는 프로퍼티의 변화가 발생했을 때 수행할 메서드\n     * redrawAttributes 에 해당하지 않는 프로퍼티가 변경되었을 때 수행할 로직을 구현한다.\n     * @param {object} cellData 모델의 셀 데이터\n     * @param {jQuery} $td 해당 cell 엘리먼트\n     */\n    setElementAttribute: function(cellData, $td) {\n        var $input = $td.find('input'),\n            isChecked = $input.prop('checked');\n        if (isChecked !== !!cellData.value) {\n            $input.prop('checked', cellData.value);\n        }\n    },\n\n    /**\n     * checked 를 toggle 한다.\n     * @param {jQuery} $td 해당 cell 엘리먼트\n     */\n    toggle: function($td) {\n        var $input = $td.find('input');\n        if (this.grid.columnModel.get('selectType') === 'checkbox') {\n            $input.prop('checked', !$input.prop('checked'));\n        }\n    },\n\n    /**\n     * getHtml 으로 마크업 생성시 td에 포함될 attribute object 를 반환한다.\n     * @return {Object} td 에 지정할 attribute 데이터\n     */\n    getAttributes: function() {\n        return {\n            align: 'center'\n        };\n    },\n\n    /**\n     * onChange 이벤트 핸들러\n     * @param {Event} changeEvent 이벤트 객체\n     * @private\n     */\n    _onChange: function(changeEvent) {\n        var $target = $(changeEvent.target),\n            rowKey = this.getRowKey($target);\n        this.grid.dataModel.setValue(rowKey, '_button', $target.prop('checked'));\n    },\n\n    /**\n     * TD 전체 mousedown 이벤트 발생시 checkbox 클릭 이벤트를 발생시킨다.\n     * @param {Event} mouseDownEvent 이벤트 객체\n     * @private\n     */\n    _onMouseDown: function(mouseDownEvent) {\n        var $target = $(mouseDownEvent.target);\n        if (!$target.is('input')) {\n            $target.find('input').trigger('click');\n        }\n    }\n});\n\nmodule.exports = MainButtonCell;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"