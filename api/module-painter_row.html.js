tui.util.defineNamespace("fedoc.content", {});
fedoc.content["module-painter_row.html"] = "<div id=\"main\" class=\"main\">\n\n\n\n\n<section>\n\n<header>\n    \n        \n            \n        \n            \n                <h2>painter/row</h2>\n            \n        \n    \n</header>\n\n<article>\n    \n    <div class=\"container-overview\">\n    \n        \n            <div class=\"description\"><p>Row Painter<br>성능 향상을 위해 Row Painter 를 위한 클래스 생성</p></div>\n        \n\n        \n            \n<div class=\"\">\n<dt>\n    \n        <h4 class=\"name\" id=\"module:painter/row\">\n            <span class=\"type-signature\"></span>new (require(\"painter/row\"))<span class=\"signature\">(options)</span><span class=\"type-signature\"></span>\n            \n                <div class=\"container-source method\">\n                    <code>file</code>,\n                    <code>line 22</code>\n                </div>\n            \n        </h4>\n\n        \n    \n</dt>\n<dd>\n\n    \n\n    \n        <h5>Extends:</h5>\n        \n\n\n    <ul>\n        <li><a href=\"module-base_painter.html\">module:base/painter</a></li>\n    </ul>\n\n\n    \n\n    \n\n    \n\n    \n    <div class=\"container-params\">\n        <div class=\"params\">\n\n<table class=\"params\">\n    <thead>\n    <tr>\n        \n        <th>Name</th>\n        \n\n        <th>Type</th>\n\n        \n\n        \n\n        <th class=\"last\">Description</th>\n    </tr>\n    </thead>\n\n    <tbody>\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>options</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">object</span>\n\n\n            \n            </td>\n\n            \n\n            \n\n            <td class=\"description last\"><p>Options</p>\n                <h6>Properties:</h6>\n                \n\n<table class=\"params\">\n    <thead>\n    <tr>\n        \n        <th>Name</th>\n        \n\n        <th>Type</th>\n\n        \n        <th>Attributes</th>\n        \n\n        \n        <th>Default</th>\n        \n\n        <th class=\"last\">Description</th>\n    </tr>\n    </thead>\n\n    <tbody>\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>whichSide</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">string</span>\n\n\n            \n            </td>\n\n            \n                <td class=\"attributes\">\n                \n                    &lt;optional><br>\n                \n\n                \n\n                \n                </td>\n            \n\n            \n                <td class=\"default\">\n                \n                    'R'\n                \n                </td>\n            \n\n            <td class=\"description last\"><p>어느 영역에 속하는 row 인지 여부. 'L|R' 중 하나를 지정한다.</p></td>\n        </tr>\n\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>collection</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">object</span>\n\n\n            \n            </td>\n\n            \n                <td class=\"attributes\">\n                \n\n                \n\n                \n                </td>\n            \n\n            \n                <td class=\"default\">\n                \n                </td>\n            \n\n            <td class=\"description last\"><p>change 를 감지할 collection 객체</p></td>\n        </tr>\n\n    \n    </tbody>\n</table>\n            </td>\n        </tr>\n\n    \n    </tbody>\n</table></div>\n    </div>\n    \n\n    \n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dd>\n</div>\n\n        \n            \n<div class=\"\">\n<dt>\n    \n</dt>\n<dd>\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dd>\n</div>\n\n        \n    \n    </div>\n    \n\n    \n\n    \n\n    \n\n     \n\n    \n\n    \n\n    \n    <div class=\"container-methods\">\n        <h3 class=\"subsection-title\">Methods</h3>\n\n        <dl>\n            \n<div class=\"tui-hidden\">\n<dt>\n    \n        <h4 class=\"name\" id=\"getEventHandlerInfo\">\n            <span class=\"type-signature\"></span>getEventHandlerInfo<span class=\"signature\">()</span><span class=\"type-signature\"> &rarr; {object}</span>\n            \n                <div class=\"container-source method\">\n                    <code>file</code>,\n                    <code>line 54</code>\n                </div>\n            \n        </h4>\n\n        \n    \n</dt>\n<dd>\n\n    \n    <div class=\"description\">\n        <p>이벤트 핸들러 정보를 반환한다.</p>\n    </div>\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n    <div class=\"container-returns\">\n        <div class=\"returns\">\n        <h5>Returns:</h5>\n        <div class=\"details\">\n        \n                \n<div class=\"param-desc\">\n    <p>Event handlers</p>\n</div>\n\n            \n        </div>\n        </div>\n    </div>\n    \n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    <dt class=\"inherited-from\">Inherited From:</dt>\n    <dd class=\"inherited-from\"><ul class=\"dummy\"><li>\n        <a href=\"module-base_painter.html#getEventHandlerInfo\">module:base/painter#getEventHandlerInfo</a>\n    </li></dd>\n    \n    -->\n\n    \n    <div class=\"container-inherits\">\n        <div class=\"inherits\">\n            <h5>Inherited From:</h5>\n            <div class=\"details\">\n            <div class=\"inherits-desc\">\n                <a href=\"module-base_painter.html#getEventHandlerInfo\">module:base/painter#getEventHandlerInfo</a>\n            </div>\n            </div>\n        </div>\n    </div>\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dd>\n</div>\n\n        \n            \n<div class=\"tui-hidden\">\n<dt>\n    \n        <h4 class=\"name\" id=\"getHtml\">\n            <span class=\"type-signature\"></span>getHtml<span class=\"signature\">(model)</span><span class=\"type-signature\"> &rarr; {string}</span>\n            \n                <div class=\"container-source method\">\n                    <code>file</code>,\n                    <code>line 76</code>\n                </div>\n            \n        </h4>\n\n        \n    \n</dt>\n<dd>\n\n    \n    <div class=\"description\">\n        <p>tr html 마크업을 반환한다.</p>\n    </div>\n    \n\n    \n\n    \n\n    \n\n    \n    <div class=\"container-params\">\n        <div class=\"params\">\n\n<table class=\"params\">\n    <thead>\n    <tr>\n        \n        <th>Name</th>\n        \n\n        <th>Type</th>\n\n        \n\n        \n\n        <th class=\"last\">Description</th>\n    </tr>\n    </thead>\n\n    <tbody>\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>model</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">object</span>\n\n\n            \n            </td>\n\n            \n\n            \n\n            <td class=\"description last\"><p>마크업을 생성할 모델 인스턴스</p></td>\n        </tr>\n\n    \n    </tbody>\n</table></div>\n    </div>\n    \n\n    \n    <div class=\"container-returns\">\n        <div class=\"returns\">\n        <h5>Returns:</h5>\n        <div class=\"details\">\n        \n                \n<div class=\"param-desc\">\n    <p>tr 마크업 문자열</p>\n</div>\n\n            \n        </div>\n        </div>\n    </div>\n    \n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dd>\n</div>\n\n        \n            \n<div class=\"tui-hidden\">\n<dt>\n    \n        <h4 class=\"name\" id=\"initializeEventHandler\">\n            <span class=\"type-signature\"></span>initializeEventHandler<span class=\"signature\">()</span><span class=\"type-signature\"></span>\n            \n                <div class=\"container-source method\">\n                    <code>file</code>,\n                    <code>line 33</code>\n                </div>\n            \n        </h4>\n\n        \n    \n</dt>\n<dd>\n\n    \n    <div class=\"description\">\n        <p>eventHandler 를 미리 parsing 하여 들고있는다.</p>\n    </div>\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    <dt class=\"inherited-from\">Inherited From:</dt>\n    <dd class=\"inherited-from\"><ul class=\"dummy\"><li>\n        <a href=\"module-base_painter.html#initializeEventHandler\">module:base/painter#initializeEventHandler</a>\n    </li></dd>\n    \n    -->\n\n    \n    <div class=\"container-inherits\">\n        <div class=\"inherits\">\n            <h5>Inherited From:</h5>\n            <div class=\"details\">\n            <div class=\"inherits-desc\">\n                <a href=\"module-base_painter.html#initializeEventHandler\">module:base/painter#initializeEventHandler</a>\n            </div>\n            </div>\n        </div>\n    </div>\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dd>\n</div>\n\n        \n            \n<div class=\"tui-hidden\">\n<dt>\n    \n        <h4 class=\"name\" id=\"onModelChange\">\n            <span class=\"type-signature\"></span>onModelChange<span class=\"signature\">(model, $tr)</span><span class=\"type-signature\"></span>\n            \n                <div class=\"container-source method\">\n                    <code>file</code>,\n                    <code>line 43</code>\n                </div>\n            \n        </h4>\n\n        \n    \n</dt>\n<dd>\n\n    \n    <div class=\"description\">\n        <p>model 변경 시 이벤트 핸들러</p>\n    </div>\n    \n\n    \n\n    \n\n    \n\n    \n    <div class=\"container-params\">\n        <div class=\"params\">\n\n<table class=\"params\">\n    <thead>\n    <tr>\n        \n        <th>Name</th>\n        \n\n        <th>Type</th>\n\n        \n\n        \n\n        <th class=\"last\">Description</th>\n    </tr>\n    </thead>\n\n    <tbody>\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>model</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">object</span>\n\n\n            \n            </td>\n\n            \n\n            \n\n            <td class=\"description last\"><p>변화가 일어난 모델 인스턴스</p></td>\n        </tr>\n\n    \n\n        <tr>\n            \n                <td class=\"name first\"><code>$tr</code></td>\n            \n\n            <td class=\"type\">\n            \n                \n<span class=\"param-type\">jQuery</span>\n\n\n            \n            </td>\n\n            \n\n            \n\n            <td class=\"description last\"><p>jquery object for tr element</p></td>\n        </tr>\n\n    \n    </tbody>\n</table></div>\n    </div>\n    \n\n    \n\n    \n\n\n<dl class=\"details\">\n\n    \n\n    \n\n    <!--\n    \n    -->\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n</dd>\n</div>\n\n        </dl>\n    </div>\n    \n\n    \n\n    \n</article>\n\n</section>\n\n\n\n</div>"