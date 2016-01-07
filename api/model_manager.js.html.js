tui.util.defineNamespace("fedoc.content", {});
fedoc.content["model_manager.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Model Manager\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar ColumnModelData = require('./data/columnModel');\nvar RowListData = require('./data/rowList');\nvar ToolbarModel = require('./toolbar');\nvar DimensionModel = require('./dimension');\nvar FocusModel = require('./focus');\nvar RenderModel = require('./renderer');\nvar SmartRenderModel = require('./renderer-smart');\nvar SelectionModel = require('./selection');\n\nvar util = require('../common/util');\nvar renderStateMap = require('../common/constMap').renderState;\n\nvar defaultOptions = {\n    columnFixCount: 0,\n    columnModelList: [],\n    keyColumnName: null,\n    selectType: '',\n    autoNumbering: true,\n    headerHeight: 35,\n    rowHeight: 27,\n    displayRowCount: 10,\n    minimumColumnWidth: 50,\n    notUseSmartRendering: false,\n    columnMerge: [],\n    scrollX: true,\n    scrollY: true,\n    useClientSort: true,\n    singleClickEdit: false,\n    toolbar: {\n        hasResizeHandler: true,\n        hasControlPanel: true,\n        hasPagination: true\n    }\n};\n\n/**\n * Model Manager\n * @module modelManager\n */\nvar ModelManager = tui.util.defineClass(/**@lends module:modelManager.prototype */{\n    /**\n     * @constructs\n     * @param {Object} options - Options to create models\n     * @param {module/domState} domState - DomState instance\n     */\n    init: function(options, domState) {\n        options = $.extend(true, {}, defaultOptions, options);\n\n        this.gridId = options.gridId;\n\n        this.columnModel = this._createColumnModel(options);\n        this.dataModel = this._createDataModel(options, domState);\n        this.toolbarModel = this._createToolbarModel(options);\n        this.dimensionModel = this._createDimensionModel(options, domState);\n        this.renderModel = this._createRenderModel(options);\n        this.focusModel = this._createFocusModel(domState);\n        this.selectionModel = this._createSelectionModel();\n\n        // todo: remove dependency\n        this.dimensionModel.renderModel = this.renderModel;\n    },\n\n    /**\n     * Creates an instance of column model and returns it.\n     * @param  {Object} options - Options\n     * @return {module:data/columnModel} A new instance\n     * @private\n     */\n    _createColumnModel: function(options) {\n        return new ColumnModelData({\n            hasNumberColumn: options.autoNumbering,\n            keyColumnName: options.keyColumnName,\n            columnFixCount: options.columnFixCount,\n            selectType: options.selectType,\n            columnMerge: options.columnMerge,\n            columnModelList: options.columnModelList\n        });\n    },\n\n    /**\n     * Creates an instance of data model and returns it.\n     * @param  {Object} options - Options\n     * @param  {module:domState} domState - domState\n     * @return {module:data/rowList} - A new instance\n     * @private\n     */\n    _createDataModel: function(options, domState) {\n        return new RowListData([], {\n            gridId: this.gridId,\n            domState: domState,\n            columnModel: this.columnModel,\n            useClientSort: options.useClientSort\n        });\n    },\n\n    /**\n     * Creates an instance of toolbar model and returns it.\n     * @param  {Object} options - Options\n     * @return {module:model/toolbar} - A new instance\n     * @private\n     */\n    _createToolbarModel: function(options) {\n        return new ToolbarModel(options.toolbar);\n    },\n\n    /**\n     * Creates an instance of dimension model and returns it.\n     * @param  {Object} options - Options\n     * @param  {module:domState} domState - domState\n     * @return {module:model/dimension} - A new instance\n     * @private\n     */\n    _createDimensionModel: function(options, domState) {\n        var attrs = {\n            headerHeight: options.headerHeight,\n            rowHeight: options.rowHeight,\n            scrollX: !!options.scrollX,\n            scrollY: !!options.scrollY,\n            minimumColumnWidth: options.minimumColumnWidth,\n            displayRowCount: options.displayRowCount\n        };\n        if (!this.toolbarModel.isVisible()) {\n            attrs.toolbarHeight = 0;\n        }\n\n        return new DimensionModel(attrs, {\n            columnModel: this.columnModel,\n            dataModel: this.dataModel,\n            domState: domState\n        });\n    },\n\n    /**\n     * Creates an instance of focus model and returns it.\n     * @param  {module:domState} domState - DomState instance\n     * @return {module:model/focus} - A new instance\n     * @private\n     */\n    _createFocusModel: function(domState) {\n        return new FocusModel(null, {\n            columnModel: this.columnModel,\n            dataModel: this.dataModel,\n            dimensionModel: this.dimensionModel,\n            renderModel: this.renderModel,\n            domState: domState\n        });\n    },\n\n    /**\n     * Creates an instance of seleciton model and returns it.\n     * @return {module:model/selection} - A new instance\n     * @private\n     */\n    _createSelectionModel: function() {\n        return new SelectionModel(null, {\n            columnModel: this.columnModel,\n            dataModel: this.dataModel,\n            dimensionModel: this.dimensionModel,\n            renderModel: this.renderModel,\n            focusModel: this.focusModel\n        });\n    },\n\n    /**\n     * Creates an instance of render model and returns it.\n     * @param  {Object} options - Options\n     * @return {module:model/render} - A new instance\n     * @private\n     */\n    _createRenderModel: function(options) {\n        var attrs, renderOptions, Constructor;\n\n        attrs = {\n            emptyMessage: options.emptyMessage\n        };\n        renderOptions = {\n            columnModel: this.columnModel,\n            dataModel: this.dataModel,\n            dimensionModel: this.dimensionModel\n        };\n        Constructor = options.notUseSmartRendering ? RenderModel : SmartRenderModel\n\n        return new Constructor(attrs, renderOptions);\n    },\n\n    /**\n     * Destroy\n     */\n    destroy: function() {\n        _.each(this, function(value, property) {\n            if (value &amp;&amp; tui.util.isFunction(value._destroy)) {\n                value._destroy();\n            }\n            if (value &amp;&amp; tui.util.isFunction(value.stopListening)) {\n                value.stopListening();\n            }\n            this[property] = null;\n        }, this);\n    }\n});\n\nmodule.exports = ModelManager;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"