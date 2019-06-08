sap.ui.define([
	"sap/ui/base/Object"
], function (Object) {
	"use strict";

	return Object.extend("be.wl.PersonSkills.service.CoreService", {
		constructor: function (model) {
			Object.call(this);
			if (model) {
				this.setModel(model);
			}
		},
		setModel: function (model) {
			this.model = model;
		},
		odata: function (url) {
			var me = this;
			var core = {
				ajax: function (type, url, data, parameters) {
					var promise = new Promise(function (resolve, reject) {
						var args = [];
						var params = {};
						args.push(url);
						if (data) {
							args.push(data);
						}
						if (parameters) {
							params = parameters;
						}
						params.success = function (result, response) {
							resolve({
								data: result,
								response: response
							});
						};
						params.error = function (error) {
							reject(error);
						};
						args.push(params);
						me.model[type].apply(me.model, args);
					});
					return promise;
				}
			};

			return {
				'get': function (params) {
					return core.ajax('read', url, false, params);
				},
				'post': function (data, params) {
					return core.ajax('create', url, data, params);
				},
				'put': function (data, params) {
					return core.ajax('update', url, data, params);
				},
				'delete': function (params) {
					return core.ajax('remove', url, false, params);
				}
			};
		},
		http: function (url) {
			var core = {
				ajax: function (method, url, headers, args, mimetype) {
					var promise = new Promise(function (resolve, reject) {
						var client = new XMLHttpRequest();
						var uri = url;
						if (args && method === 'GET') {
							uri += '?';
							var argcount = 0;
							for (var key in args) {
								if (args.hasOwnProperty(key)) {
									if (argcount++) {
										uri += '&';
									}
									uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
								}
							}
						}
						if (args && (method === 'POST' || method === 'PUT')) {
							var data = {};
							for (var keyp in args) {
								if (args.hasOwnProperty(keyp)) {
									data[keyp] = args[keyp];
								}
							}
						}
						client.open(method, uri);
						
						if (method === 'POST' || method === 'PUT') {
							client.setRequestHeader("accept", "application/json");
							client.setRequestHeader("content-type", "application/json");
						}
						for (var keyh in headers) {
							if (headers.hasOwnProperty(keyh)) {
								client.setRequestHeader(keyh, headers[keyh]);
							}
						}
						if (data) {
							client.send(JSON.stringify(data));
						} else {
							client.send();
						}
						client.onload = function () {
							if (this.status == 200) {
								resolve(this.response);
							} else {
								reject(this.statusText);
							}
						};
						client.onerror = function () {
							reject(this.statusText);
						};
					});
					return promise;
				}
			};

			return {
				'get': function (headers, args) {
					return core.ajax('GET', url, headers, args);
				},
				'post': function (headers, args) {
					return core.ajax('POST', url, headers, args);
				},
				'put': function (headers, args) {
					return core.ajax('PUT', url, headers, args);
				},
				'delete': function (headers, args) {
					return core.ajax('DELETE', url, headers, args);
				}
			};
		}
	});
});