import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section py-20">
        <div className="espn-content text-center">
          <h1 className="mb-6">
            Your Sports Media Destination
          </h1>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Dive deep into sports with data-driven articles, exclusive podcasts, and comprehensive historical analysis. 
            From breaking news to in-depth statistics, we've got every angle covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/articles" className="btn btn-accent text-lg px-8 py-3">Read Latest Articles</Link>
            <Link href="/podcasts" className="btn btn-outline text-lg px-8 py-3 bg-white text-primary-700 hover:bg-gray-50">Listen to Podcasts</Link>
          </div>
        </div>
      </section>

      {/* Featured Stats */}
      <section className="py-16 bg-gray-50">
        <div className="espn-content">
          <h2 className="text-3xl font-bold text-center mb-12">Today's Highlights</h2>
          <div className="espn-grid">
            <div className="stats-card">
              <div className="metric-label">Top Story</div>
              <div className="metric">Breaking News</div>
              <p className="text-gray-600 mt-2">Latest updates from around the sports world</p>
            </div>
            <div className="stats-card">
              <div className="metric-label">Live Games</div>
              <div className="metric">12</div>
              <p className="text-gray-600 mt-2">Games happening right now</p>
            </div>
            <div className="stats-card">
              <div className="metric-label">New Articles</div>
              <div className="metric">47</div>
              <p className="text-gray-600 mt-2">Published in the last 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16">
        <div className="espn-content">
          <h2 className="text-3xl font-bold mb-8">Featured Content</h2>
          <div className="espn-grid">
            <div className="espn-featured">
              <div className="card">
                <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                <div className="card-body">
                  <div className="badge badge-primary mb-2">Featured</div>
                  <h3 className="text-xl font-bold mb-2">The Evolution of Quarterback Analytics</h3>
                  <p className="text-gray-600 mb-4">
                    How advanced metrics are reshaping how we evaluate NFL quarterbacks and predict their success.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By John Smith • 2 hours ago</span>
                    <Link href="/articles/1" className="text-primary-600 hover:text-primary-700 font-medium">Read More →</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="espn-sidebar space-y-6">
              <div className="card">
                <div className="card-header">
                  <h4 className="font-bold">Latest Podcasts</h4>
                </div>
                <div className="card-body space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded flex items-center justify-center">
                      <span className="text-primary-600">🎧</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm">Trade Deadline Analysis</h5>
                      <p className="text-xs text-gray-500">45 min • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent-100 rounded flex items-center justify-center">
                      <span className="text-accent-600">🎧</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm">Playoff Predictions</h5>
                      <p className="text-xs text-gray-500">32 min • 4 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="card-header">
                  <h4 className="font-bold">Quick Stats</h4>
                </div>
                <div className="card-body space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Teams Covered</span>
                    <span className="font-bold">150+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Historical Data</span>
                    <span className="font-bold">50+ Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Expert Writers</span>
                    <span className="font-bold">25+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-50">
        <div className="espn-content text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Conversation</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get personalized content, exclusive podcasts, and real-time updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn btn-primary text-lg px-8 py-3">Start Free Trial</Link>
            <Link href="/about" className="btn btn-outline text-lg px-8 py-3">Learn More</Link>
          </div>
        </div>
      </section>
    </div>
  );
} 