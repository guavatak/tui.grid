tui.util.defineNamespace("fedoc.content", {});
fedoc.content["view_layout_toolbar_pagination.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Class for the pagination in the toolbar\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar View = require('../../../base/view');\n\n/**\n * Class for the pagination in the toolbar\n * @module view/layout/toolbar/pagination\n */\nvar Pagination = View.extend(/**@lends module:view/layout/toolbar/pagination.prototype */{\n    /**\n     * @constructs\n     * @extends module:base/view\n     */\n    initialize: function(options) {\n        this.toolbarModel = options.toolbarModel;\n    },\n\n    tagName: 'div',\n\n    className: 'grid_pagination',\n\n    template: _.template('' +\n        '&lt;a href=\"#\" class=\"pre_end\" title=\"First page\">First&lt;/a>' +\n        '&lt;a href=\"#\" class=\"pre\" title=\"Previous page\">Prev&lt;/a> ' +\n        '&lt;a href=\"#\" class=\"next\" title=\"Next page\">Next&lt;/a>' +\n        '&lt;a href=\"#\" class=\"next_end\" title=\"Last page\">Last&lt;/a>' +\n        '&lt;span class=\"pre_end_off\">First Off&lt;/span>' +\n        '&lt;span class=\"pre_off\">Prev Off&lt;/span>' +\n        '&lt;span class=\"next_off\">Next Off&lt;/span>' +\n        '&lt;span class=\"next_end_off\">Last Off&lt;/span>'\n    ),\n\n    /**\n     * pagination 을 rendering 한다.\n     * @return {View.Layout.Toolbar.Pagination} This object\n     */\n    render: function() {\n        this._destroyChildren();\n        this.$el.empty().html(this.template());\n        this._setPaginationInstance();\n        return this;\n    },\n\n    /**\n     * pagination instance 를 설정한다.\n     * @private\n     */\n    _setPaginationInstance: function() {\n        var PaginationClass = tui &amp;&amp; tui.component &amp;&amp; tui.component.Pagination,\n            pagination = this.toolbarModel.get('pagination');\n\n        if (!pagination &amp;&amp; PaginationClass) {\n            pagination = new PaginationClass({\n                itemCount: 1,\n                itemPerPage: 1,\n                pagePerPageList: 5,\n                isCenterAlign: true,\n                moveUnit: 'page',\n                $preOff: this.$el.find('.pre_off'),\n                $pre_endOff: this.$el.find('.pre_end_off'),\n                $nextOff: this.$el.find('.next_off'),\n                $lastOff: this.$el.find('.next_end_off')\n            }, this.$el);\n        }\n        this.toolbarModel.set('pagination', pagination);\n    }\n});\n\nmodule.exports = Pagination;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"