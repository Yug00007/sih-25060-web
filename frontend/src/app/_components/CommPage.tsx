"use client";

import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  UserCircle,
  ChevronDown,
  ChevronUp,
  Users,
  Flame,
} from "lucide-react";

type Comment = { id: number; user: string; text: string };
type Post = {
  id: number;
  user: string;
  content: string;
  likes: number;
  liked?: boolean;
  comments: Comment[];
  showComments?: boolean;
};

export default function CommPage() {
  const samplePosts: Post[] = [
    {
      id: 1,
      user: "GreenWarrior99",
      content:
        "We organised a clean-up drive in our neighbourhood park today 🌱✨! Feeling proud to keep our city green.",
      likes: 12,
      comments: [
        { id: 1, user: "EcoHelper", text: "Amazing effort! 👏" },
        { id: 2, user: "CleanerCity", text: "Keep inspiring others." },
      ],
    },
    {
      id: 2,
      user: "CleanIndiaFan",
      content:
        "Here’s a tip: segregate your kitchen waste daily to reduce landfill burden. Small steps, big change!",
      likes: 25,
      comments: [
        { id: 1, user: "WasteSaver", text: "Yes! It really helps." },
      ],
    },
    {
      id: 3,
      user: "EcoRider",
      content:
        "Installed a compost bin in my apartment complex. Anyone else tried this?",
      likes: 9,
      comments: [],
    },
  ];

  const suggestedCommunities = [
    {
      name: "🌱 Urban Composters",
      members: "14k members",
      desc: "Discuss composting tips and hacks",
    },
    {
      name: "🚮 Zero Waste India",
      members: "32k members",
      desc: "Share your zero-waste lifestyle",
    },
    {
      name: "♻️ Plastic-Free Warriors",
      members: "8k members",
      desc: "Talk about alternatives to plastic",
    },
    {
      name: "🏞️ Clean Parks Movement",
      members: "20k members",
      desc: "Organize clean-up drives",
    },
  ];

  const trendingTopics = [
    { topic: "#BeatPlasticPollution", activity: 80 },
    { topic: "#CleanRivers", activity: 60 },
    { topic: "#UrbanGardening", activity: 50 },
    { topic: "#GreenTech", activity: 40 },
  ];

  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (!newPost.trim()) return;
    const newEntry: Post = {
      id: posts.length + 1,
      user: "You",
      content: newPost,
      likes: 0,
      comments: [],
    };
    setPosts([newEntry, ...posts]);
    setNewPost("");
  };

  const toggleLike = (id: number) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === id
          ? {
              ...post,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
              liked: !post.liked,
            }
          : post
      )
    );
  };

  const toggleComments = (id: number) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === id
          ? { ...post, showComments: !post.showComments }
          : post
      )
    );
  };

  const addComment = (id: number, text: string) => {
    if (!text.trim()) return;
    setPosts(prev =>
      prev.map(post =>
        post.id === id
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: post.comments.length + 1, user: "You", text },
              ],
            }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-green-200 py-6 px-2">
      {/* HERO */}
      <div className="max-w-6xl mx-auto mb-8 rounded-3xl bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 shadow-xl flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-2 text-center">
          Join the Clean Earth Community
        </h1>
        <p className="text-lg opacity-90 text-center max-w-2xl">
          Connect, share and inspire others with your sustainability journey.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT + FEED */}
        <div className="lg:col-span-2">
          {/* New Post */}
          <div className="bg-white/95 backdrop-blur p-6 rounded-3xl shadow-xl mb-8">
            <div className="flex items-start space-x-4">
              <UserCircle className="text-green-600 w-10 h-10" />
              <textarea
                placeholder="Share your cleanliness ideas or achievements..."
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
                className="flex-1 p-3 border border-green-200 rounded-xl resize-none focus:ring-2 focus:ring-green-400"
                rows={3}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePost}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-5 py-2 rounded-full shadow hover:scale-[1.03] transition"
              >
                <Send className="w-4 h-4" />
                <span>Post</span>
              </button>
            </div>
          </div>

          {/* Feed */}
          <div className="space-y-6">
            {posts.map(post => (
              <div
                key={post.id}
                className="bg-white/95 backdrop-blur p-6 rounded-3xl shadow hover:shadow-2xl transition"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <UserCircle className="text-blue-600 w-8 h-8" />
                  <span className="font-bold text-green-700">{post.user}</span>
                </div>
                <p className="text-gray-700 mb-4 text-lg">{post.content}</p>
                <div className="flex space-x-6 text-gray-600 mb-2">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center space-x-1 hover:text-red-500 transition ${
                      post.liked ? "text-red-500" : ""
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${post.liked ? "fill-red-500" : ""}`}
                    />
                    <span>{post.likes}</span>
                  </button>
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center space-x-1 hover:text-green-600 transition"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments.length}</span>
                    {post.showComments ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Comments Section */}
                {post.showComments && (
                  <div className="mt-4 border-t border-gray-200 pt-4 space-y-3">
                    {post.comments.map(c => (
                      <div key={c.id} className="flex space-x-3">
                        <UserCircle className="text-gray-400 w-6 h-6" />
                        <div>
                          <p className="text-sm">
                            <span className="font-semibold text-green-700">
                              {c.user}
                            </span>{" "}
                            {c.text}
                          </p>
                        </div>
                      </div>
                    ))}
                    <AddCommentBox
                      onSubmit={text => addComment(post.id, text)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-1 space-y-8">
          {/* Trending Topics */}
          <div className="bg-white/95 backdrop-blur rounded-3xl p-5 shadow hover:shadow-xl transition">
            <div className="flex items-center space-x-2 mb-4">
              <Flame className="text-red-500 w-6 h-6" />
              <h2 className="text-xl font-bold text-green-700">
                Trending Topics
              </h2>
            </div>
            <div className="space-y-3">
              {trendingTopics.map((t, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-blue-700">
                    {t.topic}
                  </p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-green-500 to-blue-500"
                      style={{ width: `${t.activity}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Communities */}
          <div className="bg-white/95 backdrop-blur rounded-3xl p-5 shadow hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              Suggested Communities
            </h2>
            <div className="space-y-4">
              {suggestedCommunities.map((c, i) => (
                <div key={i} className="border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-3 mb-1">
                    <Users className="text-green-600 w-6 h-6" />
                    <h3 className="font-bold text-blue-700">{c.name}</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{c.desc}</p>
                  <p className="text-xs text-gray-400">{c.members}</p>
                  <button className="mt-2 w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-1.5 rounded-xl hover:scale-105 transition">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddCommentBox({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");
  return (
    <div className="flex items-start space-x-3 mt-3">
      <UserCircle className="text-green-400 w-6 h-6" />
      <input
        type="text"
        placeholder="Write a comment..."
        className="flex-1 border border-green-200 rounded-xl p-2 focus:ring-2 focus:ring-green-400"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            onSubmit(text);
            setText("");
          }
        }}
      />
      <button
        onClick={() => {
          onSubmit(text);
          setText("");
        }}
        className="bg-green-500 text-white px-3 py-1 rounded-xl hover:bg-green-600 transition"
      >
        Comment
      </button>
    </div>
  );
}
