/*
 * Copyright © 2018-20 LiquidPlayer
 *
 * Released under the MIT license.
 * See https://github.com/LiquidPlayer/LiquidCore/LICENSE.md for terms.
 */

 /* Hello, World! */
 const {LiquidCore} = require('liquidcore')
// const {suma} = require('suma')
// const {subtraction} = require ('subtraction')
// const {product} = require ('product')
// const {flexxAgent} = require('flexx_agent')
// const {outputMessage} = require('output_messages')

// A micro service will exit when it has nothing left to do.  So to
// avoid a premature exit, set an indefinite timer.  When we
// exit() later, the timer will get invalidated.
setInterval(()=>{}, 1000)



 class Rectangulo {
    constructor(x,y){
        this.x = x
        this.y = y
        this.pintarLados()
    }

    pintarLados(){
        console.log(this.x + this.y)
    }

  }

  class A {
      constructor () {
          this.B = class {
              echo () {
                  console.log('I am B class');
              }
          }
      }
      echo () {
          this.b = new this.B;
          this.b.echo();
      }
  }



LiquidCore.on( 'init_flexx_agent', () => {
    var welcome= new Rectangulo(5,3);
    var aExternal = new A
    LiquidCore.emit( 'flexxTest', { resultTestFlexx: aExternal.echo()} )

    process.exit(0)
})


LiquidCore.on( 'sum', (inputNumbers) => {

    LiquidCore.emit( 'sumResult', { resultSum:Rectangulo().pintarLados() } )
    LiquidCore.emit('sumResponse', { })

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



