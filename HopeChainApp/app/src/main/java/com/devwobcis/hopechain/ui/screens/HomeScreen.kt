package com.devwobcis.hopechain.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.MonetizationOn
import androidx.compose.material.icons.outlined.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import com.devwobcis.hopechain.R
import com.devwobcis.hopechain.data.EventEntity
import com.devwobcis.hopechain.ui.theme.DarkColors
import com.devwobcis.hopechain.ui.theme.HopeChainTheme
import com.devwobcis.hopechain.ui.theme.LightColors
import com.devwobcis.hopechain.ui.theme.SetNavBarsTheme
import com.squareup.picasso3.Picasso
import com.squareup.picasso3.compose.rememberPainter

class HomeScreenViewModel : ViewModel() {
    val eventList = mutableStateListOf(
        EventEntity(
            picUrl = "https://cdn.theatlantic.com/thumbor/bFe7Mlw85RMyS2r2BZQsSkCeAOs=/1500x996/media/img/photo/2016/03/5-years-since-the-2011-great-east-j/q01_RTR2JTXO/original.jpg",
            place = "Japan",
            description = "Tsunami (2011)"
        ),
        EventEntity(
            picUrl = "https://media.npr.org/assets/img/2015/08/28/57328261_h31510915_wide-db41bf5c8a6cdd01b18c0de23117826f89067943.jpg?s=800&c=15&f=webp",
            place = "USA",
            description = "Hurricane Katrina (2005)"
        ),
        EventEntity(
            picUrl = "https://static.toiimg.com/thumb/msid-55071172,imgsize-199052,width-400,resizemode-4/55071172.jpg",
            place = "India",
            description = "Tsunami (2004)"
        ),
        EventEntity(
            picUrl = "https://cdn.mos.cms.futurecdn.net/TxezD8yGmxQNL8tYaX8u2e-970-80.jpg.webp",
            place = "Philippines",
            description = "Mount Pinatubo Eruption (1991)"
        )
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(viewModel: HomeScreenViewModel = hiltViewModel()) {

    val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior(rememberTopAppBarState())
    val colorScheme = if (isSystemInDarkTheme()) DarkColors else LightColors

    HopeChainTheme {
        SetNavBarsTheme()
        Scaffold(
            modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
            topBar = {
                LargeTopAppBar(
                    modifier = Modifier,
                    title = {
                        Text(
                            text = "HopeCoin",
                            fontSize = 28.sp,
                            fontWeight = FontWeight.Bold
                        )
                    },
                    actions = {},
                    scrollBehavior = scrollBehavior,
                    colors = TopAppBarDefaults.largeTopAppBarColors(scrolledContainerColor = colorScheme.background)
                )
            },
            content = {
                Column(modifier = Modifier.padding(it)) {
                    EventList(viewModel.eventList)
                }
            },
            floatingActionButton = {
                ExtendedFloatingActionButton(
                    text = { Text(text = "Report Event", fontSize = 15.sp, textAlign = TextAlign.Center) },
                    icon = { Icon(imageVector = Icons.Outlined.Warning, contentDescription = "") },
                    onClick = { },
                    shape = RoundedCornerShape(24.dp),
                    modifier = Modifier.padding(),
                    containerColor = colorScheme.primary
                )
            }
        )
    }
}

@Composable
fun EventList(eventList: SnapshotStateList<EventEntity>) {
    LazyColumn(
        modifier = Modifier.fillMaxHeight(),
        contentPadding = PaddingValues(bottom = 72.dp, start = 16.dp, end = 16.dp)
    ) {
        items(eventList.size) { idx ->
            EventCard(eventList[idx])
        }
    }
}

@Composable
fun EventCard(event: EventEntity) {
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
                        it.load(event.picUrl).placeholder(R.drawable.outline_image_24)
                            .error(R.drawable.outline_image_24)
                    }, key = event.picUrl),
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
                Text(text = event.place, fontSize = 16.sp, fontWeight = FontWeight.SemiBold)
                Text(text = event.description, fontSize = 14.sp)
                OutlinedButton(
                    modifier = Modifier.fillMaxWidth(),
                    onClick = { /*TODO*/ }
                ) {
                    Icon(imageVector = Icons.Default.MonetizationOn, contentDescription = "")
                    Spacer(modifier = Modifier.padding(4.dp))
                    Text(text = "Contribute")
                }
            }
        }
    }
}
