"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/login/page",{

/***/ "(app-pages-browser)/./app/login/page.tsx":
/*!****************************!*\
  !*** ./app/login/page.tsx ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Login; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./components/ui/button.tsx\");\n/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ui/input */ \"(app-pages-browser)/./components/ui/input.tsx\");\n/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/ui/label */ \"(app-pages-browser)/./components/ui/label.tsx\");\n/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/ui/card */ \"(app-pages-browser)/./components/ui/card.tsx\");\n/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/services/api */ \"(app-pages-browser)/./services/api.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\nfunction Login() {\n    _s();\n    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        // Here you would typically send a request to your backend API\n        // For now, we'll just simulate a successful login\n        console.log(\"Login with:\", {\n            email,\n            password\n        });\n        try {\n            router.push(\"/dashboard\");\n            return;\n            const response = await (0,_services_api__WEBPACK_IMPORTED_MODULE_8__.post)(\"/api/login\", {\n                email,\n                password\n            });\n            if (response.status === 200) {\n                localStorage.setItem(\"jwt\", response.data.token);\n                router.push(\"/dashboard\");\n                return response.data;\n            } else {\n                throw new Error(\"Login failed\");\n            }\n            return response.data;\n        } catch (error) {\n            console.error(\"Error logging in:\", error);\n            throw error;\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex min-h-screen items-center justify-center bg-gray-100\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_7__.Card, {\n            className: \"w-full max-w-md\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_7__.CardHeader, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_7__.CardTitle, {\n                        className: \"text-2xl font-bold\",\n                        children: \"Login\"\n                    }, void 0, false, {\n                        fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n                        lineNumber: 46,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n                    lineNumber: 45,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                    onSubmit: handleSubmit,\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_7__.CardContent, {\n                            className: \"space-y-4\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"space-y-2\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_label__WEBPACK_IMPORTED_MODULE_6__.Label, {\n                                            htmlFor: \"email\",\n                                            children: \"Email\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n                                            lineNumber: 51,\n                                            columnNumber: 15\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_5__.Input, {\n                                            id: \"email\",\n                                            type: \"email\",\n                                            placeholder: \"Enter your email\",\n                                            value: email,\n                                            onChange: (e)=>setEmail(e.target.value),\n                                            required: true\n                                        }, void 0, false, {\n                                            fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n                                            lineNumber: 52,\n                                            columnNumber: 15\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n                                    lineNumber: 50,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"space-y-2\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_label__WEBPACK_IMPORTED_MODULE_6__.Label, {\n                                            htmlFor: \"password\",\n                                            children: \"Password\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n                                            lineNumber: 62,\n                                            columnNumber: 15\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_5__.Input, {\n                                            id: \"password\",\n                                            type: \"password\",\n                                            placeholder: \"Enter your password\",\n                                            value: password,\n                                            onChange: (e)=>setPassword(e.target.value),\n                                            required: true\n                                        }, void 0, false, {\n                                            fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n                                            lineNumber: 63,\n                                            columnNumber: 15\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n                                    lineNumber: 61,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n                            lineNumber: 49,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_7__.CardFooter, {\n                            className: \"flex flex-col space-y-4\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                                    type: \"submit\",\n                                    className: \"w-full\",\n                                    children: \"Login\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n                                    lineNumber: 74,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"text-sm text-gray-600\",\n                                    children: [\n                                        \"Don't have an account?\",\n                                        \" \",\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                            href: \"/signup\",\n                                            className: \"text-blue-600 hover:underline\",\n                                            children: \"Sign Up\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n                                            lineNumber: 77,\n                                            columnNumber: 15\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n                                    lineNumber: 75,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n                            lineNumber: 73,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n                    lineNumber: 48,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n            lineNumber: 44,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/mac/work/reactjs/bava/app/login/page.tsx\",\n        lineNumber: 43,\n        columnNumber: 5\n    }, this);\n}\n_s(Login, \"lnLPsXulL3oMypKJCpB5abnr2gw=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Login;\nvar _c;\n$RefreshReg$(_c, \"Login\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9sb2dpbi9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRWdDO0FBQ1c7QUFDZjtBQUNtQjtBQUNGO0FBQ0E7QUFDOEM7QUFDdEQ7QUFFdEIsU0FBU1k7O0lBQ3RCLE1BQU0sQ0FBQ0MsT0FBT0MsU0FBUyxHQUFHZCwrQ0FBUUEsQ0FBQztJQUNuQyxNQUFNLENBQUNlLFVBQVVDLFlBQVksR0FBR2hCLCtDQUFRQSxDQUFDO0lBQ3pDLE1BQU1pQixTQUFTaEIsMERBQVNBO0lBRXhCLE1BQU1pQixlQUFlLE9BQU9DO1FBQzFCQSxFQUFFQyxjQUFjO1FBQ2hCLDhEQUE4RDtRQUM5RCxrREFBa0Q7UUFDbERDLFFBQVFDLEdBQUcsQ0FBQyxlQUFlO1lBQUVUO1lBQU9FO1FBQVM7UUFFN0MsSUFBSTtZQUNGRSxPQUFPTSxJQUFJLENBQUM7WUFDWjtZQUNBLE1BQU1DLFdBQVcsTUFBTWIsbURBQUlBLENBQUMsY0FBYztnQkFBRUU7Z0JBQU9FO1lBQVM7WUFDNUQsSUFBSVMsU0FBU0MsTUFBTSxLQUFLLEtBQUs7Z0JBQzNCQyxhQUFhQyxPQUFPLENBQUMsT0FBT0gsU0FBU0ksSUFBSSxDQUFDQyxLQUFLO2dCQUMvQ1osT0FBT00sSUFBSSxDQUFDO2dCQUNaLE9BQU9DLFNBQVNJLElBQUk7WUFDdEIsT0FBTztnQkFDTCxNQUFNLElBQUlFLE1BQU07WUFDbEI7WUFDQSxPQUFPTixTQUFTSSxJQUFJO1FBQ3RCLEVBQUUsT0FBT0csT0FBTztZQUNkVixRQUFRVSxLQUFLLENBQUMscUJBQXFCQTtZQUNuQyxNQUFNQTtRQUNSO0lBRUY7SUFFQSxxQkFDRSw4REFBQ0M7UUFBSUMsV0FBVTtrQkFDYiw0RUFBQzNCLHFEQUFJQTtZQUFDMkIsV0FBVTs7OEJBQ2QsOERBQUN4QiwyREFBVUE7OEJBQ1QsNEVBQUNDLDBEQUFTQTt3QkFBQ3VCLFdBQVU7a0NBQXFCOzs7Ozs7Ozs7Ozs4QkFFNUMsOERBQUNDO29CQUFLQyxVQUFVakI7O3NDQUNkLDhEQUFDWCw0REFBV0E7NEJBQUMwQixXQUFVOzs4Q0FDckIsOERBQUNEO29DQUFJQyxXQUFVOztzREFDYiw4REFBQzVCLHVEQUFLQTs0Q0FBQytCLFNBQVE7c0RBQVE7Ozs7OztzREFDdkIsOERBQUNoQyx1REFBS0E7NENBQ0ppQyxJQUFHOzRDQUNIQyxNQUFLOzRDQUNMQyxhQUFZOzRDQUNaQyxPQUFPM0I7NENBQ1A0QixVQUFVLENBQUN0QixJQUFNTCxTQUFTSyxFQUFFdUIsTUFBTSxDQUFDRixLQUFLOzRDQUN4Q0csUUFBUTs7Ozs7Ozs7Ozs7OzhDQUdaLDhEQUFDWDtvQ0FBSUMsV0FBVTs7c0RBQ2IsOERBQUM1Qix1REFBS0E7NENBQUMrQixTQUFRO3NEQUFXOzs7Ozs7c0RBQzFCLDhEQUFDaEMsdURBQUtBOzRDQUNKaUMsSUFBRzs0Q0FDSEMsTUFBSzs0Q0FDTEMsYUFBWTs0Q0FDWkMsT0FBT3pCOzRDQUNQMEIsVUFBVSxDQUFDdEIsSUFBTUgsWUFBWUcsRUFBRXVCLE1BQU0sQ0FBQ0YsS0FBSzs0Q0FDM0NHLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FJZCw4REFBQ25DLDJEQUFVQTs0QkFBQ3lCLFdBQVU7OzhDQUNwQiw4REFBQzlCLHlEQUFNQTtvQ0FBQ21DLE1BQUs7b0NBQVNMLFdBQVU7OENBQVM7Ozs7Ozs4Q0FDekMsOERBQUNXO29DQUFFWCxXQUFVOzt3Q0FBd0I7d0NBQ1o7c0RBQ3ZCLDhEQUFDL0IsaURBQUlBOzRDQUFDMkMsTUFBSzs0Q0FBVVosV0FBVTtzREFBZ0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUzdFO0dBMUV3QnJCOztRQUdQWCxzREFBU0E7OztLQUhGVyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvbG9naW4vcGFnZS50c3g/NDkwYSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcblxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvbmF2aWdhdGlvbidcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluaydcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ0AvY29tcG9uZW50cy91aS9idXR0b24nXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gJ0AvY29tcG9uZW50cy91aS9pbnB1dCdcbmltcG9ydCB7IExhYmVsIH0gZnJvbSAnQC9jb21wb25lbnRzL3VpL2xhYmVsJ1xuaW1wb3J0IHsgQ2FyZCwgQ2FyZENvbnRlbnQsIENhcmRGb290ZXIsIENhcmRIZWFkZXIsIENhcmRUaXRsZSB9IGZyb20gJ0AvY29tcG9uZW50cy91aS9jYXJkJ1xuaW1wb3J0IHsgcG9zdCB9IGZyb20gJ0Avc2VydmljZXMvYXBpJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMb2dpbigpIHtcbiAgY29uc3QgW2VtYWlsLCBzZXRFbWFpbF0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3QgW3Bhc3N3b3JkLCBzZXRQYXNzd29yZF0gPSB1c2VTdGF0ZSgnJylcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgLy8gSGVyZSB5b3Ugd291bGQgdHlwaWNhbGx5IHNlbmQgYSByZXF1ZXN0IHRvIHlvdXIgYmFja2VuZCBBUElcbiAgICAvLyBGb3Igbm93LCB3ZSdsbCBqdXN0IHNpbXVsYXRlIGEgc3VjY2Vzc2Z1bCBsb2dpblxuICAgIGNvbnNvbGUubG9nKCdMb2dpbiB3aXRoOicsIHsgZW1haWwsIHBhc3N3b3JkIH0pXG5cbiAgICB0cnkge1xuICAgICAgcm91dGVyLnB1c2goJy9kYXNoYm9hcmQnKVxuICAgICAgcmV0dXJuO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBwb3N0KCcvYXBpL2xvZ2luJywgeyBlbWFpbCwgcGFzc3dvcmQgfSlcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnand0JywgcmVzcG9uc2UuZGF0YS50b2tlbilcbiAgICAgICAgcm91dGVyLnB1c2goJy9kYXNoYm9hcmQnKVxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMb2dpbiBmYWlsZWQnKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGFcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9nZ2luZyBpbjonLCBlcnJvcilcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBtaW4taC1zY3JlZW4gaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWdyYXktMTAwXCI+XG4gICAgICA8Q2FyZCBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctbWRcIj5cbiAgICAgICAgPENhcmRIZWFkZXI+XG4gICAgICAgICAgPENhcmRUaXRsZSBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGRcIj5Mb2dpbjwvQ2FyZFRpdGxlPlxuICAgICAgICA8L0NhcmRIZWFkZXI+XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxuICAgICAgICAgIDxDYXJkQ29udGVudCBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwiZW1haWxcIj5FbWFpbDwvTGFiZWw+XG4gICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgIGlkPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIGVtYWlsXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZW1haWx9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPExhYmVsIGh0bWxGb3I9XCJwYXNzd29yZFwiPlBhc3N3b3JkPC9MYWJlbD5cbiAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgaWQ9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtwYXNzd29yZH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9DYXJkQ29udGVudD5cbiAgICAgICAgICA8Q2FyZEZvb3RlciBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwidy1mdWxsXCI+TG9naW48L0J1dHRvbj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1ncmF5LTYwMFwiPlxuICAgICAgICAgICAgICBEb24ndCBoYXZlIGFuIGFjY291bnQ/eycgJ31cbiAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9zaWdudXBcIiBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNjAwIGhvdmVyOnVuZGVybGluZVwiPlxuICAgICAgICAgICAgICAgIFNpZ24gVXBcbiAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvQ2FyZEZvb3Rlcj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9DYXJkPlxuICAgIDwvZGl2PlxuICApXG59XG5cbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZVJvdXRlciIsIkxpbmsiLCJCdXR0b24iLCJJbnB1dCIsIkxhYmVsIiwiQ2FyZCIsIkNhcmRDb250ZW50IiwiQ2FyZEZvb3RlciIsIkNhcmRIZWFkZXIiLCJDYXJkVGl0bGUiLCJwb3N0IiwiTG9naW4iLCJlbWFpbCIsInNldEVtYWlsIiwicGFzc3dvcmQiLCJzZXRQYXNzd29yZCIsInJvdXRlciIsImhhbmRsZVN1Ym1pdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnNvbGUiLCJsb2ciLCJwdXNoIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZGF0YSIsInRva2VuIiwiRXJyb3IiLCJlcnJvciIsImRpdiIsImNsYXNzTmFtZSIsImZvcm0iLCJvblN1Ym1pdCIsImh0bWxGb3IiLCJpZCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInZhbHVlIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJyZXF1aXJlZCIsInAiLCJocmVmIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/login/page.tsx\n"));

/***/ })

});