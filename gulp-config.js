/*/
 ///////////////////////////////////////////////////////////////////////////
 Module: config
 Created Date: 16 May 2016
 Author: mcattaneo

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2016.
 //////////////////////////////////////////////////////////////////////////////
 */

module.exports = (function () {

    return {
        files: [
            'js/Array/Array.js',
            'js/String/String.js',
            'js/Object/Object.js',
            'js/Element/Element.js',
            'js/Collection/Collection.js',
            'js/Need/Need.js',
            'js/Bus/Bus.js',
            'js/navigator/navigator.js',
            'js/Component/Component.js'
        ],
        tests: ['js/**/*Spec.js'],
        mocks: ['mocks/userAgentStrings.js'],
        vendors: ['node_modules/jquery/dist/jquery.js']
    };

})();
