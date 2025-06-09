import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Clock, 
  Star, 
  Lock, 
  Play, 
  CheckCircle,
  TrendingUp,
  Award,
  Flame,
  Calendar
} from 'lucide-react';
import axios from 'axios';
import LessonModal from './LessonModal';
import AchievementsModal from './AchievementsModal';

const LearningDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showAchievements, setShowAchievements] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/learning/dashboard', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const startLesson = async (lessonId) => {
    try {
      const response = await axios.post(`/api/learning/lessons/${lessonId}/start`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSelectedLesson(response.data.data);
    } catch (error) {
      console.error('Error starting lesson:', error);
    }
  };

  const getLevelProgress = (experiencePoints) => {
    const currentLevelXP = experiencePoints % 1000;
    return (currentLevelXP / 1000) * 100;
  };

  const getCategoryProgress = (lessons, category) => {
    const categoryLessons = lessons.filter(lesson => lesson.category === category);
    const completedLessons = categoryLessons.filter(lesson => lesson.status === 'completed');
    return categoryLessons.length > 0 ? (completedLessons.length / categoryLessons.length) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Unable to load learning data</h2>
          <button 
            onClick={fetchDashboardData}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { learningPath, lessons, achievements, todaysLesson, stats } = dashboardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Financial Learning Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master financial skills through interactive lessons in your local language. 
            Build real-world knowledge that adapts to your needs.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-3xl font-bold text-indigo-600">{stats.totalPoints}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Star className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-3xl font-bold text-orange-600">{learningPath.currentStreak}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Level</p>
                <p className="text-3xl font-bold text-green-600">{stats.level}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-purple-600">
                  {stats.completedLessons}/{stats.totalLessons}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Level Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Level Progress</h3>
            <span className="text-sm text-gray-600">
              Level {stats.level} • {learningPath.experiencePoints % 1000}/1000 XP
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getLevelProgress(learningPath.experiencePoints)}%` }}
            ></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Learning Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Lesson */}
            {todaysLesson && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white"
              >
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-semibold">Today's Lesson</h3>
                </div>
                <h4 className="text-2xl font-bold mb-2">{todaysLesson.title}</h4>
                <p className="text-indigo-100 mb-6">{todaysLesson.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {todaysLesson.duration} minutes
                    </span>
                    <span className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      {todaysLesson.difficulty}
                    </span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      +{todaysLesson.points} points
                    </span>
                  </div>
                  <button
                    onClick={() => startLesson(todaysLesson.id)}
                    className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Lesson
                  </button>
                </div>
              </motion.div>
            )}

            {/* Learning Categories */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Learning Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['Saving', 'Budgeting', 'Credit', 'Investment'].map((category) => {
                  const progress = getCategoryProgress(lessons, category);
                  const categoryLessons = lessons.filter(lesson => lesson.category === category);
                  
                  return (
                    <div key={category} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-800">{category}</h4>
                        <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {categoryLessons.filter(l => l.status === 'completed').length} of {categoryLessons.length} lessons completed
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* All Lessons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">All Lessons</h3>
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`p-4 border rounded-lg transition-all duration-200 ${
                      lesson.isLocked 
                        ? 'border-gray-200 bg-gray-50' 
                        : 'border-gray-200 hover:border-indigo-300 hover:shadow-md cursor-pointer'
                    }`}
                    onClick={() => !lesson.isLocked && startLesson(lesson.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          lesson.status === 'completed' 
                            ? 'bg-green-100' 
                            : lesson.isLocked 
                            ? 'bg-gray-100' 
                            : 'bg-indigo-100'
                        }`}>
                          {lesson.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : lesson.isLocked ? (
                            <Lock className="h-5 w-5 text-gray-400" />
                          ) : (
                            <BookOpen className="h-5 w-5 text-indigo-600" />
                          )}
                        </div>
                        <div>
                          <h4 className={`font-semibold ${lesson.isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
                            {lesson.title}
                          </h4>
                          <p className={`text-sm ${lesson.isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
                            {lesson.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-xs">
                            <span className={lesson.isLocked ? 'text-gray-400' : 'text-gray-500'}>
                              {lesson.duration} min
                            </span>
                            <span className={lesson.isLocked ? 'text-gray-400' : 'text-gray-500'}>
                              {lesson.difficulty}
                            </span>
                            <span className={lesson.isLocked ? 'text-gray-400' : 'text-indigo-600'}>
                              +{lesson.points} points
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {lesson.status === 'completed' && (
                          <span className="text-green-600 text-sm font-medium">Completed</span>
                        )}
                        {lesson.status === 'in_progress' && (
                          <div>
                            <span className="text-indigo-600 text-sm font-medium">In Progress</span>
                            <div className="w-20 bg-gray-200 rounded-full h-1 mt-1">
                              <div 
                                className="bg-indigo-600 h-1 rounded-full"
                                style={{ width: `${lesson.userProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        {lesson.isLocked && (
                          <span className="text-gray-400 text-sm">Locked</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements Preview */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Achievements</h3>
                <button
                  onClick={() => setShowAchievements(true)}
                  className="text-indigo-600 text-sm hover:text-indigo-700"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement._id} className="flex items-center space-x-3">
                    <div className="text-2xl">{achievement.achievementId?.icon || '🏆'}</div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        {achievement.achievementId?.title || 'Achievement'}
                      </p>
                      <p className="text-xs text-gray-600">
                        +{achievement.points} points
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  {achievements.length}/12 achievements earned
                </p>
              </div>
            </motion.div>

            {/* Learning Streak */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white"
            >
              <div className="flex items-center mb-4">
                <Flame className="h-6 w-6 mr-2" />
                <h3 className="text-lg font-semibold">Learning Streak</h3>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold mb-2">{learningPath.currentStreak}</p>
                <p className="text-orange-100 text-sm">days in a row</p>
                <p className="text-orange-100 text-xs mt-2">
                  Best: {learningPath.longestStreak} days
                </p>
              </div>
            </motion.div>

            {/* Daily Goal */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Goal</h3>
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.7)}`}
                      className="text-green-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-800">70%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {Math.round(learningPath.preferences.dailyGoal * 0.7)} of {learningPath.preferences.dailyGoal} minutes
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedLesson && (
          <LessonModal
            lesson={selectedLesson}
            onClose={() => setSelectedLesson(null)}
            onComplete={fetchDashboardData}
          />
        )}
        {showAchievements && (
          <AchievementsModal
            onClose={() => setShowAchievements(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningDashboard;