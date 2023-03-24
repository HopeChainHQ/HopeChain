package com.devwobcis.hopechain.screens

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.unit.sp
import com.devwobcis.hopechain.ui.theme.DarkColors
import com.devwobcis.hopechain.ui.theme.HopeChainTheme
import com.devwobcis.hopechain.ui.theme.LightColors

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen() {

    val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior(rememberTopAppBarState())
    val colorScheme = if (isSystemInDarkTheme()) DarkColors else LightColors

    HopeChainTheme {
        Scaffold(
            modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
            topBar = {
                LargeTopAppBar(
                    modifier = Modifier,
                    title = { Text(text = "What's around", fontSize = 28.sp) },
                    actions = {
//                        ProfilePicture(
//                            modifier = Modifier.padding(end = 16.dp),
//                            url = appViewModel.user.avatar,
//                            onClick = { onNavigateProfile(viewModel) })
                    },
                    scrollBehavior = scrollBehavior,
                    colors = TopAppBarDefaults.largeTopAppBarColors(scrolledContainerColor = colorScheme.background)
                )
            },
            content = {
                Column(modifier = Modifier.padding(it)) {

                }
            }
        )
    }
}