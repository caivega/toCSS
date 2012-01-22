/*!
 * This file contains the implementation of
 * Array.prototype.map() and Array.prototype.filter()
 * and only required for older browsers like IE8-
 * @author: Alexander Guinness <monolithed@gmail.com>
 * @version: 1.0
 * @license MIT
 * @date: Tue Feb 21 01:00:00 2010
*/

(function($) {
	'use strict';
	/**
	 * @param {Function} fn is Callback-function
	 * @param {Object} Object to use as this when executing callback
	 * @link {forEach}
	 * @return {Array} Creates a new array with the results of calling a provided function on every element in this array
	 * @edition ECMA-262 5th Edition, 15.4.4.19
	*/
	if(!$.map) {
		$.map = function(fn, object) {
			var i = -1, length = this.length, array = [];
			while(i++ < length) {
				if(i in this)
					array.push(fn.call(object, this[i], i, this));
			}
			return array;
		};
	}

	/**
	 * @param {Function} fn is Callback-function
	 * @param {Object} Object to use as this when executing callback
	 * @link {forEach}
	 * @return {Array} Creates a new array with all elements that pass the test implemented by the provided function
	 * @edition ECMA-262 5th Edition, 15.4.4.20
	*/

	if(!$.filter) {
		$.filter = function(fn, object) {
			var length = this.length, array = [], i = -1;
			while(i++ < length) {
				if(i in this && fn.call(object, this[i], i, this))
					array.push(this[i]);
			}
			return array;
		};
	}
})(Array.prototype);