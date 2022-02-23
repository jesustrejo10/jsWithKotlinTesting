/*
 * Copyright © 2018-20 LiquidPlayer
 *
 * Released under the MIT license.
 * See https://github.com/LiquidPlayer/LiquidCore/LICENSE.md for terms.
 */

 /* Hello, World! */
 const {LiquidCore} = require('liquidcore')
 const {suma} = require('suma')
 const {subtraction} = require ('subtraction')
 const {product} = require ('product')

// A micro service will exit when it has nothing left to do.  So to
// avoid a premature exit, set an indefinite timer.  When we
// exit() later, the timer will get invalidated.
setInterval(()=>{}, 1000)


LiquidCore.on( 'sum', (inputNumbers) => {
    LiquidCore.emit( 'sumResult', { resultSum: suma(inputNumbers) } )
    process.exit(0)
})

LiquidCore.on( 'subtraction', (inputNumbers) => {
    LiquidCore.emit( 'subtractionResult', { resultSubtraction: subtraction(inputNumbers) } )
    process.exit(0)
})

LiquidCore.on( 'product', (inputNumbers) => {
      LiquidCore.emit( 'productResult', { resultProduct: product(inputNumbers) } )
      process.exit(0)
  })



LiquidCore.emit( 'ready' )