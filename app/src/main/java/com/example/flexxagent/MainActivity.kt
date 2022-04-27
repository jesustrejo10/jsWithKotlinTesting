package com.example.flexxagent

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.AttributeSet
import android.view.View
import android.widget.Toast
import androidx.core.text.isDigitsOnly
import androidx.lifecycle.ViewModelProvider
import com.example.flexxagent.databinding.ActivityMainBinding
import org.liquidplayer.service.MicroService

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var viewModel: MainActivityViewModel
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        addListenersToJsButton();
    }

    override fun onCreateView(
        parent: View?,
        name: String,
        context: Context,
        attrs: AttributeSet
    ): View? {
        viewModel = ViewModelProvider(this).get(MainActivityViewModel::class.java)
        return super.onCreateView(parent, name, context, attrs)
    }

    private fun addListenersToJsButton() {
        binding.jsProduct.setOnClickListener {
           if(prepareTheInput())
            madeProduct()
        }

        binding.sumJsButton.setOnClickListener {
            if(prepareTheInput())
                madeSum()
        }
        binding.subtractionJsButton.setOnClickListener {
            if(prepareTheInput())
                madeSubtraction()
        }
        binding.connectFlexxJs.setOnClickListener{
            connectToFlexxAgent()
        }
    }

    private fun prepareTheInput(): Boolean {
        val inputOfUserB = binding.inputB.text.toString()
        val inputOfUserA = binding.inputA.text.toString()
        if (formatInputIsValid(inputOfUserB) && formatInputIsValid(inputOfUserA)) {
            viewModel.addNumberToCalculator(inputOfUserA.toInt())
            viewModel.addNumberToCalculator(inputOfUserB.toInt())
            return true
        }else
        {
            Toast.makeText(this, "The inputs are not valid !!!", Toast.LENGTH_SHORT).show()
            return false
        }
    }

    private fun madeProduct() {
        val readyListener = MicroService.EventListener { service, _, _ ->
            service.emit("product", viewModel.valuesOfCalculator.value)
        }
        val productResultListener = MicroService.EventListener { _, _, jsonObject ->
            val message = jsonObject.getString("resultProduct")
            viewModel.initCalculatorNumbers()
            runOnUiThread { binding.resultOfOperation.text = message }
        }
        val startListener =
            MicroService.ServiceStartListener { service ->
                service.addEventListener("ready", readyListener)
                service.addEventListener("productResult", productResultListener)
            }
        val uri = MicroService.Bundle(this, "example")
        val service = MicroService(
            this, uri,
            startListener
        )
        service.start()
    }

    private fun madeSubtraction() {
        val readyListener = MicroService.EventListener { service, _, _ ->
            service.emit("subtraction", viewModel.valuesOfCalculator.value)
        }
        val subtractionResultListener = MicroService.EventListener { _, _, jsonObject ->
            val message = jsonObject.getString("resultSubtraction")
            viewModel.initCalculatorNumbers()
            runOnUiThread { binding.resultOfOperation.text = message }
        }
        val startListener =
            MicroService.ServiceStartListener { service ->
                service.addEventListener("ready", readyListener)
                service.addEventListener("subtractionResult", subtractionResultListener)
            }
        val uri = MicroService.Bundle(this, "example")
        val service = MicroService(
            this, uri,
            startListener
        )
        service.start()
    }

    private fun madeSum() {
        val readyListener = MicroService.EventListener { service, _, _ ->
            service.emit("sum", viewModel.valuesOfCalculator.value)
        }
        val sumResultListener = MicroService.EventListener { _, _, jsonObject ->
            val message = jsonObject.getString("resultSum")
            viewModel.initCalculatorNumbers()
            runOnUiThread { binding.resultOfOperation.text = message }
        }

        val callbackSumResponse = MicroService.EventListener{_,_,jsonObject ->
            println("XML to service Bus")

        }
        val startListener =
            MicroService.ServiceStartListener { service ->
                service.addEventListener("ready", readyListener)
                service.addEventListener("sumResult", sumResultListener)
                service.addEventListener("sumResponse",callbackSumResponse)
            }
        val uri = MicroService.Bundle(this, "example")
        val service = MicroService(
            this, uri,
            startListener
        )
        service.start()

    }

    private fun formatInputIsValid(inputOfUser: String): Boolean {
    if (inputOfUser.isDigitsOnly())
        return true
    else{
//        showToast()
        return false
    }

    }


  private fun connectToFlexxAgent(){

        val readyListener = MicroService.EventListener { service, _, _ ->
            service.emit("init_flexx_agent")
        }
        val flexxTestListener = MicroService.EventListener { _, _, jsonObject ->
            val message = jsonObject.getString("resultTestFlexx")
            println(message)
        }

        val callbackSumResponse = MicroService.EventListener{_,_,jsonObject ->
            println("XML to service Bus")

        }
        val startListener =
            MicroService.ServiceStartListener { service ->
                service.addEventListener("ready", readyListener)
                service.addEventListener("flexTest", flexxTestListener)

            }
        val uri = MicroService.Bundle(this, "example")
        val service = MicroService(
            this, uri,
            startListener
        )
        service.start()


    }
}
