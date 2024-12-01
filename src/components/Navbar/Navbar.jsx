import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Navbar = () => {
      return (
        <nav className="flex items-center justify-between max-w-4xl mx-auto my-4 px-6 py-3 bg-background rounded-full shadow-md">
          <ul className="flex space-x-6">
            <li>
              <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/projects" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/videos" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Videos
              </Link>
            </li>
          </ul>
          <Button className="ml-6">
            <MessageCircle className="w-4 h-4 mr-2" />
            Let's talk
          </Button>
        </nav>
      )
    }

export default Navbar;
