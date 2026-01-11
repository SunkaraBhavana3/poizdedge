import React, { useState } from 'react';
// Updated imports to use lucide-react, which is available
import { 
    Book, Info, Star, LineChart, MessageCircle, Clipboard, Crown, CheckCircle, Lock, Users, Clock, BarChart, ThumbsUp, ChevronDown, ChevronUp, User, Award, MessageSquare, Plus, Send, TrendingUp, TrendingDown, RefreshCw
} from 'lucide-react';

// Assume Tailwind CSS is available in the environment

// --- Utility Components ---

// Star Rating component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-0.5">
      {/* Replaced FaStar with Star icon from lucide-react */}
      {Array(fullStars).fill().map((_, i) => <Star key={`full-${i}`} className="text-yellow-400 w-4 h-4 fill-yellow-400" />)}
      {halfStar && <Star key="half" className="text-yellow-400 w-4 h-4 opacity-50 fill-yellow-400" />}
      {Array(emptyStars).fill().map((_, i) => <Star key="empty" className="text-gray-300 w-4 h-4" />)}
    </div>
  );
};

// --- 1. Header Component ---
const CourseHeader = ({ details }) => (
  <header className="bg-white pt-10 pb-6 border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start justify-between">
      <div className="md:w-1/2 pr-0 md:pr-12 mb-6 md:mb-0">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{details.title}</h1>
        <p className="text-xl text-gray-600 leading-relaxed">{details.description}</p>
      </div>
      <div className="md:w-5/12 overflow-hidden rounded-xl shadow-2xl">
        {/* Placeholder Image */}
        <div className="h-60 bg-blue-600 flex items-center justify-center text-white font-bold text-4xl p-6">
          <span className="text-5xl font-extrabold tracking-tight">coursera</span>
        </div>
      </div>
    </div>
  </header>
);

