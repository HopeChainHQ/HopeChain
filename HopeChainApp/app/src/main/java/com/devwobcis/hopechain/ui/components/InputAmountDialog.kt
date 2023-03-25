package com.devwobcis.hopechain.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import com.devwobcis.hopechain.ui.theme.DarkColors
import com.devwobcis.hopechain.ui.theme.LightColors

@Composable
fun InputAmountDialog(showAmountDialog: MutableState<Boolean>, onClick: (additional: Float) -> Unit) {
    val colorScheme = if (isSystemInDarkTheme()) DarkColors else LightColors
    var amount by remember { mutableStateOf("") }

    Dialog(onDismissRequest = { showAmountDialog.value = false }, DialogProperties()) {
        Box(
            modifier = Modifier
                .padding(16.dp)
                .clip(RoundedCornerShape(24.dp))
                .background(colorScheme.background)
        ) {
            Column(
                modifier = Modifier
                    .padding(16.dp)
                    .fillMaxWidth()
            ) {
                Text(
                    "Enter Amount\nMATIC",
                    fontSize = 16.sp,
                    modifier = Modifier.align(Alignment.CenterHorizontally),
                    fontWeight = FontWeight.SemiBold,
                    textAlign = TextAlign.Center
                )

                OutlinedTextField(
                    modifier = Modifier
                        .align(Alignment.CenterHorizontally)
                        .padding(top = 16.dp),
                    value = amount,
                    onValueChange = { amount = it },
                    shape = RoundedCornerShape(24.dp),
                    placeholder = {
                        Text(
                            modifier = Modifier
                                .fillMaxWidth()
                                .align(Alignment.CenterHorizontally),
                            text = "00.00",
                            fontSize = 36.sp,
                            textAlign = TextAlign.Center
                        )
                    },
                    singleLine = true,
                    keyboardOptions = KeyboardOptions.Default.copy(keyboardType = KeyboardType.Number),
                    textStyle = TextStyle.Default.copy(fontSize = 36.sp, textAlign = TextAlign.Center)
                )

                Button(
                    onClick = {
                        showAmountDialog.value = false
                        onClick(amount.toFloatOrNull() ?: 0.0f)
                    },
                    modifier = Modifier
                        .padding(top = 16.dp)
                        .align(Alignment.CenterHorizontally),
                    enabled = amount.isNotEmpty() && ((amount.toFloatOrNull() ?: 0.0f) < 100)
                ) {
                    Text(text = "Pay", fontSize = 14.sp)
                }
            }
        }
    }
}
