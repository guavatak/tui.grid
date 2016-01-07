tui.util.defineNamespace("fedoc.content", {});
fedoc.content["view_layout_toolbar_resizeHandler.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Class for the resize handler of the toolbar\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar View = require('../../../base/view');\n\n/**\n * Class for the resize handler of the toolbar\n * @module view/layout/toolbar/resizeHandler\n */\nvar ResizeHandler = View.extend(/**@lends module:view/layout/toolbar/resizeHandler.prototype */{\n    /**\n     * @constructs\n     * @extends module:base/view\n     */\n    initialize: function(options) {\n        this.dimensionModel = options.dimensionModel;\n        this.timeoutIdForResize = 0;\n    },\n\n    tagName: 'div',\n\n    className: 'height_resize_bar',\n\n    template: _.template('&lt;a href=\"#\" class=\"height_resize_handle\">&lt;span>&lt;/span>&lt;/a>'),\n\n    events: {\n        'mousedown': '_onMouseDown'\n    },\n\n    /**\n     * document 에 mousemove, mouseup 이벤트 핸들러를 추가한다.\n     * @private\n     */\n    _attachMouseEvent: function() {\n        $(document).on('mousemove', $.proxy(this._onMouseMove, this));\n        $(document).on('mouseup', $.proxy(this._onMouseUp, this));\n        $(document).on('selectstart', $.proxy(this._onSelectStart, this));\n    },\n\n    /**\n     * document 에 mousemove, mouseup 이벤트 핸들러를 추가한다.\n     * @private\n     */\n    _detachMouseEvent: function() {\n        $(document).off('mousemove', $.proxy(this._onMouseMove, this));\n        $(document).off('mouseup', $.proxy(this._onMouseUp, this));\n        $(document).off('selectstart', $.proxy(this._onSelectStart, this));\n    },\n\n    /**\n     * mousedown 이벤트 핸들러\n     * @param {event} mouseDownEvent 마우스 이벤트\n     * @private\n     */\n    _onMouseDown: function(mouseDownEvent) {\n        mouseDownEvent.preventDefault();\n        $(document.body).css('cursor', 'row-resize');\n        this.dimensionModel.refreshLayout();\n        this._attachMouseEvent();\n    },\n\n    /**\n     * mousemove 이벤트 핸들러\n     * @param {event} mouseMoveEvent 마우스 이벤트\n     * @private\n     */\n    _onMouseMove: function(mouseMoveEvent) {\n        var dimensionModel = this.dimensionModel,\n            offsetTop = dimensionModel.get('offsetTop'),\n            headerHeight = dimensionModel.get('headerHeight'),\n            rowHeight = dimensionModel.get('rowHeight'),\n            toolbarHeight = dimensionModel.get('toolbarHeight'),\n            bodyHeight = mouseMoveEvent.pageY - offsetTop - headerHeight - toolbarHeight;\n\n        clearTimeout(this.timeoutIdForResize);\n\n        bodyHeight = Math.max(bodyHeight, rowHeight + dimensionModel.getScrollXHeight());\n\n        //매번 수행하면 성능이 느려지므로, resize 이벤트가 발생할 시 천천히 업데이트한다.\n        this.timeoutIdForResize = setTimeout(function() {\n            dimensionModel.set({\n                bodyHeight: bodyHeight\n            });\n        }, 0);\n    },\n\n    /**\n     * mouseup 이벤트 핸들러\n     * @private\n     */\n    _onMouseUp: function() {\n        $(document.body).css('cursor', 'default');\n        this._detachMouseEvent();\n    },\n\n    /**\n     * selection start 이벤트 핸들러\n     * @param {Event} event - Event object\n     * @return {boolean} - 기본 동작 방지를 위해 무조건 false 를 반환한다.\n     * @private\n     */\n    _onSelectStart: function(event) {\n        event.preventDefault();\n        return false;\n    },\n\n    /**\n     * 랜더링한다.\n     * @return {ResizeHandler} this object\n     */\n    render: function() {\n        this._destroyChildren();\n        this.$el.html(this.template());\n        return this;\n    },\n\n    /**\n     * 소멸자\n     */\n    destroy: function() {\n        this.stopListening();\n        this._onMouseUp();\n        this._destroyChildren();\n        this.remove();\n    }\n});\n\nmodule.exports = ResizeHandler;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"