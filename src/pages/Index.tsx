
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, UserPlus } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "@/components/AuthProvider";

const Index = () => {
  const [guestUser, setGuestUser] = useState(null);
  const { user: adminUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for guest user session
    const storedGuestUser = localStorage.getItem('guest_user');
    if (storedGuestUser) {
      setGuestUser(JSON.parse(storedGuestUser));
    }
  }, []);

  // If user is authenticated (admin or guest), redirect to appropriate page
  useEffect(() => {
    if (adminUser) {
      navigate('/admin-panel');
    } else if (guestUser) {
      navigate('/view-hierarchy');
    }
  }, [adminUser, guestUser, navigate]);

  // Show loading while checking authentication
  if (adminUser || guestUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto py-8 px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Panchayath Management System
          </h1>
          <p className="text-xl text-gray-600">
            Choose your access method to continue
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Admin Panel */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg h-full">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-to-r from-gray-500 to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Settings className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-gray-600 transition-colors mb-2">
                Admin Panel
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Access full administrative controls and management features
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>• Manage agents and hierarchy</li>
                  <li>• Task management</li>
                  <li>• Approve guest requests</li>
                  <li>• System configuration</li>
                </ul>
              </div>
              <Link to="/admin-panel">
                <Button className="w-full bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 text-base">
                  Access Admin Panel
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Guest Access */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg h-full">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <UserPlus className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors mb-2">
                Guest Access
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Login with your mobile number and username
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>• View organizational hierarchy</li>
                  <li>• Access agent information</li>
                  <li>• View panchayath details</li>
                  <li>• Read-only access</li>
                </ul>
              </div>
              <Link to="/guest-login">
                <Button className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 text-base">
                  Guest Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            For guest access, registration requires admin approval
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
