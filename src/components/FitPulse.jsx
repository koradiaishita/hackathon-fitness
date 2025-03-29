import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Activity,
  TrendingUp,
  Zap,
  Star,
  Clock,
  Plus,
  BarChart2,
  Calendar,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Award,
  Heart,
  User,
  Sun,
  Moon,
  FileText,
  Droplet,
  Flame,
  Apple,
  Coffee,
  Target,
  Dumbbell,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const FitPulse = () => {
  // State management
  const [activeTab, setActiveTab] = useState("daily");
  const [chartType, setChartType] = useState("line");
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");
  const [darkMode, setDarkMode] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedWorkoutType, setSelectedWorkoutType] = useState("All");

  // Form state for adding workout
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [newWorkoutDuration, setNewWorkoutDuration] = useState(30);
  const [newWorkoutCalories, setNewWorkoutCalories] = useState(200);
  const [newWorkoutType, setNewWorkoutType] = useState("Cardio");

  // Mock data for steps tracking
  const weeklyStepsData = [
    {
      day: "Mon",
      steps: 8432,
      target: 10000,
      calories: 320,
      activeMinutes: 42,
    },
    {
      day: "Tue",
      steps: 6218,
      target: 10000,
      calories: 280,
      activeMinutes: 36,
    },
    {
      day: "Wed",
      steps: 11453,
      target: 10000,
      calories: 410,
      activeMinutes: 58,
    },
    {
      day: "Thu",
      steps: 9271,
      target: 10000,
      calories: 365,
      activeMinutes: 47,
    },
    {
      day: "Fri",
      steps: 10842,
      target: 10000,
      calories: 390,
      activeMinutes: 52,
    },
    {
      day: "Sat",
      steps: 12763,
      target: 10000,
      calories: 450,
      activeMinutes: 67,
    },
    {
      day: "Sun",
      steps: 7936,
      target: 10000,
      calories: 310,
      activeMinutes: 40,
    },
  ];

  // Heart rate data
  const heartRateData = [
    { time: "6AM", rate: 62 },
    { time: "8AM", rate: 88 },
    { time: "10AM", rate: 75 },
    { time: "12PM", rate: 91 },
    { time: "2PM", rate: 82 },
    { time: "4PM", rate: 110 },
    { time: "6PM", rate: 130 },
    { time: "8PM", rate: 93 },
    { time: "10PM", rate: 72 },
  ];

  // Sleep data
  const sleepData = [
    { day: "Mon", deep: 2.1, light: 4.3, rem: 1.5, awake: 0.3 },
    { day: "Tue", deep: 1.8, light: 4.1, rem: 1.3, awake: 0.5 },
    { day: "Wed", deep: 2.3, light: 4.5, rem: 1.7, awake: 0.2 },
    { day: "Thu", deep: 1.7, light: 3.9, rem: 1.4, awake: 0.4 },
    { day: "Fri", deep: 2.0, light: 4.2, rem: 1.6, awake: 0.3 },
    { day: "Sat", deep: 2.5, light: 4.8, rem: 1.9, awake: 0.2 },
    { day: "Sun", deep: 2.2, light: 4.4, rem: 1.8, awake: 0.4 },
  ];

  // Initial workout data
  const initialWorkoutData = [
    {
      id: 1,
      name: "Morning Run",
      type: "Cardio",
      duration: 45,
      calories: 420,
      date: "2025-03-28",
      completed: true,
      favorite: true,
      color: "#FF5252",
    },
    {
      id: 2,
      name: "Strength Training",
      type: "Strength",
      duration: 60,
      calories: 380,
      date: "2025-03-28",
      completed: true,
      favorite: false,
      color: "#7C4DFF",
    },
    {
      id: 3,
      name: "Yoga Session",
      type: "Flexibility",
      duration: 30,
      calories: 150,
      date: "2025-03-27",
      completed: true,
      favorite: true,
      color: "#00BFA5",
    },
    {
      id: 4,
      name: "HIIT Circuit",
      type: "Cardio",
      duration: 25,
      calories: 320,
      date: "2025-03-26",
      completed: true,
      favorite: false,
      color: "#FF9800",
    },
  ];

  const [workouts, setWorkouts] = useState(initialWorkoutData);

  // Nutrition data
  const nutritionData = {
    calories: { consumed: 1840, goal: 2200, remaining: 360 },
    protein: { consumed: 95, goal: 120, unit: "g" },
    carbs: { consumed: 210, goal: 250, unit: "g" },
    fat: { consumed: 60, goal: 73, unit: "g" },
    water: { consumed: 1.8, goal: 2.5, unit: "L" },
  };

  // Meal data
  const meals = [
    {
      name: "Breakfast",
      time: "7:30 AM",
      calories: 480,
      items: [
        {
          name: "Oatmeal with berries",
          calories: 320,
          protein: 12,
          carbs: 54,
          fat: 6,
        },
        { name: "Greek yogurt", calories: 120, protein: 15, carbs: 8, fat: 3 },
        { name: "Coffee", calories: 40, protein: 0, carbs: 2, fat: 2 },
      ],
    },
    {
      name: "Lunch",
      time: "12:15 PM",
      calories: 610,
      items: [
        {
          name: "Grilled chicken salad",
          calories: 450,
          protein: 35,
          carbs: 28,
          fat: 22,
        },
        {
          name: "Whole grain bread",
          calories: 120,
          protein: 5,
          carbs: 20,
          fat: 2,
        },
        { name: "Apple", calories: 40, protein: 0, carbs: 10, fat: 0 },
      ],
    },
    {
      name: "Snack",
      time: "3:30 PM",
      calories: 220,
      items: [
        {
          name: "Protein shake",
          calories: 150,
          protein: 25,
          carbs: 10,
          fat: 2,
        },
        { name: "Banana", calories: 70, protein: 1, carbs: 16, fat: 0 },
      ],
    },
    {
      name: "Dinner",
      time: "7:00 PM",
      calories: 530,
      items: [
        {
          name: "Grilled salmon",
          calories: 280,
          protein: 32,
          carbs: 0,
          fat: 16,
        },
        {
          name: "Roasted vegetables",
          calories: 150,
          protein: 4,
          carbs: 24,
          fat: 5,
        },
        { name: "Quinoa", calories: 100, protein: 4, carbs: 17, fat: 2 },
      ],
    },
  ];

  // Goal data
  const fitnessGoals = [
    {
      id: 1,
      name: "Reach 10,000 steps daily",
      category: "Activity",
      target: "10,000 steps",
      deadline: "Daily",
      progress: 85,
      status: "On Track",
      color: "#FF5252",
    },
    {
      id: 2,
      name: "Lose 10 pounds",
      category: "Weight",
      target: "10 lbs",
      deadline: "June 30, 2025",
      progress: 40,
      status: "On Track",
      color: "#7C4DFF",
    },
    {
      id: 3,
      name: "Complete 20 workouts this month",
      category: "Workout",
      target: "20 workouts",
      deadline: "Monthly",
      progress: 65,
      status: "On Track",
      color: "#00BFA5",
    },
    {
      id: 4,
      name: "Drink 2.5L water daily",
      category: "Nutrition",
      target: "2.5 liters",
      deadline: "Daily",
      progress: 72,
      status: "On Track",
      color: "#2196F3",
    },
  ];

  const workoutTypes = [
    "All",
    "Cardio",
    "Strength",
    "Flexibility",
    "HIIT",
    "Sports",
    "Other",
  ];

  // Toggle favorites
  const toggleFavorite = (id) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === id
          ? { ...workout, favorite: !workout.favorite }
          : workout,
      ),
    );
  };

  // Add new workout
  const addNewWorkout = () => {
    if (newWorkoutName && newWorkoutDuration > 0 && newWorkoutCalories > 0) {
      const colorOptions = [
        "#FF5252",
        "#7C4DFF",
        "#00BFA5",
        "#FF9800",
        "#2196F3",
        "#607D8B",
        "#8BC34A",
      ];
      const randomColor =
        colorOptions[Math.floor(Math.random() * colorOptions.length)];

      const today = new Date().toISOString().split("T")[0];

      const newWorkout = {
        id: workouts.length + 1,
        name: newWorkoutName,
        type: newWorkoutType,
        duration: parseInt(newWorkoutDuration),
        calories: parseInt(newWorkoutCalories),
        date: today,
        completed: false,
        favorite: false,
        color: randomColor,
      };

      setWorkouts([...workouts, newWorkout]);
      setShowAddDialog(false);
      setNewWorkoutName("");
      setNewWorkoutDuration(30);
      setNewWorkoutCalories(200);
      setNewWorkoutType("Cardio");
    }
  };

  // Filter workouts by type
  const getFilteredWorkouts = () => {
    if (selectedWorkoutType === "All") return workouts;
    return workouts.filter((workout) => workout.type === selectedWorkoutType);
  };

  // Toggle workout completion
  const toggleWorkoutCompletion = (id) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === id
          ? { ...workout, completed: !workout.completed }
          : workout,
      ),
    );
  };

  // Calculate daily stats
  const getDailyStats = () => {
    // Get today's data (last item in the weekly data)
    const today = weeklyStepsData[weeklyStepsData.length - 1];

    // Sum up calories from completed workouts today
    const todayStr = new Date().toISOString().split("T")[0];
    const workoutCalories = workouts
      .filter((w) => w.date === todayStr && w.completed)
      .reduce((total, w) => total + w.calories, 0);

    return {
      steps: today.steps,
      stepTarget: today.target,
      stepPercentage: Math.round((today.steps / today.target) * 100),
      activeMinutes: today.activeMinutes,
      activeTarget: 60,
      activePercentage: Math.round((today.activeMinutes / 60) * 100),
      caloriesBurned: today.calories + workoutCalories,
      calorieTarget: 500,
      caloriePercentage: Math.round(
        ((today.calories + workoutCalories) / 500) * 100,
      ),
    };
  };

  const dailyStats = getDailyStats();

  // Calculate averages
  const calculateWeeklyAverage = (metric) => {
    return Math.round(
      weeklyStepsData.reduce((sum, day) => sum + day[metric], 0) / 7,
    );
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* App Header */}
      <header className="app-header">
        <div className="logo-container">
          <div className="logo">
            <Activity size={28} />
            <h1>FitPulse</h1>
          </div>
          <p className="tagline">Track your fitness, amplify your results</p>
        </div>

        <div className="header-actions">
          <button className="icon-button">
            <Bell size={20} />
          </button>
          <button className="icon-button">
            <Search size={20} />
          </button>
          <button
            className="icon-button"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="user-profile">
            <img
              src="/api/placeholder/32/32"
              alt="User avatar"
              className="avatar"
            />
            <span>Jordan</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="main-nav">
        <button
          className={`nav-item ${activeTab === "daily" ? "active" : ""}`}
          onClick={() => setActiveTab("daily")}
        >
          <Activity size={20} />
          <span>Daily Stats</span>
        </button>
        <button
          className={`nav-item ${activeTab === "workouts" ? "active" : ""}`}
          onClick={() => setActiveTab("workouts")}
        >
          <Dumbbell size={20} />
          <span>Workouts</span>
        </button>
        <button
          className={`nav-item ${activeTab === "nutrition" ? "active" : ""}`}
          onClick={() => setActiveTab("nutrition")}
        >
          <Apple size={20} />
          <span>Nutrition</span>
        </button>
        <button
          className={`nav-item ${activeTab === "goals" ? "active" : ""}`}
          onClick={() => setActiveTab("goals")}
        >
          <Target size={20} />
          <span>Goals</span>
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Daily Stats Tab */}
        {activeTab === "daily" && (
          <div className="content-container">
            <div className="section-header">
              <div className="title-area">
                <Activity size={24} className="section-icon" />
                <h2>Your Daily Stats</h2>
              </div>
              <div className="header-controls">
                <div className="timeframe-selector">
                  <button
                    className={`timeframe-button ${selectedTimeframe === "day" ? "active" : ""}`}
                    onClick={() => setSelectedTimeframe("day")}
                  >
                    Day
                  </button>
                  <button
                    className={`timeframe-button ${selectedTimeframe === "week" ? "active" : ""}`}
                    onClick={() => setSelectedTimeframe("week")}
                  >
                    Week
                  </button>
                  <button
                    className={`timeframe-button ${selectedTimeframe === "month" ? "active" : ""}`}
                    onClick={() => setSelectedTimeframe("month")}
                  >
                    Month
                  </button>
                </div>
              </div>
            </div>

            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-header">
                  <TrendingUp size={20} className="stat-icon positive" />
                  <h3>Steps</h3>
                </div>
                <div className="stat-value">
                  {dailyStats.steps.toLocaleString()}
                </div>
                <div className="stat-target">
                  {dailyStats.stepTarget.toLocaleString()} daily goal
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${Math.min(dailyStats.stepPercentage, 100)}%`,
                    }}
                  ></div>
                </div>
                <div className="stat-percentage">
                  {dailyStats.stepPercentage}%
                </div>
                <div className="stat-comparison positive">
                  <ArrowUp size={14} />
                  <span>
                    {Math.round(
                      dailyStats.steps - calculateWeeklyAverage("steps"),
                    )}{" "}
                    from avg
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <Flame size={20} className="stat-icon accent" />
                  <h3>Calories</h3>
                </div>
                <div className="stat-value">
                  {dailyStats.caloriesBurned.toLocaleString()}
                </div>
                <div className="stat-target">
                  {dailyStats.calorieTarget.toLocaleString()} daily goal
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar accent"
                    style={{
                      width: `${Math.min(dailyStats.caloriePercentage, 100)}%`,
                    }}
                  ></div>
                </div>
                <div className="stat-percentage">
                  {dailyStats.caloriePercentage}%
                </div>
                <div className="stat-comparison positive">
                  <ArrowUp size={14} />
                  <span>
                    {Math.round(
                      dailyStats.caloriesBurned -
                        calculateWeeklyAverage("calories"),
                    )}{" "}
                    from avg
                  </span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <Clock size={20} className="stat-icon neutral" />
                  <h3>Active Minutes</h3>
                </div>
                <div className="stat-value">{dailyStats.activeMinutes}</div>
                <div className="stat-target">
                  {dailyStats.activeTarget} daily goal
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar neutral"
                    style={{
                      width: `${Math.min(dailyStats.activePercentage, 100)}%`,
                    }}
                  ></div>
                </div>
                <div className="stat-percentage">
                  {dailyStats.activePercentage}%
                </div>
                <div className="stat-comparison positive">
                  <ArrowUp size={14} />
                  <span>
                    {Math.round(
                      dailyStats.activeMinutes -
                        calculateWeeklyAverage("activeMinutes"),
                    )}{" "}
                    from avg
                  </span>
                </div>
              </div>
            </div>

            <div className="chart-container">
              <div className="chart-header">
                <h3>Weekly Step Count</h3>
                <div className="chart-controls">
                  <button
                    className={`chart-type-button ${chartType === "line" ? "active" : ""}`}
                    onClick={() => setChartType("line")}
                  >
                    Line
                  </button>
                  <button
                    className={`chart-type-button ${chartType === "bar" ? "active" : ""}`}
                    onClick={() => setChartType("bar")}
                  >
                    Bar
                  </button>
                </div>
              </div>

              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                  {chartType === "line" ? (
                    <LineChart
                      data={weeklyStepsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={darkMode ? "#444" : "#ddd"}
                      />
                      <XAxis
                        dataKey="day"
                        stroke={darkMode ? "#bbb" : "#666"}
                      />
                      <YAxis
                        stroke={darkMode ? "#bbb" : "#666"}
                        domain={[0, 15000]}
                        ticks={[0, 5000, 10000, 15000]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? "#333" : "#fff",
                          border: `1px solid ${darkMode ? "#555" : "#ddd"}`,
                          color: darkMode ? "#eee" : "#333",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="steps"
                        stroke="#00BFA5"
                        strokeWidth={3}
                        dot={{ r: 6, fill: "#00BFA5" }}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#FF5252"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </LineChart>
                  ) : (
                    <BarChart
                      data={weeklyStepsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={darkMode ? "#444" : "#ddd"}
                      />
                      <XAxis
                        dataKey="day"
                        stroke={darkMode ? "#bbb" : "#666"}
                      />
                      <YAxis
                        stroke={darkMode ? "#bbb" : "#666"}
                        domain={[0, 15000]}
                        ticks={[0, 5000, 10000, 15000]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? "#333" : "#fff",
                          border: `1px solid ${darkMode ? "#555" : "#ddd"}`,
                          color: darkMode ? "#eee" : "#333",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="steps"
                        fill="#00BFA5"
                        radius={[4, 4, 0, 0]}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#FF5252"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            <div className="charts-grid">
              <div className="chart-container">
                <div className="chart-header">
                  <h3>Heart Rate</h3>
                </div>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      data={heartRateData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={darkMode ? "#444" : "#ddd"}
                      />
                      <XAxis
                        dataKey="time"
                        stroke={darkMode ? "#bbb" : "#666"}
                      />
                      <YAxis
                        stroke={darkMode ? "#bbb" : "#666"}
                        domain={[40, 160]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? "#333" : "#fff",
                          border: `1px solid ${darkMode ? "#555" : "#ddd"}`,
                          color: darkMode ? "#eee" : "#333",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#FF5252"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#FF5252" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-container">
                <div className="chart-header">
                  <h3>Sleep Analysis</h3>
                </div>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                      data={sleepData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                      barGap={0}
                      barCategoryGap="10%"
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={darkMode ? "#444" : "#ddd"}
                      />
                      <XAxis
                        dataKey="day"
                        stroke={darkMode ? "#bbb" : "#666"}
                      />
                      <YAxis
                        stroke={darkMode ? "#bbb" : "#666"}
                        label={{
                          value: "Hours",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? "#333" : "#fff",
                          border: `1px solid ${darkMode ? "#555" : "#ddd"}`,
                          color: darkMode ? "#eee" : "#333",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="deep"
                        stackId="a"
                        fill="#3F51B5"
                        name="Deep"
                      />
                      <Bar
                        dataKey="light"
                        stackId="a"
                        fill="#7986CB"
                        name="Light"
                      />
                      <Bar
                        dataKey="rem"
                        stackId="a"
                        fill="#2196F3"
                        name="REM"
                      />
                      <Bar
                        dataKey="awake"
                        stackId="a"
                        fill="#90CAF9"
                        name="Awake"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workouts Tab */}
        {activeTab === "workouts" && (
          <div className="content-container">
            <div className="section-header">
              <div className="title-area">
                <Dumbbell size={24} className="section-icon" />
                <h2>Workouts</h2>
              </div>
              <div className="header-controls">
                <button
                  className="filter-button"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <BarChart2 size={18} />
                  <span>Filter</span>
                </button>
                <button
                  className="primary-button"
                  onClick={() => setShowAddDialog(true)}
                >
                  <Plus size={18} />
                  <span>Add Workout</span>
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="filters-container">
                <div className="filter-group">
                  <label>Workout Type:</label>
                  <div className="type-filters">
                    {workoutTypes.map((type) => (
                      <button
                        key={type}
                        className={`type-filter ${selectedWorkoutType === type ? "active" : ""}`}
                        onClick={() => setSelectedWorkoutType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="workouts-container">
              {getFilteredWorkouts().map((workout) => (
                <div className="workout-card" key={workout.id}>
                  <div
                    className="workout-header"
                    style={{ backgroundColor: `${workout.color}22` }}
                  >
                    <h3 className="workout-title">{workout.name}</h3>
                    <button
                      className={`favorite-button ${workout.favorite ? "active" : ""}`}
                      onClick={() => toggleFavorite(workout.id)}
                    >
                      <Star size={18} />
                    </button>
                  </div>

                  <div className="workout-info">
                    <div className="workout-type">
                      <Dumbbell size={16} />
                      <span>{workout.type}</span>
                    </div>

                    <div className="workout-stats">
                      <div className="stat">
                        <Clock size={16} />
                        <span>{workout.duration} min</span>
                      </div>
                      <div className="stat">
                        <Flame size={16} />
                        <span>{workout.calories} cal</span>
                      </div>
                    </div>

                    <div className="workout-date">
                      <Calendar size={16} />
                      <span>
                        {new Date(workout.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="workout-actions">
                      <button
                        className={`complete-button ${workout.completed ? "completed" : ""}`}
                        onClick={() => toggleWorkoutCompletion(workout.id)}
                      >
                        {workout.completed ? "Completed" : "Mark Complete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Workout Dialog */}
            {showAddDialog && (
              <div className="dialog-overlay">
                <div className="dialog">
                  <div className="dialog-header">
                    <h3>Add New Workout</h3>
                    <button
                      className="close-button"
                      onClick={() => setShowAddDialog(false)}
                    >
                      ×
                    </button>
                  </div>

                  <div className="dialog-content">
                    <div className="form-group">
                      <label>Workout Name:</label>
                      <input
                        type="text"
                        value={newWorkoutName}
                        onChange={(e) => setNewWorkoutName(e.target.value)}
                        placeholder="E.g., Morning Run, HIIT Session"
                      />
                    </div>

                    <div className="form-group">
                      <label>Workout Type:</label>
                      <select
                        value={newWorkoutType}
                        onChange={(e) => setNewWorkoutType(e.target.value)}
                      >
                        {workoutTypes.slice(1).map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-row">
                      <div className="form-group half">
                        <label>Duration (minutes):</label>
                        <input
                          type="number"
                          value={newWorkoutDuration}
                          onChange={(e) =>
                            setNewWorkoutDuration(e.target.value)
                          }
                          min="1"
                        />
                      </div>

                      <div className="form-group half">
                        <label>Calories Burned:</label>
                        <input
                          type="number"
                          value={newWorkoutCalories}
                          onChange={(e) =>
                            setNewWorkoutCalories(e.target.value)
                          }
                          min="1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="dialog-footer">
                    <button
                      className="secondary-button"
                      onClick={() => setShowAddDialog(false)}
                    >
                      Cancel
                    </button>
                    <button className="primary-button" onClick={addNewWorkout}>
                      Add Workout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Nutrition Tab */}
        {activeTab === "nutrition" && (
          <div className="content-container">
            <div className="section-header">
              <div className="title-area">
                <Apple size={24} className="section-icon" />
                <h2>Nutrition Tracker</h2>
              </div>
              <div className="header-controls">
                <button className="primary-button">
                  <Plus size={18} />
                  <span>Add Meal</span>
                </button>
              </div>
            </div>

            <div className="nutrition-overview">
              <div className="nutrition-summary">
                <div className="calorie-card">
                  <div className="calorie-header">
                    <h3>Daily Calories</h3>
                    <span className="date">March 29, 2025</span>
                  </div>

                  <div className="calorie-chart">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: "Consumed",
                              value: nutritionData.calories.consumed,
                            },
                            {
                              name: "Remaining",
                              value: nutritionData.calories.remaining,
                            },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="#00BFA5" />
                          <Cell fill={darkMode ? "#333" : "#eee"} />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="calorie-center">
                      <div className="consumed">
                        {nutritionData.calories.consumed}
                      </div>
                      <div className="goal">
                        of {nutritionData.calories.goal}
                      </div>
                    </div>
                  </div>

                  <div className="calorie-info">
                    <div className="info-item">
                      <div className="info-label">Consumed</div>
                      <div className="info-value">
                        {nutritionData.calories.consumed}
                      </div>
                    </div>
                    <div className="info-divider"></div>
                    <div className="info-item">
                      <div className="info-label">Remaining</div>
                      <div className="info-value">
                        {nutritionData.calories.remaining}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="macros-container">
                  <h3>Macros & Hydration</h3>

                  <div className="macro-item">
                    <div className="macro-info">
                      <div className="macro-name">Protein</div>
                      <div className="macro-values">
                        <span className="consumed">
                          {nutritionData.protein.consumed}
                          {nutritionData.protein.unit}
                        </span>
                        <span className="goal">
                          / {nutritionData.protein.goal}
                          {nutritionData.protein.unit}
                        </span>
                      </div>
                    </div>
                    <div className="macro-bar-container">
                      <div
                        className="macro-bar protein"
                        style={{
                          width: `${Math.min((nutritionData.protein.consumed / nutritionData.protein.goal) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="macro-item">
                    <div className="macro-info">
                      <div className="macro-name">Carbs</div>
                      <div className="macro-values">
                        <span className="consumed">
                          {nutritionData.carbs.consumed}
                          {nutritionData.carbs.unit}
                        </span>
                        <span className="goal">
                          / {nutritionData.carbs.goal}
                          {nutritionData.carbs.unit}
                        </span>
                      </div>
                    </div>
                    <div className="macro-bar-container">
                      <div
                        className="macro-bar carbs"
                        style={{
                          width: `${Math.min((nutritionData.carbs.consumed / nutritionData.carbs.goal) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="macro-item">
                    <div className="macro-info">
                      <div className="macro-name">Fat</div>
                      <div className="macro-values">
                        <span className="consumed">
                          {nutritionData.fat.consumed}
                          {nutritionData.fat.unit}
                        </span>
                        <span className="goal">
                          / {nutritionData.fat.goal}
                          {nutritionData.fat.unit}
                        </span>
                      </div>
                    </div>
                    <div className="macro-bar-container">
                      <div
                        className="macro-bar fat"
                        style={{
                          width: `${Math.min((nutritionData.fat.consumed / nutritionData.fat.goal) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="macro-item">
                    <div className="macro-info">
                      <div className="macro-name">Water</div>
                      <div className="macro-values">
                        <span className="consumed">
                          {nutritionData.water.consumed}
                          {nutritionData.water.unit}
                        </span>
                        <span className="goal">
                          / {nutritionData.water.goal}
                          {nutritionData.water.unit}
                        </span>
                      </div>
                    </div>
                    <div className="macro-bar-container">
                      <div
                        className="macro-bar water"
                        style={{
                          width: `${Math.min((nutritionData.water.consumed / nutritionData.water.goal) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="meal-log">
                <h3>Today's Meals</h3>

                <div className="meals-list">
                  {meals.map((meal, index) => (
                    <div className="meal-item" key={index}>
                      <div className="meal-header">
                        <div className="meal-title">
                          <div className="meal-name">{meal.name}</div>
                          <div className="meal-time">{meal.time}</div>
                        </div>
                        <div className="meal-calories">{meal.calories} cal</div>
                      </div>

                      <div className="meal-foods">
                        {meal.items.map((item, foodIndex) => (
                          <div className="food-item" key={foodIndex}>
                            <div className="food-name">{item.name}</div>
                            <div className="food-nutrients">
                              <span className="nutrient">
                                {item.calories} cal
                              </span>
                              <span className="nutrient">
                                {item.protein}g protein
                              </span>
                              <span className="nutrient">
                                {item.carbs}g carbs
                              </span>
                              <span className="nutrient">{item.fat}g fat</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="meal-actions">
                        <button className="meal-action">Edit</button>
                        <button className="meal-action">Duplicate</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Goals Tab */}
        {activeTab === "goals" && (
          <div className="content-container">
            <div className="section-header">
              <div className="title-area">
                <Target size={24} className="section-icon" />
                <h2>Fitness Goals</h2>
              </div>
              <div className="header-controls">
                <button className="primary-button">
                  <Plus size={18} />
                  <span>Add Goal</span>
                </button>
              </div>
            </div>

            <div className="goals-container">
              {fitnessGoals.map((goal) => (
                <div className="goal-card" key={goal.id}>
                  <div
                    className="goal-header"
                    style={{ backgroundColor: `${goal.color}22` }}
                  >
                    <div className="goal-category">{goal.category}</div>
                    <div
                      className={`goal-status ${goal.status === "On Track" ? "positive" : goal.status === "Behind" ? "negative" : "neutral"}`}
                    >
                      {goal.status}
                    </div>
                  </div>

                  <div className="goal-content">
                    <h3 className="goal-title">{goal.name}</h3>

                    <div className="goal-details">
                      <div className="goal-target">
                        <Target size={16} />
                        <span>{goal.target}</span>
                      </div>

                      <div className="goal-deadline">
                        <Calendar size={16} />
                        <span>{goal.deadline}</span>
                      </div>
                    </div>

                    <div className="goal-progress">
                      <div className="progress-label">
                        <div className="progress-text">Progress</div>
                        <div
                          className="progress-percentage"
                          style={{ color: goal.color }}
                        >
                          {goal.progress}%
                        </div>
                      </div>

                      <div className="progress-bar-container">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${goal.progress}%`,
                            backgroundColor: goal.color,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="goal-actions">
                      <button className="goal-action">Edit</button>
                      <button className="goal-action">Update Progress</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* App Styles */}
      <style jsx>{`
        /* Base Styles */
        .app-container {
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            "Open Sans",
            "Helvetica Neue",
            sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        /* Theme Styles */
        .dark-mode {
          --bg-primary: #121212;
          --bg-secondary: #1e1e1e;
          --bg-tertiary: #2d2d2d;
          --bg-card: #252525;
          --bg-input: #333;
          --text-primary: #f5f5f5;
          --text-secondary: #aaa;
          --text-tertiary: #666;
          --accent: #00bfa5;
          --accent-secondary: #7c4dff;
          --error: #ff5252;
          --positive: #00c853;
          --neutral: #ffc107;
          --negative: #ff5252;
          --protein: #ff9800;
          --carbs: #2196f3;
          --fat: #ff5252;
          --water: #03a9f4;
          --border: #333;
          --shadow: rgba(0, 0, 0, 0.4);
        }

        .light-mode {
          --bg-primary: #f5f5f5;
          --bg-secondary: #ffffff;
          --bg-tertiary: #f1f1f1;
          --bg-card: #ffffff;
          --bg-input: #f3f3f3;
          --text-primary: #121212;
          --text-secondary: #555;
          --text-tertiary: #999;
          --accent: #00bfa5;
          --accent-secondary: #7c4dff;
          --error: #f44336;
          --positive: #00c853;
          --neutral: #ffc107;
          --negative: #ff5252;
          --protein: #ff9800;
          --carbs: #2196f3;
          --fat: #ff5252;
          --water: #03a9f4;
          --border: #e0e0e0;
          --shadow: rgba(0, 0, 0, 0.1);
        }

        /* Header Styles */
        .app-header {
          background-color: var(--bg-secondary);
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
        }

        .logo-container {
          display: flex;
          flex-direction: column;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--accent);
        }

        .logo h1 {
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(
            90deg,
            var(--accent),
            var(--accent-secondary)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .tagline {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .icon-button {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .icon-button:hover {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px;
          border-radius: 20px;
          background-color: var(--bg-tertiary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .user-profile:hover {
          background-color: var(--border);
        }

        .avatar {
          border-radius: 50%;
        }

        /* Navigation Styles */
        .main-nav {
          background-color: var(--bg-secondary);
          padding: 12px 24px;
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          border-bottom: 1px solid var(--border);
        }

        .main-nav::-webkit-scrollbar {
          display: none;
        }

        .nav-item {
          background: none;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .nav-item:hover {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .nav-item.active {
          background-color: var(--accent);
          color: white;
        }

        /* Main Content Styles */
        .main-content {
          flex: 1;
          background-color: var(--bg-primary);
          color: var(--text-primary);
          padding: 24px;
          overflow-y: auto;
        }

        .content-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .title-area {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-icon {
          color: var(--accent);
        }

        .section-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .filter-button {
          background-color: var(--bg-tertiary);
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-button:hover {
          background-color: var(--border);
          color: var(--text-primary);
        }

        .primary-button {
          background-color: var(--accent);
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .primary-button:hover {
          opacity: 0.9;
        }

        /* Stats Cards */
        .stats-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .stat-card {
          background-color: var(--bg-card);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 6px var(--shadow);
        }

        .stat-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .stat-header h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .stat-icon {
          padding: 8px;
          border-radius: 12px;
          background-color: var(--bg-tertiary);
        }

        .stat-icon.positive {
          color: var(--positive);
        }

        .stat-icon.accent {
          color: var(--accent);
        }

        .stat-icon.neutral {
          color: var(--neutral);
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .stat-target {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .progress-bar-container {
          width: 100%;
          height: 8px;
          background-color: var(--bg-tertiary);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-bar {
          height: 100%;
          background-color: var(--positive);
          border-radius: 4px;
        }

        .progress-bar.accent {
          background-color: var(--accent);
        }

        .progress-bar.neutral {
          background-color: var(--neutral);
        }

        .stat-percentage {
          text-align: right;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .stat-comparison {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.875rem;
        }

        .stat-comparison.positive {
          color: var(--positive);
        }

        .stat-comparison.negative {
          color: var(--negative);
        }

        /* Chart Styles */
        .chart-container {
          background-color: var(--bg-card);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 4px 6px var(--shadow);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .chart-header h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .chart-controls {
          display: flex;
          gap: 8px;
        }

        .chart-type-button {
          background-color: var(--bg-tertiary);
          border: none;
          padding: 6px 12px;
          border-radius: 16px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .chart-type-button:hover {
          background-color: var(--border);
        }

        .chart-type-button.active {
          background-color: var(--accent);
          color: white;
        }

        .timeframe-selector {
          display: flex;
          background-color: var(--bg-tertiary);
          border-radius: 20px;
          padding: 2px;
        }

        .timeframe-button {
          background: none;
          border: none;
          padding: 6px 12px;
          border-radius: 16px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .timeframe-button.active {
          background-color: var(--accent);
          color: white;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        /* Workouts Styles */
        .filters-container {
          background-color: var(--bg-card);
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 24px;
          box-shadow: 0 4px 6px var(--shadow);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .filter-group label {
          font-weight: 500;
          min-width: 100px;
        }

        .type-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .type-filter {
          background-color: var(--bg-tertiary);
          border: none;
          padding: 6px 12px;
          border-radius: 16px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .type-filter:hover {
          background-color: var(--border);
        }

        .type-filter.active {
          background-color: var(--accent);
          color: white;
        }

        .workouts-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .workout-card {
          background-color: var(--bg-card);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px var(--shadow);
        }

        .workout-header {
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .workout-title {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .favorite-button {
          background: none;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .favorite-button:hover {
          color: gold;
        }

        .favorite-button.active {
          color: gold;
        }

        .workout-info {
          padding: 16px;
        }

        .workout-type {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          color: var(--accent);
          font-weight: 500;
        }

        .workout-stats {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
        }

        .workout-date {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .workout-actions {
          border-top: 1px solid var(--border);
          padding-top: 16px;
          display: flex;
          justify-content: center;
        }

        .complete-button {
          background-color: var(--bg-tertiary);
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          color: var(--text-secondary);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }

        .complete-button:hover {
          background-color: var(--border);
        }

        .complete-button.completed {
          background-color: var(--positive);
          color: white;
        }

        /* Dialog Styles */
        .dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
        }

        .dialog {
          background-color: var(--bg-secondary);
          border-radius: 16px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 4px 20px var(--shadow);
          animation: fadeIn 0.3s ease;
        }

        .dialog-header {
          padding: 16px 24px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dialog-header h3 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--text-tertiary);
          cursor: pointer;
        }

        .dialog-content {
          padding: 24px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-row {
          display: flex;
          gap: 16px;
        }

        .form-group.half {
          flex: 1;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          background-color: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 12px;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .dialog-footer {
          padding: 16px 24px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .secondary-button {
          background-color: var(--bg-tertiary);
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          color: var(--text-secondary);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .secondary-button:hover {
          background-color: var(--border);
        }

        /* Nutrition Styles */
        .nutrition-overview {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .nutrition-summary {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .calorie-card {
          background-color: var(--bg-card);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 6px var(--shadow);
        }

        .calorie-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .calorie-header h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .date {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .calorie-chart {
          position: relative;
          height: 200px;
        }

        .calorie-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .consumed {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .goal {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .calorie-info {
          display: flex;
          align-items: center;
          margin-top: 20px;
        }

        .info-item {
          flex: 1;
          text-align: center;
        }

        .info-divider {
          width: 1px;
          height: 40px;
          background-color: var(--border);
        }

        .info-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }

        .info-value {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .macros-container {
          background-color: var(--bg-card);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 6px var(--shadow);
        }

        .macros-container h3 {
          margin: 0 0 20px 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .macro-item {
          margin-bottom: 20px;
        }

        .macro-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .macro-name {
          font-weight: 500;
        }

        .macro-values {
          font-size: 0.875rem;
        }

        .consumed {
          font-weight: 600;
        }

        .goal {
          color: var(--text-secondary);
        }

        .macro-bar-container {
          height: 8px;
          background-color: var(--bg-tertiary);
          border-radius: 4px;
          overflow: hidden;
        }

        .macro-bar {
          height: 100%;
          border-radius: 4px;
        }

        .macro-bar.protein {
          background-color: var(--protein);
        }

        .macro-bar.carbs {
          background-color: var(--carbs);
        }

        .macro-bar.fat {
          background-color: var(--fat);
        }

        .macro-bar.water {
          background-color: var(--water);
        }

        .meal-log {
          background-color: var(--bg-card);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 6px var(--shadow);
        }

        .meal-log h3 {
          margin: 0 0 20px 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .meals-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .meal-item {
          background-color: var(--bg-tertiary);
          border-radius: 12px;
          padding: 16px;
        }

        .meal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .meal-title {
          display: flex;
          flex-direction: column;
        }

        .meal-name {
          font-weight: 600;
        }

        .meal-time {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .meal-calories {
          font-weight: 600;
          color: var(--accent);
        }

        .meal-foods {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }

        .food-item {
          padding: 8px 12px;
          background-color: var(--bg-secondary);
          border-radius: 8px;
        }

        .food-name {
          font-weight: 500;
          margin-bottom: 4px;
        }

        .food-nutrients {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .meal-actions {
          display: flex;
          gap: 8px;
        }

        .meal-action {
          background-color: var(--bg-secondary);
          border: none;
          padding: 6px 12px;
          border-radius: 8px;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s ease;
        }

        .meal-action:hover {
          background-color: var(--border);
        }

        /* Goals Styles */
        .goals-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .goal-card {
          background-color: var(--bg-card);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px var(--shadow);
        }

        .goal-header {
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .goal-category {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .goal-status {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 12px;
        }

        .goal-status.positive {
          background-color: rgba(0, 200, 83, 0.2);
          color: var(--positive);
        }

        .goal-status.negative {
          background-color: rgba(255, 82, 82, 0.2);
          color: var(--negative);
        }

        .goal-status.neutral {
          background-color: rgba(255, 193, 7, 0.2);
          color: var(--neutral);
        }

        .goal-content {
          padding: 16px;
        }

        .goal-title {
          margin: 0 0 16px 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .goal-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .goal-target,
        .goal-deadline {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
        }

        .goal-progress {
          margin-bottom: 16px;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .progress-text {
          font-weight: 500;
        }

        .progress-percentage {
          font-weight: 600;
        }

        .goal-actions {
          display: flex;
          gap: 8px;
        }

        .goal-action {
          background-color: var(--bg-tertiary);
          border: none;
          padding: 8px 12px;
          border-radius: 8px;
          color: var(--text-secondary);
          cursor: pointer;
          flex: 1;
          transition: all 0.2s ease;
        }

        .goal-action:hover {
          background-color: var(--border);
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Adjustments */
        @media (max-width: 1024px) {
          .nutrition-overview {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .app-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .header-actions {
            width: 100%;
            justify-content: space-between;
          }

          .charts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default FitPulse;
