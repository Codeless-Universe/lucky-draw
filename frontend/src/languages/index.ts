/**
 * 注意：执行compile命令会重新生成本文件，所以请不要修改本文件
 */
import idMap from "./idMap"                                             // 语言ID映射文件
import { translate,VoerkaI18nScope  } from "@voerkai18n/runtime"
import defaultFormatters from "./formatters/en"  
import defaultMessages from "./en"  
import storage  from "./storage"



const messages = {
    'en' :  defaultMessages,
    'zh' : ()=>import("./zh"),
	'cht' : ()=>import("./cht")
}

const formatters = {
    'en' :  defaultFormatters,
    'zh' : ()=>import("./formatters/zh"),
	'cht' : ()=>import("./formatters/cht")
}

// 语言配置文件
const scopeSettings = {
    "languages": [
        {
            "name": "en",
            "title": "English",
            "default": true,
            "active": true
        },
        {
            "name": "zh",
            "title": "简体中文"
        },
        {
            "name": "cht",
            "title": "繁體中文"
        }
    ],
    "namespaces": {}
}

// 语言作用域
const scope = new VoerkaI18nScope({    
    id          : "code",                    // 当前作用域的id，自动取当前工程的package.json的name
    debug       : false,                            // 是否在控制台输出调试信息   
    idMap,                                          // 消息id映射列表  
    library     : false,                      // 开发库时设为true
    messages,                                       // 语言包
    formatters,                                     // 扩展自定义格式化器    
    storage,                                        // 语言配置存储器
    ...scopeSettings
}) 
// 翻译函数
const scopedTtranslate = translate.bind(scope) 
export { 
    scopedTtranslate as t, 
    scope as i18nScope
}