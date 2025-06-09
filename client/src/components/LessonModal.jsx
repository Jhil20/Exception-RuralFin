import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, CheckCircle, Clock, Star } from 'lucide-react';
import axios from 'axios';

const LessonModal = ({ lesson, onClose, onComplete }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000 / 60));
    }, 60000);

    return () => clearInterval(timer);
  }, [startTime]);

  const updateProgress = async (newProgress) => {
    try {
      await axios.put(`/api/learning/lessons/${lesson.lesson.id}/progress`, {
        progress: newProgress,
        timeSpent,
        score: 85 // Mock score
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (newProgress >= 100) {
        onComplete();
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleNext = () => {
    const newProgress = ((currentSection + 1) / lesson.lesson.content.sections.length) * 100;
    setProgress(newProgress);
    updateProgress(newProgress);

    if (currentSection < lesson.lesson.content.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Lesson completed
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const currentSectionData = lesson.lesson.content.sections[currentSection];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{lesson.lesson.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {lesson.lesson.duration} min
              </span>
              <span className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                +{lesson.lesson.points} points
              </span>
            </div>
            <span>
              Section {currentSection + 1} of {lesson.lesson.content.sections.length}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mt-4">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {currentSectionData.title}
            </h3>
            
            {currentSectionData.type === 'text' && (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {currentSectionData.content}
                </p>
              </div>
            )}

            {currentSectionData.type === 'interactive' && (
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {currentSectionData.content}
                </p>
                
                {/* Interactive Quiz Example */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Quick Check:</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="quiz" 
                        className="text-indigo-600"
                        onChange={() => setAnswers({...answers, [currentSection]: 'a'})}
                      />
                      <span>I will start saving ₹50 per week</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="quiz" 
                        className="text-indigo-600"
                        onChange={() => setAnswers({...answers, [currentSection]: 'b'})}
                      />
                      <span>I will track my expenses daily</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="quiz" 
                        className="text-indigo-600"
                        onChange={() => setAnswers({...answers, [currentSection]: 'c'})}
                      />
                      <span>Both of the above</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {currentSectionData.type === 'video' && (
              <div className="space-y-6">
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Video content would be embedded here</p>
                  <p className="text-sm text-gray-500 mt-2">{currentSectionData.content}</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              currentSection === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </button>

          <div className="flex items-center space-x-2">
            {lesson.lesson.content.sections.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index <= currentSection ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {currentSection === lesson.lesson.content.sections.length - 1 ? (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                Complete
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LessonModal;