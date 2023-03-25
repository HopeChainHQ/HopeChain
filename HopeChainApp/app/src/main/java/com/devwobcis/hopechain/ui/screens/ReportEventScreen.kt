package com.devwobcis.hopechain.ui.screens

import android.net.Uri
import android.widget.Toast
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Done
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.canhub.cropper.CropImageContract
import com.canhub.cropper.CropImageContractOptions
import com.canhub.cropper.CropImageOptions
import com.devwobcis.hopechain.R
import com.devwobcis.hopechain.ui.theme.DarkColors
import com.devwobcis.hopechain.ui.theme.HopeChainTheme
import com.devwobcis.hopechain.ui.theme.LightColors
import com.devwobcis.hopechain.ui.theme.SetNavBarsTheme
import com.squareup.picasso3.Picasso
import com.squareup.picasso3.compose.rememberPainter

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ReportEventScreen(onNavigateSubmit: () -> Unit) {

    val context = LocalContext.current
    val picasso = remember { mutableStateOf(Picasso.Builder(context).build()) }

    val colorScheme = if (isSystemInDarkTheme()) DarkColors else LightColors
    var postMsg by remember { mutableStateOf("") }
    var imageUri by remember { mutableStateOf<Uri?>(null) }

    val imageCropLauncher = rememberLauncherForActivityResult(CropImageContract()) { result ->
        if (result.isSuccessful) {
            imageUri = result.uriContent
        }
    }
    val launcher = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        val cropOptions = CropImageContractOptions(uri, CropImageOptions())
        cropOptions.setAspectRatio(1, 1)
        imageCropLauncher.launch(cropOptions)
    }

    HopeChainTheme {
        SetNavBarsTheme()
        Scaffold(
            modifier = Modifier,
            topBar = {
                TopAppBar(
                    modifier = Modifier,
                    title = {
                        Text(
                            text = "Report Event",
                            fontSize = 28.sp,
                            fontWeight = FontWeight.Bold
                        )
                    },
                    actions = {},
                    colors = TopAppBarDefaults.largeTopAppBarColors(scrolledContainerColor = colorScheme.background)
                )
            },
            content = {
                Column(
                    modifier = Modifier
                        .padding(it)
                        .padding(16.dp)
                ) {
                    Image(
                        painter = picasso.value.rememberPainter(request = { req ->
                            req.load(imageUri).placeholder(R.drawable.outline_image_24)
                                .error(R.drawable.outline_image_24)
                        }, key = imageUri.toString()),
                        contentDescription = "",
                        modifier = Modifier
                            .align(Alignment.CenterHorizontally)
                            .clip(RoundedCornerShape(16.dp))
                            .fillMaxWidth(0.6f)
                            .heightIn(0.dp, 208.dp)
                            .clickable(true, onClick = { launcher.launch("image/*") }),
                        contentScale = ContentScale.Crop
                    )

                    Spacer(modifier = Modifier.padding(16.dp))

                    OutlinedTextField(
                        modifier = Modifier
                            .fillMaxWidth()
                            .fillMaxHeight()
                            .padding(bottom = 72.dp)
                            .imePadding(),
                        value = postMsg,
                        onValueChange = { ch -> postMsg = ch },
                        shape = RoundedCornerShape(24.dp),
                        label = { Text(text = "Message") },
                        keyboardOptions = KeyboardOptions.Default.copy(keyboardType = KeyboardType.Text),
                        colors = TextFieldDefaults.outlinedTextFieldColors(
                            disabledTextColor = contentColorFor(backgroundColor = colorScheme.background),
                            disabledLabelColor = contentColorFor(backgroundColor = colorScheme.background)
                        )
                    )
                }
            },
            floatingActionButton = {
                ExtendedFloatingActionButton(
                    text = { Text(text = "Submit", fontSize = 15.sp, textAlign = TextAlign.Center) },
                    icon = { Icon(imageVector = Icons.Outlined.Done, contentDescription = "") },
                    onClick = {
                        Toast.makeText(context, "Submitted", Toast.LENGTH_SHORT).show()
                        onNavigateSubmit()
                    },
                    shape = RoundedCornerShape(24.dp),
                    modifier = Modifier.padding(),
                    containerColor = colorScheme.primary
                )
            }
        )
    }
}

