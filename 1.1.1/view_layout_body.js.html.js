tui.util.defineNamespace("fedoc.content", {});
fedoc.content["view_layout_body.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Class for the body layout\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar View = require('../../base/view');\n\nvar HTML_CONTAINER = '&lt;div class=\"body_container\">&lt;/div>';\n\n/**\n * Class for the body layout\n * @module view/layout/body\n */\nvar Body = View.extend(/**@lends module:view/layout/body.prototype */{\n    /**\n     * @constructs\n     * @extends module:base/view\n     * @param {Object} options - Options\n     *      @param {String} [options.whichSide='R'] L or R (which side)\n     */\n    initialize: function(options) {\n        View.prototype.initialize.call(this);\n\n        this.setOwnProperties({\n            dimensionModel: options.dimensionModel,\n            dataModel: options.dataModel,\n            columnModel: options.columnModel,\n            renderModel: options.renderModel,\n            selectionModel: options.selectionModel,\n            focusModel: options.focusModel,\n            viewFactory: options.viewFactory,\n\n            // DIV for setting rendering position of entire child-nodes of $el.\n            $container: null,\n            whichSide: options &amp;&amp; options.whichSide || 'R'\n        });\n\n        this.listenTo(this.dimensionModel, 'change:bodyHeight', this._onBodyHeightChange)\n            .listenTo(this.dataModel, 'add remove reset', this._resetContainerHeight)\n            .listenTo(this.renderModel, 'change:scrollTop', this._onScrollTopChange)\n            .listenTo(this.renderModel, 'change:scrollLeft', this._onScrollLeftChange);\n    },\n\n    tagName: 'div',\n\n    className: 'data',\n\n    events: {\n        'scroll': '_onScroll',\n        'mousedown .body_container': '_onMouseDown',\n        'blur input, select': '_onBlurInput'\n    },\n\n    /**\n     * DimensionModel 의 body Height 가 변경된 경우 element 의 height 를 조정한다.\n     * @param {Object} model 변경이 일어난 model 인스턴스\n     * @param {Number} value bodyHeight 값\n     * @private\n     */\n    _onBodyHeightChange: function(model, value) {\n        this.$el.css('height', value + 'px');\n    },\n\n    /**\n     * Resets the height of a container div.\n     */\n    _resetContainerHeight: function() {\n        this.$container.css({\n            height: this.dimensionModel.get('totalRowHeight')\n        });\n    },\n\n    /**\n     * 스크롤 이벤트 핸들러\n     * @param {jQuery.Event} scrollEvent   스크롤 이벤트\n     * @private\n     */\n    _onScroll: function(scrollEvent) {\n        var attrs = {\n            scrollTop: scrollEvent.target.scrollTop\n        };\n\n        if (this.whichSide === 'R') {\n            attrs.scrollLeft = scrollEvent.target.scrollLeft;\n        }\n        this.renderModel.set(attrs);\n    },\n\n    /**\n     * Render model 의 Scroll left 변경 이벤트 핸들러\n     * @param {object} model 변경이 일어난 모델 인스턴스\n     * @param {Number} value scrollLeft 값\n     * @private\n     */\n    _onScrollLeftChange: function(model, value) {\n        if (this.whichSide === 'R') {\n            this.el.scrollLeft = value;\n        }\n    },\n\n    /**\n     * Render model 의 Scroll top 변경 이벤트 핸들러\n     * @param {object} model 변경이 일어난 모델 인스턴스\n     * @param {Number} value scrollTop값\n     * @private\n     */\n    _onScrollTopChange: function(model, value) {\n        this.el.scrollTop = value;\n    },\n\n    /**\n     * Mousedown event handler\n     * @param {jQuery.Event} event\n     * @private\n     */\n    _onMouseDown: function(event) {\n        var columnModel = this.columnModel,\n            $target = $(event.target),\n            isInput = $target.is('input'),\n            $td = $target.closest('td'),\n            $tr = $target.closest('tr'),\n            columnName = $td.attr('columnName'),\n            rowKey = $tr.attr('key'),\n            rowIndex = this.dataModel.indexOfRowKey(rowKey),\n            indexObj = {\n                columnName: columnName,\n                column: columnModel.indexOfColumnName(columnName, true),\n                row: rowIndex\n            },\n            list;\n\n        if (!columnName || rowIndex &lt; 0) {\n            _.extend(indexObj, this.dimensionModel.getIndexFromMousePosition(event.pageX, event.pageY, true));\n            list = columnModel.getVisibleColumnModelList(null, true);\n\n            // columnName과 columnIndex 재조정\n            columnName = list[indexObj.column].columnName;\n\n            indexObj.columnName = columnName;\n            indexObj.column = columnModel.indexOfColumnName(columnName, true);\n        } else if (this.columnModel.get('selectType') === 'radio') {\n            this.dataModel.check(rowIndex);\n        }\n\n        this._controlStartAction(event.pageX, event.pageY, event.shiftKey, indexObj, isInput);\n    },\n\n    /**\n     * Event handler for blur event on input element.\n     * @private\n     */\n    _onBlurInput: function(event) {\n        var focusModel = this.focusModel;\n        _.defer(function() {\n            focusModel.refreshState();\n        });\n    },\n\n    /**\n     * Control selection action when started\n     * @param {number} pageX - Mouse position X\n     * @param {number} pageY - Mouse position Y\n     * @param {boolean} shiftKey - Whether the shift-key is pressed.\n     * @param {{columnName:string, column:number, row:number}} indexObj\n     * @param {boolean} isInput - Whether the target is input element.\n     * @private\n     */\n    _controlStartAction: function(pageX, pageY, shiftKey, indexObj, isInput) {\n        var columnModel = this.columnModel,\n            selectionModel = this.selectionModel,\n            columnName = indexObj.columnName,\n            columnIndex = indexObj.column,\n            rowIndex = indexObj.row;\n\n        if (!selectionModel.isEnabled()) {\n            return;\n        }\n\n        if (!isInput) {\n            this._attachDragEvents(pageX, pageY);\n        }\n        if (!columnModel.isMetaColumn(columnName)) {\n            selectionModel.setState('cell');\n            if (shiftKey &amp;&amp; !isInput) {\n                selectionModel.update(rowIndex, columnIndex);\n            } else {\n                this.focusModel.focusAt(rowIndex, columnIndex);\n                selectionModel.end();\n            }\n        } else if (columnName === '_number') {\n            if (shiftKey) {\n                selectionModel.update(rowIndex, 0, 'row');\n            } else {\n                selectionModel.selectRow(rowIndex);\n            }\n        } else {\n            this._detachDragEvents();\n        }\n    },\n\n    /**\n     * 마우스 down 이벤트가 발생하여 selection 을 시작할 때, selection 영역을 계산하기 위해 document 에 이벤트 핸들러를 추가한다.\n     * @param {Number} pageX    초기값으로 설정할 마우스 x좌표\n     * @param {Number} pageY    초기값으로 설정할 마우스 y 좌표\n     */\n    _attachDragEvents: function(pageX, pageY) {\n        this.setOwnProperties({\n            mouseDownX: pageX,\n            mouseDownY: pageY\n        });\n        this.dimensionModel.refreshLayout();\n        $(document)\n            .on('mousemove', $.proxy(this._onMouseMove, this))\n            .on('mouseup', $.proxy(this._detachDragEvents, this))\n            .on('selectstart', $.proxy(this._onSelectStart, this));\n    },\n\n    /**\n     * 마우스 up 이벤트가 발생하여 selection 이 끝날 때, document 에 달린 이벤트 핸들러를 제거한다.\n     */\n    _detachDragEvents: function() {\n        this.selectionModel.stopAutoScroll();\n        $(document)\n            .off('mousemove', this._onMouseMove)\n            .off('mouseup', this._detachDragEvents)\n            .off('selectstart', this._onSelectStart);\n    },\n\n    /**\n     * Event handler for 'mousemove' event during drag\n     * @param {jQuery.Event} event - MouseEvent object\n     */\n    _onMouseMove: function(event) {\n        var selectionModel = this.selectionModel,\n            pageX = event.pageX,\n            pageY = event.pageY,\n            isMoved = this._getMouseMoveDistance(pageX, pageY) > 10;\n\n        if (selectionModel.hasSelection() || isMoved) {\n            selectionModel.updateByMousePosition(pageX, pageY);\n        }\n    },\n\n    /**\n     * Returns the distance between 'mousedown' position and specified position.\n     * @param {number} pageX - X position relative to the document\n     * @param {number} pageY - Y position relative to the document\n     * @return {number} Distance\n     * @private\n     */\n    _getMouseMoveDistance: function(pageX, pageY) {\n        var dx = Math.abs(this.mouseDownX - pageX),\n            dy = Math.abs(this.mouseDownY - pageY);\n\n        return Math.round(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));\n    },\n\n    /**\n     * select start 이벤트를 방지한다.\n     * @param {jQuery.Event} event selectStart 이벤트 객체\n     * @returns {boolean} false\n     * @private\n     */\n    _onSelectStart: function(event) {\n        event.preventDefault();\n        return false;\n    },\n\n    /**\n     * rendering 한다.\n     * @return {View.Layout.Body}   자기 자신\n     */\n    render: function() {\n        var whichSide = this.whichSide;\n\n        this._destroyChildren();\n\n        if (!this.dimensionModel.get('scrollX')) {\n            this.$el.css('overflow-x', 'hidden');\n        }\n        if (!this.dimensionModel.get('scrollY') &amp;&amp; whichSide === 'R') {\n            this.$el.css('overflow-y', 'hidden');\n        }\n        this.$el.css('height', this.dimensionModel.get('bodyHeight'));\n\n        this.$container = $(HTML_CONTAINER);\n        this.$el.append(this.$container);\n\n        this._addChildren([\n            this.viewFactory.createBodyTable(whichSide),\n            this.viewFactory.createSelectionLayer(whichSide)\n        ]);\n        this.$container.append(this._renderChildren());\n        this._resetContainerHeight();\n        return this;\n    }\n});\n\nmodule.exports = Body;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"