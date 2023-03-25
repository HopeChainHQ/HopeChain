package com.devwobcis.hopechain.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.MonetizationOn
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
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
import com.devwobcis.hopechain.ui.theme.DarkColors
import com.devwobcis.hopechain.ui.theme.HopeChainTheme
import com.devwobcis.hopechain.ui.theme.LightColors
import com.devwobcis.hopechain.ui.theme.SetNavBarsTheme
import com.squareup.picasso3.Picasso
import com.squareup.picasso3.compose.rememberPainter

class ContributionScreenViewModel : ViewModel() {
    val orgList = mutableStateListOf(
        OrgEntity(
            picUrl = "https://pbs.twimg.com/profile_images/1212968213023059968/hm8ifooA_400x400.jpg",
            place = "Goonj",
            description = "NGO, Delhi"
        ),
        OrgEntity(
            picUrl = "https://media.npr.org/assets/img/2015/08/28/57328261_h31510915_wide-db41bf5c8a6cdd01b18c0de23117826f89067943.jpg?s=800&c=15&f=webp",
            place = "USA",
            description = "Hurricane Katrina (2005)"
        ),
        OrgEntity(
            picUrl = "https://static.toiimg.com/thumb/msid-55071172,imgsize-199052,width-400,resizemode-4/55071172.jpg",
            place = "India",
            description = "Tsunami (2004)"
        ),
        OrgEntity(
            picUrl = "https://cdn.mos.cms.futurecdn.net/TxezD8yGmxQNL8tYaX8u2e-970-80.jpg.webp",
            place = "Philippines",
            description = "Mount Pinatubo Eruption (1991)"
        )
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ContributionScreen(viewModel: ContributionScreenViewModel = hiltViewModel()) {

    val colorScheme = if (isSystemInDarkTheme()) DarkColors else LightColors
    val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior(rememberTopAppBarState())

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
                Column(
                    modifier = Modifier
                        .padding(it)
                ) {
                    LinearProgressIndicator(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp)
                            .height(24.dp),
                        progress = 0.69f,
                        strokeCap = StrokeCap.Round
                    )

                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp)
                    ) {
                        Text(text = "69.00 ETH", color = colorScheme.primary)
                        Spacer(modifier = Modifier.weight(1f))
                        Text(text = "100.00 ETH", color = colorScheme.primary)
                    }

                    Text(modifier = Modifier.padding(16.dp), text = "Organizations", fontSize = 20.sp)

                    LazyColumn(
                        modifier = Modifier.fillMaxHeight(),
                        contentPadding = PaddingValues(bottom = 72.dp, start = 16.dp, end = 16.dp)
                    ) {
                        items(viewModel.orgList.size) { idx ->
                            OrgCard(viewModel.orgList[idx])
                        }
                    }
                }
            }
        )
    }
}

@Composable
fun OrgCard(orgEntity: OrgEntity) {
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
                    onClick = { }
                ) {
                    Icon(imageVector = Icons.Default.MonetizationOn, contentDescription = "")
                    Spacer(modifier = Modifier.padding(4.dp))
                    Text(text = "Donate")
                }
            }
        }
    }
}
