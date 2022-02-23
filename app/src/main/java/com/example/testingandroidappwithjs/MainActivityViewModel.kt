package com.example.testingandroidappwithjs

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import org.json.JSONArray

class MainActivityViewModel: ViewModel() {

   private val _valuesOfCalculator = MutableLiveData<JSONArray>()
    val valuesOfCalculator: LiveData<JSONArray>
        get() = _valuesOfCalculator

    init {
        initCalculatorNumbers()
    }

     fun initCalculatorNumbers() {
        _valuesOfCalculator.postValue(JSONArray())
        _valuesOfCalculator.value?.put(0)
    }

    fun addNumberToCalculator(InputOfUser:Number){
        _valuesOfCalculator.value?.put(InputOfUser)
    }
}
