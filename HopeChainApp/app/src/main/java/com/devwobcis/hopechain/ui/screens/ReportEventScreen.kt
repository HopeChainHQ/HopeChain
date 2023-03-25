package com.devwobcis.hopechain.ui.screens

import android.graphics.Bitmap
import android.graphics.BitmapFactory
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
import com.devwobcis.hopechain.ui.components.ProgressDialog
import com.devwobcis.hopechain.ui.theme.DarkColors
import com.devwobcis.hopechain.ui.theme.HopeChainTheme
import com.devwobcis.hopechain.ui.theme.LightColors
import com.devwobcis.hopechain.ui.theme.SetNavBarsTheme
import com.squareup.picasso3.Picasso
import com.squareup.picasso3.compose.rememberPainter
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.io.File
import java.io.FileOutputStream

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ReportEventScreen(onNavigateSubmit: () -> Unit) {

    val context = LocalContext.current
    val picasso = remember { mutableStateOf(Picasso.Builder(context).build()) }

    val colorScheme = if (isSystemInDarkTheme()) DarkColors else LightColors

    var postMsg by remember { mutableStateOf("") }
    var showDialog by remember { mutableStateOf(false) }
    var imageCid by remember { mutableStateOf("--") }
    var imageUri by remember { mutableStateOf<Uri?>(null) }

    if (showDialog) {
        ProgressDialog(progressMsg = "IPFS: Uploading")
    }

    val imageCropLauncher = rememberLauncherForActivityResult(CropImageContract()) { result ->
        if (result.isSuccessful) {
            imageUri = result.uriContent

            CoroutineScope(Dispatchers.IO).launch {
                showDialog = true

                var fos: FileOutputStream? = null
                val file = File(context.filesDir, "${System.currentTimeMillis()}.png")
                try {
                    val ins = context.contentResolver.openInputStream(imageUri!!)
                    val bitmap = BitmapFactory.decodeStream(ins)
                    ins?.close()

                    fos = FileOutputStream(file)
                    bitmap.compress(Bitmap.CompressFormat.PNG, 100, fos)
                    bitmap.recycle()
                } catch (e: Exception) {
                    e.printStackTrace()
                } finally {
                    try {
                        fos?.close()
                    } catch (e: Exception) {
                        e.printStackTrace()
                    }
                }

//                val ipfsClient = IPFS(MultiAddress("/dnsaddr/2NUjQGe04I8KMlEzpbbpGS1TFeW:07a3b4cb9ab3e7b40ae50ea0e1ccb587@filecoin.infura.io/tcp/5001/https"))
//                val ipfsFile = NamedStreamable.FileWrapper(file)
//
//                var idx = 0
//                ipfsClient.add(ipfsFile).forEach { node ->
//                    Log.d("TAG", "ReportEventScreen: [$idx]: hash: ${node.hash.toBase58()}")
//                    idx++
//                }

//                val upload = InfuraIPFS().add.file(file)
//                Log.d("TAG", "ReportEventScreen: hash = ${upload.Hash}, name: ${upload.Name}")
                delay(2000)
                imageCid = ""
                showDialog = false
            }
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

                    Text(
                        modifier = Modifier
                            .padding(16.dp)
                            .align(Alignment.CenterHorizontally),
                        text = imageCid.ifEmpty { "QmX9Xv7GLx3XmiEomeGfc1EBj2Z5Fr2atzsAhYuFLzQb5c" },
                        fontSize = 12.sp
                    )

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

