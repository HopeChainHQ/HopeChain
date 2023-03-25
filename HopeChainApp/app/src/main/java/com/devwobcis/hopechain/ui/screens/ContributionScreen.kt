package com.devwobcis.hopechain.ui.screens

import android.widget.Toast
import androidx.compose.foundation.Image
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.MonetizationOn
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import com.devwobcis.hopechain.R
import com.devwobcis.hopechain.data.OrgEntity
import com.devwobcis.hopechain.ui.components.InputAmountDialog
import com.devwobcis.hopechain.ui.components.ProgressDialog
import com.devwobcis.hopechain.ui.theme.DarkColors
import com.devwobcis.hopechain.ui.theme.HopeChainTheme
import com.devwobcis.hopechain.ui.theme.LightColors
import com.devwobcis.hopechain.ui.theme.SetNavBarsTheme
import com.squareup.picasso3.Picasso
import com.squareup.picasso3.compose.rememberPainter
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class ContributionScreenViewModel : ViewModel() {
    val orgList = mutableStateListOf(
        OrgEntity(
            picUrl = "https://pbs.twimg.com/profile_images/1212968213023059968/hm8ifooA_400x400.jpg",
            place = "Goonj",
            description = "NGO, Delhi"
        ),
        OrgEntity(
            picUrl = "https://images.squarespace-cdn.com/content/v1/54ad90ffe4b0cb1588d58ef6/1554635712041-XC1R20MR7ZYQ4KO44YV7/Action+Aid?format=1000w",
            place = "ActionAid",
            description = "Association, India"
        ),
        OrgEntity(
            picUrl = "https://cfstatic.give.do/9d3726ee-dcf8-4d76-b028-99d1b3834eef.png",
            place = "CARE",
            description = "One of the top NGO, India"
        ),
        OrgEntity(
            picUrl = "https://seedsvo.org/wp-content/uploads/elementor/thumbs/SEEDS-FPCL-2023-01-q33mshufpi5f2ru2zgk42uo5mf39nptn05gwoos7ss.png",
            place = "SEEDS India",
            description = "Sustainable Environment and Ecological Development, Delhi"
        )
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ContributionScreen(viewModel: ContributionScreenViewModel = hiltViewModel()) {

    val context = LocalContext.current
    val colorScheme = if (isSystemInDarkTheme()) DarkColors else LightColors
    val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior(rememberTopAppBarState())
    val scope = rememberCoroutineScope()

    var fundProgress by remember { mutableStateOf(0.29f) }
    val showAmountDialog = remember { mutableStateOf(false) }
    val showProgressDialog = remember { mutableStateOf(false) }

    HopeChainTheme {
        SetNavBarsTheme()

        Scaffold(
            modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
            topBar = {
                LargeTopAppBar(
                    modifier = Modifier,
                    title = { Text(text = "Funds", fontSize = 28.sp) },
                    actions = {},
                    scrollBehavior = scrollBehavior,
                    colors = TopAppBarDefaults.largeTopAppBarColors(scrolledContainerColor = colorScheme.background)
                )
            },
            content = {
                if (showAmountDialog.value) {
                    InputAmountDialog(showAmountDialog = showAmountDialog) { fl ->
                        scope.launch {
                            showProgressDialog.value = true
                            delay(2000)
                            fundProgress += (fl / 100f)
                            showProgressDialog.value = false
                            Toast.makeText(context, "Successfully donated !", Toast.LENGTH_SHORT).show()
                        }
                    }
                }

                if (showProgressDialog.value) {
                    ProgressDialog(progressMsg = "Transacting")
                }

                Column(
                    modifier = Modifier
                        .padding(it)
                ) {
                    LinearProgressIndicator(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp)
                            .height(24.dp),
                        progress = fundProgress,
                        strokeCap = StrokeCap.Round
                    )

                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp)
                    ) {
                        Text(
                            text = "${String.format("%.2f", fundProgress * 100)} ETH",
                            color = colorScheme.primary
                        )
                        Spacer(modifier = Modifier.weight(1f))
                        Text(text = "100.00 ETH", color = colorScheme.primary)
                    }

                    Text(modifier = Modifier.padding(16.dp), text = "Organizations", fontSize = 20.sp)

                    LazyColumn(
                        modifier = Modifier.fillMaxHeight(),
                        contentPadding = PaddingValues(bottom = 72.dp, start = 16.dp, end = 16.dp)
                    ) {
                        items(viewModel.orgList.size) { idx ->
                            OrgCard(viewModel.orgList[idx], showAmountDialog)
                        }
                    }
                }
            }
        )
    }
}

@Composable
fun OrgCard(orgEntity: OrgEntity, showAmountDialog: MutableState<Boolean>) {
    val context = LocalContext.current
    val picasso = remember { mutableStateOf(Picasso.Builder(context).build()) }
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(bottom = 8.dp), shape = RoundedCornerShape(24.dp)
    ) {
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            Column(
                modifier = Modifier
                    .weight(1f)
                    .padding(start = 16.dp, top = 16.dp, bottom = 16.dp, end = 8.dp)
            ) {
                Image(
                    painter = picasso.value.rememberPainter(request = {
                        it.load(orgEntity.picUrl).placeholder(R.drawable.outline_image_24)
                            .error(R.drawable.outline_image_24)
                    }, key = orgEntity.picUrl),
                    contentDescription = "",
                    modifier = Modifier
                        .align(Alignment.CenterHorizontally)
                        .clip(RoundedCornerShape(16.dp))
                        .fillMaxWidth()
                        .heightIn(0.dp, 148.dp),
                    contentScale = ContentScale.Crop
                )
            }

            Column(
                modifier = Modifier
                    .weight(1f)
                    .padding(top = 16.dp, end = 16.dp, bottom = 16.dp, start = 8.dp)
            ) {
                Text(text = orgEntity.place, fontSize = 16.sp, fontWeight = FontWeight.SemiBold)
                Text(text = orgEntity.description, fontSize = 14.sp)
                Button(
                    modifier = Modifier.fillMaxWidth(),
                    onClick = { showAmountDialog.value = true }
                ) {
                    Icon(imageVector = Icons.Default.MonetizationOn, contentDescription = "")
                    Spacer(modifier = Modifier.padding(4.dp))
                    Text(text = "Donate")
                }
            }
        }
    }
}
