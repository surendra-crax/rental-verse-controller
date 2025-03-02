
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center max-w-2xl px-4 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight text-balance">
            Welcome to RentalVerse
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your rental property platform with our premium admin interface
          </p>
        </div>
        <Link to="/admin">
          <Button size="lg" className="group">
            Enter Admin Dashboard
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
