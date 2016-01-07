tui.util.defineNamespace("fedoc.content", {});
fedoc.content["model_row.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview RowList 클래스파일\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar Model = require('../base/model');\nvar util = require('../common/util');\n\n/**\n * Row Model\n * @module model/row\n */\nvar Row = Model.extend(/**@lends module:model/row.prototype */{\n    /**\n     * @constructs\n     * @extends module:base/model\n     * @param  {object} attributes - Attributes\n     * @param  {object} options - Options\n     */\n    initialize: function(attributes, options) { // eslint-disable-line no-unused-vars\n        var rowKey, rowData;\n\n        rowKey = attributes &amp;&amp; attributes['rowKey'];\n        rowData = this.collection.dataModel.get(rowKey);\n\n        if (rowData) {\n            this.listenTo(rowData, 'change restore', this._onDataModelChange);\n            this.listenTo(rowData, 'extraDataChanged', this._setRowExtraData);\n        }\n    },\n\n    idAttribute: 'rowKey',\n\n    /**\n     * dataModel 이 변경시 model 데이터를 함께 업데이트 하는 핸들러\n     * @param {Object} model    변경이 발생한 row 모델\n     * @private\n     */\n    _onDataModelChange: function(model) {\n        _.each(model.changed, function(value, columnName) {\n            this.setCell(columnName, {\n                value: value\n            });\n        }, this);\n    },\n\n    /**\n     * extra data 를 토대로 rowSpanned 된 render model 의 정보를 업데이트 한다.\n     * @private\n     */\n    _setRowExtraData: function() {\n        var dataModel = this.collection.dataModel,\n            row = dataModel.get(this.get('rowKey')),\n            columnModelList = this.collection.columnModel.getVisibleColumnModelList(null, true),\n            rowState = row.getRowState(),\n            param;\n\n        if (tui.util.isUndefined(this.collection)) {\n            return;\n        }\n\n        _.each(columnModelList, function(columnModel) {\n            var columnName = columnModel['columnName'],\n                cellData = this.get(columnName),\n                rowModel = this,\n                isEditable, isDisabled;\n\n            if (!tui.util.isUndefined(cellData)) {\n                isEditable = row.isEditable(columnName);\n                isDisabled = (columnName === '_button') ? rowState.isDisabledCheck : rowState.isDisabled;\n                if (dataModel.isRowSpanEnable() &amp;&amp; !cellData['isMainRow']) {\n                    rowModel = this.collection.get(cellData['mainRowKey']);\n                }\n                if (rowModel) {\n                    param = {\n                        isDisabled: isDisabled,\n                        isEditable: isEditable,\n                        className: row.getClassNameList(columnName).join(' ')\n                    };\n                    rowModel.setCell(columnName, param);\n                }\n            }\n        }, this);\n    },\n\n    /**\n     * Backbone 이 collection 생성 시 내부적으로 parse 를 호출하여 데이터를 형식에 맞게 가공한다.\n     * @param {Array} data  원본 데이터\n     * @return {Array}  형식에 맞게 가공된 데이터\n     */\n    parse: function(data, options) {\n        return this._formatData(data, options.collection.dataModel);\n    },\n\n    /**\n     * 데이터를 View 에서 사용할 수 있도록 가공한다.\n     * @param {Array} data  원본 데이터\n     * @return {Array}  가공된 데이터\n     * @private\n     */\n    _formatData: function(data, dataModel) {\n        var rowKey = data['rowKey'],\n            row = dataModel.get(rowKey),\n            rowState = row.getRowState(),\n            isDisabled = rowState.isDisabled;\n\n        _.each(data, function(value, columnName) {\n            var rowSpanData,\n                isEditable = row.isEditable(columnName);\n\n            if (columnName !== 'rowKey' &amp;&amp; columnName !== '_extraData') {\n                if (dataModel.isRowSpanEnable() &amp;&amp;\n                    data['_extraData'] &amp;&amp; data['_extraData']['rowSpanData'] &amp;&amp;\n                    data['_extraData']['rowSpanData'][columnName]) {\n                    rowSpanData = data['_extraData']['rowSpanData'][columnName];\n                } else {\n                    rowSpanData = {\n                        mainRowKey: rowKey,\n                        count: 0,\n                        isMainRow: true\n                    };\n                }\n                isDisabled = (columnName === '_button') ? rowState.isDisabledCheck : isDisabled;\n\n                data[columnName] = {\n                    rowKey: rowKey,\n                    columnName: columnName,\n                    value: value,\n                    //Rendering properties\n                    rowSpan: rowSpanData.count,\n                    isMainRow: rowSpanData.isMainRow,\n                    mainRowKey: rowSpanData.mainRowKey,\n                    //Change attribute properties\n                    isEditable: isEditable,\n                    isDisabled: isDisabled,\n                    optionList: [],\n                    className: row.getClassNameList(columnName).join(' '),\n\n                    changed: []    //변경된 프로퍼티 목록들\n                };\n            }\n        }, this);\n        return data;\n    },\n\n    /**\n     * Cell 의 값을 변경한다.\n     * - 참조형 데이터 타입이기 때문에 change 이벤트 발생을 위해 이 method 를 사용하여 값 변경을 수행한다.\n     * @param {String} columnName   컬럼명\n     * @param {{key: value}} param  key:value 로 이루어진 셀에서 변경할 프로퍼티 목록\n     */\n    setCell: function(columnName, param) {\n        var isValueChanged = false,\n            changed = [],\n            rowIndex, rowKey, data;\n\n        if (!this.get(columnName)) {\n            return;\n        }\n\n        rowKey = this.get('rowKey');\n        data = _.clone(this.get(columnName));\n\n        _.each(param, function(changeValue, name) {\n            if (!util.isEqual(data[name], changeValue)) {\n                isValueChanged = (name === 'value') ? true : isValueChanged;\n                data[name] = changeValue;\n                changed.push(name);\n            }\n        }, this);\n\n        if (changed.length) {\n            data['changed'] = changed;\n            this.set(columnName, data);\n            if (isValueChanged) {\n                //value 가 변경되었을 경우 relation 을 수행한다.\n                rowIndex = this.collection.dataModel.indexOfRowKey(rowKey);\n                this.trigger('valueChange', rowIndex);\n            }\n        }\n    }\n});\n\nmodule.exports = Row;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"