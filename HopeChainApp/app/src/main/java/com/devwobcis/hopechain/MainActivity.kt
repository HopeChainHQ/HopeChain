package com.devwobcis.hopechain

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.LocalOnBackPressedDispatcherOwner
import androidx.activity.compose.setContent
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.material.Surface
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.devwobcis.hopechain.ui.screens.ContributionScreen
import com.devwobcis.hopechain.ui.screens.HomeScreen
import com.devwobcis.hopechain.ui.screens.ReportEventScreen
import com.devwobcis.hopechain.ui.theme.DarkColors
import com.devwobcis.hopechain.ui.theme.HopeChainTheme
import com.devwobcis.hopechain.ui.theme.LightColors
import com.devwobcis.hopechain.ui.theme.SetNavBarsTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {

            val colorScheme = if (isSystemInDarkTheme()) DarkColors else LightColors
            val localBackPressed = LocalOnBackPressedDispatcherOwner.current
            val navController = rememberNavController()
            HopeChainTheme {
                SetNavBarsTheme()

                Surface(
                    modifier = Modifier
                        .fillMaxSize()
                        .imePadding()
                ) {
                    NavHost(
                        modifier = Modifier
                            .imePadding()
                            .systemBarsPadding(),
                        navController = navController,
                        startDestination = "home"
                    ) {
                        composable("home") {
                            HomeScreen(onNavigateContributeListener = {
                                navController.navigate("contribute")
                            }, onNavigateReportEventListener = {
                                navController.navigate("report_event")
                            })
                        }

                        composable("contribute") {
                            ContributionScreen()
                        }

                        composable("report_event") {
                            ReportEventScreen(onNavigateSubmit = {
                                localBackPressed?.onBackPressedDispatcher?.onBackPressed()
                            })
                        }
                    }
                }
            }
        }
    }
}
