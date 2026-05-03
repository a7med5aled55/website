import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'screens/home_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
    ),
  );
  runApp(const TaskManagerApp());
}

class TaskManagerApp extends StatelessWidget {
  const TaskManagerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TaskFlow',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        colorScheme: ColorScheme.dark(
          primary: const Color(0xFF6C63FF),
          secondary: const Color(0xFF03DAC6),
          surface: const Color(0xFF1E1E2E),
          background: const Color(0xFF12121F),
          onPrimary: Colors.white,
          onSecondary: Colors.black,
          onSurface: Colors.white,
          onBackground: Colors.white,
          tertiary: const Color(0xFFFF6584),
        ),
        scaffoldBackgroundColor: const Color(0xFF12121F),
        fontFamily: 'SF Pro Display',
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.transparent,
          elevation: 0,
          centerTitle: false,
        ),
      ),
      home: const HomeScreen(),
    );
  }
}
