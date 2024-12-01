import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Navbar = () => {
      return (
        <nav className="flex items-center justify-between max-w-4xl mx-auto my-4 px-6 py-3 bg-rose-300 rounded-md">
          <ul className="flex space-x-6">
            <li>
              <Link to="/tools" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Tools
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </li>
          </ul>
          <Button className="ml-6">
            Get Started
            <ChevronRight className="w-4 h-4 mr-2" />
          </Button>
        </nav>
      )
    }

export default Navbar;