// --- 2. Curriculum Component ---
const CourseCurriculum = ({ curriculum }) => {
  const [openModuleId, setOpenModuleId] = useState(1);

  const toggleModule = (id) => {
    setOpenModuleId(openModuleId === id ? null : id);
  };

  const ModuleItem = ({ module }) => {
    const isUnlocked = module.isComplete;
    const isOpen = module.id === openModuleId;
    // Replaced FaLock with Lock icon
    const LockIcon = Lock; 
    // Replaced FaCheckCircle with CheckCircle icon
    const CheckIcon = CheckCircle;

    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
        {/* Module Header */}
        <div
          className={`flex justify-between items-center p-4 cursor-pointer transition-all ${isUnlocked ? 'bg-blue-50 hover:bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'}`}
          onClick={() => toggleModule(module.id)}
        >
          <div className="flex items-center">
            {isUnlocked ? (
              <CheckIcon className="text-green-500 w-5 h-5 mr-3 flex-shrink-0" />
            ) : (
              <LockIcon className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{module.title}</h3>
              <p className="text-sm text-gray-500">
                {module.duration} &middot; {module.progress}
              </p>
            </div>
          </div>
          {/* Replaced LuChevronUp/Down with ChevronUp/Down */}
          {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
        </div>

        {/* Topics (Expanded Section) */}
        {isOpen && (
          <div className="p-4 bg-white border-t border-gray-200">
            {module.topics.map((topic, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-100">
                <div className="flex items-center text-sm text-gray-600">
                  {topic.isLocked ? (
                    <LockIcon className="w-4 h-4 text-gray-300 mr-3" />
                  ) : (
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-4 ml-1.5"></span>
                  )}
                  {topic.name}
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span>{topic.duration}</span>
                  <span className="text-blue-600 font-medium">{topic.type}</span>
                </div>
              </div>
            ))}

            {/* Quiz Section */}
            <div className="flex items-center justify-between mt-4 p-4 border border-gray-200 rounded-md bg-white">
                <div className="flex items-center">
                    <LockIcon className="text-gray-400 w-4 h-4 mr-3 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-gray-700">{module.quiz}</p>
                        <p className="text-xs text-gray-400">Complete all topics to unlock this quiz</p>
                    </div>
                </div>
                <button 
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg cursor-not-allowed transition duration-150"
                    disabled
                >
                    Start Quiz
                </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Curriculum</h2>
      {curriculum.map((module) => (
        <ModuleItem key={module.id} module={module} />
      ))}
    </div>
  );
};

// --- 3. Details Component ---
const CourseDetails = ({ data }) => {
    // Replaced FaUserFriends with Users icon, FaStar with Star, FaClock with Clock, FaChartBar with BarChart
    const StatCard = ({ icon: Icon, title, value }) => (
        <div className="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-sm">
            <Icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <p className="text-xl font-bold text-gray-800">{value}</p>
        </div>
    );
    // Replaced FaCheckCircle with CheckCircle icon
    const FeatureList = ({ title, items, isBoxed = false }) => (
        <div className={`mt-8 ${isBoxed ? 'bg-blue-50 p-6 rounded-xl border border-blue-200' : ''}`}>
            <h3 className={`text-xl font-bold text-gray-800 mb-4 ${isBoxed ? 'text-blue-800' : ''}`}>{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start text-gray-600 text-base">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    const InfoBox = ({ title, items }) => (
        <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-base">
                {items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    );
    
    const InstructorProfile = ({ instructor }) => (
        <div className="mt-8 border-t pt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Your Instructor</h3>
            <div className="flex items-start space-x-6">
                <img 
                    src={instructor.imageUrl} 
                    alt={instructor.name} 
                    className="w-20 h-20 rounded-full object-cover shadow-md" 
                />
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800">{instructor.name}</h4>
                    <p className="text-sm text-blue-600 mb-3">{instructor.title}</p>
                    <p className="text-sm text-gray-600 mb-4">{instructor.bio}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                        {/* Replaced FaStar, FaUserFriends, FaBook with lucide icons */}
                        <span className="flex items-center"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" /> {instructor.rating} Instructor Rating</span>
                        <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {instructor.students} Students</span>
                        <span className="flex items-center"><Book className="w-4 h-4 mr-1" /> {instructor.courses} Courses</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {data.stats.map((stat, index) => (
                    <StatCard key={index} icon={stat.icon} title={stat.title} value={stat.value} />
                ))}
            </div>

            <FeatureList title="What You'll Learn" items={data.learningOutcomes} />
            
            <div className="my-8 border-t border-gray-200"></div>

            <InfoBox title="Requirements" items={data.requirements} />

            <div className="my-8 border-t border-gray-200"></div>
            
            <InfoBox title="Who This Course Is For" items={data.targetAudience} />
            
            <div className="my-8 border-t border-gray-200"></div>

            <FeatureList title="Course Features" items={data.courseFeatures} isBoxed={true} />

            <InstructorProfile instructor={data.instructor} />
        </div>
    );
};


// --- 4. Reviews Component ---
const CourseReviews = ({ data }) => {

    const StarBar = ({ stars, percentage, count }) => {
        return (
            <div className="flex items-center mb-1.5">
                <div className="w-16 flex justify-end text-sm text-gray-700 font-medium mr-4">{stars}</div>
                <div className="flex items-center w-full">
                    {/* Used StarRating utility component */}
                    <StarRating rating={1} /> 
                    <div className="w-full bg-gray-200 rounded-full h-2 ml-2">
                        <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: percentage }}
                        ></div>
                    </div>
                </div>
                <div className="w-12 text-right text-sm text-gray-600 font-medium">{percentage}</div>
            </div>
        );
    };

    const ReviewCard = ({ review }) => {
        const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);
        // Replaced FaRegThumbsUp with ThumbsUp icon
        const ThumbsUpIcon = ThumbsUp;

        return (
            <div className="border-t border-gray-200 py-6">
                <div className="flex items-start space-x-4">
                    <img 
                        src={review.imageUrl} 
                        alt={review.name} 
                        className="w-10 h-10 rounded-full object-cover" 
                    />
                    <div>
                        <p className="text-base font-semibold text-gray-800">{review.name}</p>
                        <p className="text-xs text-gray-500 mb-2">{review.time}</p>
                        <StarRating rating={review.rating} />
                        <p className="text-gray-700 mt-2 leading-relaxed">{review.comment}</p>
                        <button 
                            onClick={() => setHelpfulCount(c => c + 1)}
                            className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 transition duration-150 p-2 -ml-2 rounded-lg"
                        >
                            <ThumbsUpIcon className="w-4 h-4 mr-2" /> 
                            Helpful ({helpfulCount})
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8 border border-gray-100 p-6 rounded-xl shadow-sm">
                {/* Student Feedback (Left Column) */}
                <div className="col-span-1 border-r border-gray-200 pr-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Student Feedback</h3>
                    <p className="text-6xl font-extrabold text-gray-800 mb-2">{data.overallRating}</p>
                    <StarRating rating={data.overallRating} />
                    <p className="text-base font-medium text-gray-700 mt-2">Course Rating</p>
                    <p className="text-sm text-gray-500 mt-1">{data.totalRatings.toLocaleString()} ratings &middot; {data.totalReviews.toLocaleString()} reviews</p>
                </div>
                
                {/* Star Distribution (Right Columns) */}
                <div className="md:col-span-2 pl-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Star Distribution</h3>
                    {data.distribution.map((d, index) => (
                        <StarBar key={index} stars={d.stars} percentage={d.percentage} count={d.count} />
                    ))}
                </div>
            </div>

            {/* Recent Reviews */}
            <h3 className="text-xl font-bold text-gray-800 mt-10 mb-4 border-t pt-6">Recent Reviews</h3>
            {data.reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
            ))}
        </div>
    );
};

// --- 5. Progress Component (New) ---
const CourseProgress = ({ progressData }) => {
    const totalModules = progressData.totalModules;
    const completedModules = progressData.modules.filter(m => m.isCompleted).length;
    const completionPercentage = Math.round((completedModules / totalModules) * 100);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Course Progress</h2>

            {/* Overall Progress Card */}
            <div className="bg-blue-50 p-6 rounded-xl shadow-md border border-blue-200 mb-8 flex items-center justify-between">
                <div>
                    <p className="text-lg font-medium text-blue-800">Overall Completion</p>
                    <p className="text-5xl font-extrabold text-blue-900 mt-1">{completionPercentage}%</p>
                    <p className="text-sm text-blue-700 mt-2">
                        {completedModules} of {totalModules} modules completed.
                    </p>
                </div>
                <div className="w-24 h-24 relative">
                    {/* Simple SVG progress circle */}
                    <svg className="w-full h-full transform -rotate-90">
                        <circle 
                            className="text-gray-200 stroke-current" 
                            strokeWidth="10" 
                            fill="transparent" 
                            r="40" 
                            cx="50%" 
                            cy="50%"
                        />
                        <circle 
                            className="text-blue-600 stroke-current transition-all duration-500 ease-out" 
                            strokeWidth="10" 
                            strokeLinecap="round" 
                            fill="transparent" 
                            r="40" 
                            cx="50%" 
                            cy="50%"
                            style={{
                                strokeDasharray: 2 * Math.PI * 40,
                                strokeDashoffset: (2 * Math.PI * 40) - (2 * Math.PI * 40) * (completionPercentage / 100)
                            }}
                        />
                    </svg>
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-blue-800">
                        {completionPercentage}%
                    </span>
                </div>
            </div>

            {/* Module Progress List */}
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-t pt-6">Module Breakdown</h3>
            <div className="space-y-3">
                {progressData.modules.map((module) => (
                    <div key={module.id} className="flex items-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                        {module.isCompleted ? (
                            <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                        ) : (
                            <RefreshCw className="w-6 h-6 text-yellow-500 mr-4 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                            <p className="text-base font-medium text-gray-800">{module.title}</p>
                            <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
                                <div 
                                    className={`${module.isCompleted ? 'bg-green-500' : 'bg-yellow-500' } h-2 rounded-full transition-all duration-500`}
                                    style={{ width: module.progress }}
                                ></div>
                            </div>
                        </div>
                        <p className={`text-sm font-semibold ml-4 ${module.isCompleted ? 'text-green-600' : 'text-yellow-600'}`}>
                            {module.progress}
                        </p>
                    </div>
                ))}
            </div>

            {/* Achievements Section (Simple Placeholder) */}
             <div className="mt-10 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center"><Award className="w-6 h-6 mr-2" /> Achievements Unlocked</h3>
                <p className="text-gray-700">Completed 3 Quizzes: Mastery Badge Unlocked!</p>
            </div>
        </div>
    );
};

// --- 6. Discussion Component (New) ---
const DiscussionForum = ({ discussionData }) => {
    const [newMessage, setNewMessage] = useState('');

    const DiscussionPost = ({ post }) => (
        <div className="p-4 bg-white rounded-lg shadow-sm mb-4 border border-gray-100">
            <div className="flex items-center space-x-3 mb-2">
                <img 
                    src={post.user.imageUrl} 
                    alt={post.user.name} 
                    className="w-8 h-8 rounded-full object-cover" 
                />
                <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{post.user.name}</p>
                    <p className="text-xs text-gray-500">{post.time} &middot; {post.topic}</p>
                </div>
                <ThumbsUp className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-500 transition duration-150" />
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">{post.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{post.replies} Replies</span>
                <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" /> Reply
                </button>
            </div>
        </div>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            console.log("New Message:", newMessage);
            setNewMessage('');
            // In a real app, you would dispatch an action to add the message to the state/backend
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 mr-2 text-blue-600" /> Q&A and Discussion Forum
            </h2>

            {/* New Post Form */}
            <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-y"
                    rows="3"
                    placeholder="Ask a question or start a discussion..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <div className="flex justify-end mt-3">
                    <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-150 disabled:bg-blue-400"
                        disabled={!newMessage.trim()}
                    >
                        <Send className="w-4 h-4 mr-2" /> Post
                    </button>
                </div>
            </form>

            {/* Discussion Posts */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Posts</h3>
            <div className="space-y-4">
                {discussionData.map((post, index) => (
                    <DiscussionPost key={index} post={post} />
                ))}
            </div>
        </div>
    );
};

// --- 7. Notes Component (New) ---
const CourseNotes = ({ notesData }) => {
    const [activeNote, setActiveNote] = useState(notesData[0] || null);

    const NoteSidebar = () => (
        <div className="w-full md:w-1/3 border-r border-gray-200 pr-4 space-y-2">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <Clipboard className="w-5 h-5 mr-2" /> Your Notes
            </h3>
            <button className="w-full flex items-center justify-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 mb-4">
                <Plus className="w-5 h-5 mr-2" /> Add New Note
            </button>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {notesData.map((note) => (
                    <div
                        key={note.id}
                        onClick={() => setActiveNote(note)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors border ${activeNote?.id === note.id ? 'bg-blue-100 border-blue-400' : 'bg-white hover:bg-gray-50 border-gray-100'}`}
                    >
                        <p className="text-sm font-semibold text-gray-800 truncate">{note.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{note.date} &middot; {note.timecode}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const NoteEditor = () => (
        <div className="w-full md:w-2/3 pl-4">
            {activeNote ? (
                <>
                    <input
                        type="text"
                        value={activeNote.title}
                        className="w-full text-2xl font-bold text-gray-800 mb-4 p-2 border-b border-gray-200 focus:outline-none"
                        onChange={() => { /* Handle title change */ }}
                    />
                    <textarea
                        value={activeNote.content}
                        className="w-full h-[400px] p-4 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        onChange={() => { /* Handle content change */ }}
                        placeholder="Start typing your notes here..."
                    />
                    <div className="flex justify-end space-x-3 mt-3">
                        <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-300 bg-red-50 rounded-lg hover:bg-red-100 transition duration-150">
                            Delete
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-150">
                            Save
                        </button>
                    </div>
                </>
            ) : (
                <div className="h-full flex items-center justify-center text-gray-400 text-lg">
                    Select a note from the sidebar or create a new one.
                </div>
            )}
        </div>
    );

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row min-h-[550px]">
                <NoteSidebar />
                <NoteEditor />
            </div>
        </div>
    );
};

// --- 8. Leaderboard Component (New) ---
const CourseLeaderboard = ({ leaderboardData }) => {
    const LeaderboardItem = ({ user, rank }) => {
        const isUser = user.isCurrentUser;
        return (
            <div 
                className={`flex items-center p-4 rounded-lg shadow-sm mb-2 transition-all ${isUser ? 'bg-blue-100 border-2 border-blue-500 font-bold' : 'bg-white border border-gray-100 hover:bg-gray-50'}`}
            >
                <span className={`text-xl font-extrabold w-10 text-center ${rank <= 3 ? 'text-yellow-500' : 'text-gray-600'}`}>{rank}</span>
                <img 
                    src={user.imageUrl} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full object-cover mx-4" 
                />
                <div className="flex-1">
                    <p className={`text-base ${isUser ? 'text-blue-800' : 'text-gray-800'}`}>{user.name} {isUser && '(You)'}</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">{user.points.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Points</p>
                </div>
            </div>
        );
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Crown className="w-6 h-6 mr-2 text-yellow-600 fill-yellow-600" /> Global Leaderboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Top 3 Podium Cards */}
                <div className="col-span-1 bg-gray-100 p-6 rounded-xl text-center flex flex-col items-center justify-end shadow-lg h-56">
                    <Award className="w-10 h-10 text-gray-500 fill-gray-500 mb-3" />
                    <p className="text-2xl font-extrabold text-gray-800">{leaderboardData[1].user.points.toLocaleString()}</p>
                    <p className="font-semibold text-gray-700">{leaderboardData[1].user.name}</p>
                    <p className="text-4xl font-black mt-2 text-gray-600">#2</p>
                </div>
                <div className="col-span-1 bg-yellow-50 p-6 rounded-xl text-center flex flex-col items-center justify-end shadow-lg h-64 border-t-4 border-yellow-400">
                    <Crown className="w-12 h-12 text-yellow-500 fill-yellow-500 mb-4" />
                    <p className="text-3xl font-extrabold text-yellow-800">{leaderboardData[0].user.points.toLocaleString()}</p>
                    <p className="font-semibold text-yellow-700">{leaderboardData[0].user.name}</p>
                    <p className="text-5xl font-black mt-3 text-yellow-600">#1</p>
                </div>
                <div className="col-span-1 bg-yellow-100 p-6 rounded-xl text-center flex flex-col items-center justify-end shadow-lg h-56">
                    <Award className="w-10 h-10 text-yellow-500 fill-yellow-500 mb-3" />
                    <p className="text-2xl font-extrabold text-yellow-800">{leaderboardData[2].user.points.toLocaleString()}</p>
                    <p className="font-semibold text-yellow-700">{leaderboardData[2].user.name}</p>
                    <p className="text-4xl font-black mt-2 text-yellow-600">#3</p>
                </div>
            </div>

            {/* Rest of the Leaderboard */}
            <div className="space-y-1">
                {leaderboardData.slice(3).map((item) => (
                    <LeaderboardItem key={item.rank} user={item.user} rank={item.rank} />
                ))}
            </div>
        </div>
    );
};


// --- 9. Main App Component ---
const App = () => {
    const [activeTab, setActiveTab] = useState('Curriculum');

    const navItems = [
        // Replaced Fa icons with lucide-react icons
        { id: 'Curriculum', label: 'Curriculum', icon: Book },
        { id: 'Details', label: 'Details', icon: Info },
        { id: 'Reviews', label: 'Reviews', icon: Star },
        { id: 'Progress', label: 'Progress', icon: LineChart },
        { id: 'Discussion', label: 'Discussion', icon: MessageCircle },
        { id: 'Notes', label: 'Notes', icon: Clipboard },
        { id: 'Leaderboard', label: 'Leaderboard', icon: Crown },
    ];

    // --- Mock Data ---

    const curriculumData = [
        {
            id: 1,
            title: "Introduction to Web Development",
            duration: "2h 30m",
            progress: "0/3 topics completed",
            isComplete: true, 
            topics: [
                { name: "What is Web Development?", duration: "15m", type: "Material", isLocked: false },
                { name: "HTML Basics", duration: "45m", type: "Material", isLocked: true },
                { name: "CSS Fundamentals", duration: "1h 30m", type: "Material", isLocked: true },
            ],
            quiz: "Module 1 Quiz",
        },
        { id: 2, title: "JavaScript Essentials", duration: "4h 15m", progress: "0/3 topics completed", isComplete: false, topics: [], quiz: "Module 2 Quiz" },
        { id: 3, title: "React Framework", duration: "5h 45m", progress: "0/3 topics completed", isComplete: false, topics: [], quiz: "Module 3 Quiz" },
    ];

    const detailsData = {
        // Updated icons in mock data to use lucide-react names
        stats: [
            { icon: Users, title: "Students Enrolled", value: "125,847" },
            { icon: Star, title: "Rating", value: "4.8 (32,451)" },
            { icon: Clock, title: "Duration", value: "12h 30m" },
            { icon: BarChart, title: "Level", value: "Beginner to Advanced" },
        ],
        learningOutcomes: [
            "Build responsive websites using HTML, CSS, and JavaScript",
            "Master React and modern JavaScript ES6+ features",
            "Create interactive user interfaces with React Hooks",
            "Understand component-based architecture",
            "Work with state management and props",
            "Implement routing with React Router",
            "Deploy web applications to production",
            "Apply best practices and coding standards",
        ],
        courseFeatures: [
            "Lifetime access to all course materials",
            "Downloadable resources and cheat sheets",
            "Interactive quizzes after each module",
            "Certificate of completion",
            "Progress tracking and achievements",
            "Discussion forum for Q&A",
        ],
        requirements: [
            "A computer with internet connection",
            "Basic understanding of how websites work",
            "Willingness to learn and practice coding",
            "No prior programming experience required",
        ],
        targetAudience: [
            "Beginners who want to become web developers.",
            "Students looking to build their first website",
            "Professionals transitioning to web development",
            "Entrepreneurs wanting to build their own web applications",
            "Anyone interested in learning modern web technologies",
        ],
        instructor: {
            name: "Dr. Sarah Johnson",
            title: "Senior Web Developer & Instructor",
            bio: "With over 10 years of experience in web development and teaching, Sarah has helped thousands of students launch their careers in tech. She specializes in making complex concepts easy to understand and enjoys seeing her students succeed.",
            rating: 4.8,
            students: "125,000",
            courses: "12",
            imageUrl: "https://placehold.co/80x80/f3f4f6/374151?text=SJ"
        }
    };

    const reviewsData = {
        overallRating: 4.8,
        totalRatings: 32451,
        totalReviews: 6, // Adjusted for the limited reviews shown
        distribution: [
            { stars: 5, percentage: "78%", count: 25312 },
            { stars: 4, percentage: "18%", count: 5841 },
            { stars: 3, percentage: "3%", count: 973 },
            { stars: 2, percentage: "1%", count: 324 },
            { stars: 1, percentage: "0%", count: 0 },
        ],
        reviews: [
            { 
                name: "Michael Chen", 
                time: "2 weeks ago", 
                rating: 5, 
                comment: "This course is absolutely amazing! The content is well-structured and easy to follow. I went from having zero experience to developing my own projects. Highly recommended!",
                helpfulCount: 45,
                imageUrl: "https://placehold.co/40x40/f3f4f6/374151?text=MC"
            },
            { 
                name: "Rucriew Chen", 
                time: "3 month ago", 
                rating: 5, 
                comment: "Sarah is an excellent instructor. Her teaching style is clear and engaging. The hands-on projects really helped my understanding. Best investment I've made in my career!",
                helpfulCount: 38,
                imageUrl: "https://placehold.co/40x40/f3f4f6/374151?text=RC"
            },
        ]
    };

    const progressData = {
        totalModules: 5,
        modules: [
            { id: 1, title: "Introduction to Web Development", progress: "100%", isCompleted: true },
            { id: 2, title: "JavaScript Essentials", progress: "75%", isCompleted: false },
            { id: 3, title: "React Framework", progress: "20%", isCompleted: false },
            { id: 4, title: "State Management with Redux", progress: "0%", isCompleted: false },
            { id: 5, title: "Deployment and DevOps", progress: "0%", isCompleted: false },
        ]
    };

    const discussionData = [
        {
            user: { name: "Alice Johnson", imageUrl: "https://placehold.co/40x40/f3f4f6/374151?text=AJ" },
            time: "2 hours ago",
            topic: "HTML & CSS",
            content: "I'm struggling with Flexbox alignment. The `justify-content: space-between` isn't behaving as expected inside a nested flex container. Any tips?",
            replies: 5,
        },
        {
            user: { name: "Bob Smith", imageUrl: "https://placehold.co/40x40/f3f4f6/374151?text=BS" },
            time: "1 day ago",
            topic: "React Hooks",
            content: "What's the best practice for deciding when to use `useMemo` versus `useCallback`? The difference feels subtle.",
            replies: 12,
        },
    ];

    const notesData = [
        { id: 1, title: "Key Flexbox Properties", date: "Nov 24, 2025", timecode: "1:35:12", content: "Flexbox cheatsheet: `display: flex;` on parent, `flex-grow`, `flex-shrink`, `flex-basis` on children. Remember to set `align-items` and `justify-content` correctly!" },
        { id: 2, title: "React Lifecycle Hook Summary", date: "Nov 20, 2025", timecode: "2:45:00", content: "useEffect runs after render. Use cleanup function for subscriptions. Empty dependency array means it runs once." },
        { id: 3, title: "Deployment Checklist", date: "Nov 15, 2025", timecode: "4:00:00", content: "1. Minify code. 2. Set up environment variables. 3. Configure domain. 4. Check HTTPS/SSL. 5. Set up continuous integration." },
    ];
    
    const leaderboardData = [
        { rank: 1, user: { name: "ChampionCoder", points: 28900, imageUrl: "https://placehold.co/40x40/ffd700/000?text=🏆" } },
        { rank: 2, user: { name: "ReactRookie", points: 25150, imageUrl: "https://placehold.co/40x40/c0c0c0/000?text=🥈" } },
        { rank: 3, user: { name: "NodeNinja", points: 22800, imageUrl: "https://placehold.co/40x40/cd7f32/000?text=🥉" } },
        { rank: 4, user: { name: "WebWarrior", points: 19500, imageUrl: "https://placehold.co/40x40/f3f4f6/374151?text=WW", isCurrentUser: true } },
        { rank: 5, user: { name: "JSJedi", points: 18000, imageUrl: "https://placehold.co/40x40/f3f4f6/374151?text=JJ" } },
        { rank: 6, user: { name: "PixelPusher", points: 15320, imageUrl: "https://placehold.co/40x40/f3f4f6/374151?text=PP" } },
        { rank: 7, user: { name: "CSSKing", points: 12100, imageUrl: "https://placehold.co/40x40/f3f4f6/374151?text=CK" } },
        { rank: 8, user: { name: "FrontendFan", points: 9800, imageUrl: "https://placehold.co/40x40/f3f4f6/374151?text=FF" } },
        { rank: 9, user: { name: "BackendBoss", points: 7600, imageUrl: "https://placehold.co/40x40/f3f4f6/374151?text=BB" } },
        { rank: 10, user: { name: "HTMLHero", points: 5100, imageUrl: "https://placehold.co/40x40/f3f4f6/374151?text=HH" } },
    ];


    const renderContent = () => {
        switch (activeTab) {
            case 'Curriculum':
                return <CourseCurriculum curriculum={curriculumData} />;
            case 'Details':
                return <CourseDetails data={detailsData} />;
            case 'Reviews':
                return <CourseReviews data={reviewsData} />;
            case 'Progress':
                return <CourseProgress progressData={progressData} />; // New Content
            case 'Discussion':
                return <DiscussionForum discussionData={discussionData} />; // New Content
            case 'Notes':
                return <CourseNotes notesData={notesData} />; // New Content
            case 'Leaderboard':
                return <CourseLeaderboard leaderboardData={leaderboardData} />; // New Content
            default:
                return <div className="p-6 text-gray-500">Content for {activeTab} tab.</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased">
            <CourseHeader details={{
                title: "Complete Web Development Bootcamp",
                description: "Master modern web development with React, Node.js, and more. Build real-world projects and become a professional developer.",
            }} />

            {/* Navigation Tabs */}
            <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-6 overflow-x-auto">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex items-center py-4 px-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap
                                    ${isActive
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                                    }`}
                            >
                                <item.icon className="w-4 h-4 mr-2" />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg mt-6 rounded-xl mb-12">
                {renderContent()}
            </div>
        </div>
    );
};

export default App;